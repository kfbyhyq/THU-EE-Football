/* ============================================================
   清华电子 · 比赛数据接口工厂
   ============================================================ */

const DATA_VERSION_MEN = 3;
const DATA_VERSION_WOMEN = 3;

const DEPRECATED_STORAGE_KEYS = [
  'fc_match_data_v1',
  'fc_match_data_men_v1',
  'fc_match_data_women_v1',
  'fc_match_data_men',
  'fc_match_data_women'
];

function createMatchDataAPI(storageKey, initialData, version) {

  const hasStorage = (function () {
    try {
      return typeof localStorage !== 'undefined'
        && typeof localStorage.setItem === 'function';
    } catch (e) { return false; }
  })();

  let data = {};
  const listeners = [];

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function validate(match) {
    const errors = [];
    if (!match || typeof match !== 'object') {
      return { valid: false, errors: ['比赛数据必须是对象'] };
    }

    const isPartial = match.partial === true;

    ['season', 'date', 'competition', 'opponent'].forEach(k => {
      if (match[k] == null || match[k] === '') errors.push('缺少必填字段: ' + k);
    });

    if (!isPartial) {
      ['stage', 'venue'].forEach(k => {
        if (match[k] == null || match[k] === '') errors.push('缺少必填字段: ' + k);
      });
    }

    if (match.date && !/^\d{4}-\d{2}-\d{2}$/.test(match.date)) {
      errors.push('date 格式应为 YYYY-MM-DD，当前值: ' + match.date);
    }

    const VALID_COMPS = ['甲级', '乙级', '丙级', '马女'];
    if (match.competition && !VALID_COMPS.includes(match.competition)) {
      errors.push('competition 应为 ' + VALID_COMPS.join(' / ') + '，当前值: ' + match.competition);
    }

    const VALID_STAGES = ['小组赛', '淘汰赛', '循环赛'];
    if (!isPartial && match.stage && !VALID_STAGES.includes(match.stage)) {
      errors.push('stage 应为 ' + VALID_STAGES.join(' / ') + '，当前值: ' + match.stage);
    }

    const VALID_VENUES = ['紫操', '西操', '东操', '北操'];
    if (!isPartial && match.venue && !VALID_VENUES.includes(match.venue)) {
      errors.push('venue 应为 ' + VALID_VENUES.join(' / ') + '，当前值: ' + match.venue);
    }

    if (typeof match.scoreFor !== 'number') errors.push('scoreFor 必须是数字');
    if (typeof match.scoreAgainst !== 'number') errors.push('scoreAgainst 必须是数字');

    const hasPenFor = match.penaltyFor != null;
    const hasPenAgainst = match.penaltyAgainst != null;
    if (hasPenFor !== hasPenAgainst) {
      errors.push('penaltyFor 与 penaltyAgainst 必须同时存在或同时不存在');
    }
    if (hasPenFor && (typeof match.penaltyFor !== 'number' || match.penaltyFor < 0)) {
      errors.push('penaltyFor 必须是非负数字');
    }
    if (hasPenAgainst && (typeof match.penaltyAgainst !== 'number' || match.penaltyAgainst < 0)) {
      errors.push('penaltyAgainst 必须是非负数字');
    }

    // 加时赛字段（可选布尔）
    if (match.extraTime !== undefined && typeof match.extraTime !== 'boolean') {
      errors.push('extraTime 必须是布尔值（true / false）');
    }

    if (!Array.isArray(match.players)) {
      errors.push('players 必须是数组');
    } else {
      match.players.forEach((p, i) => {
        if (!p || typeof p !== 'object') { errors.push(`players[${i}] 必须是对象`); return; }
        if (!p.name) errors.push(`players[${i}] 缺少 name`);
        if (!isPartial && p.shirt == null) {
          errors.push(`players[${i}] 缺少 shirt`);
        }
      });
    }

    return { valid: errors.length === 0, errors };
  }

  function generateId() {
    const ids = Object.keys(data).map(Number).filter(n => Number.isFinite(n));
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  function normalizeInitial(input) {
    if (Array.isArray(input)) {
      const obj = {};
      input.forEach((m, i) => { obj[i + 1] = clone(m); });
      return obj;
    }
    if (input && typeof input === 'object') return clone(input);
    return {};
  }

  function loadFromStorage() {
    if (!hasStorage) return false;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return false;
      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === 'object'
        && parsed.__version === version
        && parsed.__data && typeof parsed.__data === 'object') {
        data = parsed.__data;
        return true;
      }

      localStorage.removeItem(storageKey);
      return false;
    } catch (e) {
      console.warn('[MatchDataAPI:' + storageKey + '] 读取失败:', e);
      try { localStorage.removeItem(storageKey); } catch (_) { }
      return false;
    }
  }

  function saveToStorage() {
    if (!hasStorage) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        __version: version,
        __data: data
      }));
    } catch (e) {
      console.warn('[MatchDataAPI:' + storageKey + '] 写入失败:', e);
    }
  }

  function notify() {
    listeners.forEach(fn => {
      try { fn(data); } catch (e) { console.error('[MatchDataAPI] 订阅者出错:', e); }
    });
  }

  (function cleanDeprecated() {
    if (!hasStorage) return;
    DEPRECATED_STORAGE_KEYS.forEach(k => {
      try { localStorage.removeItem(k); } catch (e) { }
    });
  })();

  (function bootstrap() {
    if (loadFromStorage()) {
      // 使用本地数据
    } else if (initialData != null) {
      data = normalizeInitial(initialData);
      saveToStorage();
    } else {
      console.warn('[MatchDataAPI] 无初始数据: ' + storageKey);
      data = {};
    }
  })();

  const api = {
    P: function (name, shirt, opts = {}) {
      return {
        name, shirt,
        subOn: opts.subOn ?? null,
        subOff: opts.subOff ?? null,
        goals: opts.goals ?? 0,
        penalties: opts.penalties ?? 0,
        assists: opts.assists ?? 0,
        ownGoals: opts.ownGoals ?? 0,
        yellow: opts.yellow ?? 0,
        red: opts.red ?? 0
      };
    },

    getAll() { return clone(data); },
    getList() {
      return Object.entries(data).map(([id, m]) => ({ id: Number(id), ...clone(m) }));
    },
    getById(id) { return data[id] ? clone(data[id]) : null; },
    getBySeason(s) {
      return Object.entries(data)
        .filter(([, m]) => m.season === s)
        .map(([id, m]) => {
          // 不 clone，直接在原对象上挂 id，返回原引用
          m.id = Number(id);
          return m;
        });
    },
    getSeasons() {
      const set = new Set(Object.values(data).map(m => m.season));
      return Array.from(set).sort().reverse();
    },
    getPlayerNames() {
      const counter = new Map();
      Object.values(data).forEach(match => {
        match.players.forEach(p => counter.set(p.name, (counter.get(p.name) || 0) + 1));
      });
      return Array.from(counter.entries()).sort((a, b) => b[1] - a[1]).map(([n]) => n);
    },
    count() { return Object.keys(data).length; },

    addMatch(match, id) {
      const { valid, errors } = validate(match);
      if (!valid) throw new Error('[MatchDataAPI] 数据校验失败:\n  ' + errors.join('\n  '));

      const newId = (id != null) ? id : generateId();
      if (data[newId]) throw new Error(`[MatchDataAPI] id ${newId} 已存在`);

      data[newId] = clone(match);
      saveToStorage(); notify();
      return newId;
    },

    addMatches(matches) {
      if (!Array.isArray(matches)) throw new Error('[MatchDataAPI] addMatches 需要一个数组');
      return matches.map(m => api.addMatch(m));
    },

    updateMatch(id, patch) {
      if (!data[id]) { console.warn(`[MatchDataAPI] 未找到 id=${id}`); return false; }
      if (!patch || typeof patch !== 'object') throw new Error('[MatchDataAPI] patch 必须是对象');

      const updated = Object.assign({}, data[id], clone(patch));
      const { valid, errors } = validate(updated);
      if (!valid) throw new Error('[MatchDataAPI] 更新后数据校验失败:\n  ' + errors.join('\n  '));

      data[id] = updated;
      saveToStorage(); notify();
      return true;
    },

    removeMatch(id) {
      if (!data[id]) return false;
      delete data[id];
      saveToStorage(); notify();
      return true;
    },

    removeSeason(season) {
      let removed = 0;
      Object.keys(data).forEach(id => {
        if (data[id].season === season) { delete data[id]; removed++; }
      });
      if (removed > 0) { saveToStorage(); notify(); }
      return removed;
    },

    validate(match) { return validate(match); },

    exportJSON(pretty = false) { return JSON.stringify(data, null, pretty ? 2 : 0); },

    importJSON(json, opts = {}) {
      let parsed;
      try { parsed = JSON.parse(json); }
      catch (e) { throw new Error('[MatchDataAPI] JSON 解析失败: ' + e.message); }

      let normalized;
      if (Array.isArray(parsed)) {
        normalized = {};
        parsed.forEach((m, i) => { normalized[i + 1] = m; });
      } else if (parsed && typeof parsed === 'object') {
        normalized = parsed;
      } else {
        throw new Error('[MatchDataAPI] 导入数据必须是数组或对象');
      }

      Object.entries(normalized).forEach(([id, match]) => {
        const { valid, errors } = validate(match);
        if (!valid) throw new Error(`[MatchDataAPI] id=${id} 校验失败:\n  ` + errors.join('\n  '));
      });

      if (opts.merge) Object.assign(data, clone(normalized));
      else data = clone(normalized);

      saveToStorage(); notify();
      return Object.keys(normalized).length;
    },

    resetToInitial() {
      if (initialData == null) {
        console.warn('[MatchDataAPI] 无初始数据可重置');
        return false;
      }
      data = normalizeInitial(initialData);
      saveToStorage(); notify();
      return true;
    },

    clear() {
      data = {};
      saveToStorage(); notify();
    },

    subscribe(fn) {
      if (typeof fn !== 'function') throw new Error('[MatchDataAPI] subscribe 需要一个函数');
      listeners.push(fn);
      return function unsubscribe() {
        const i = listeners.indexOf(fn);
        if (i >= 0) listeners.splice(i, 1);
      };
    }
  };

  return api;
}

/* ============================================================
   创建男足、女足两个独立实例
   ============================================================ */
const MatchDataAPIMen = createMatchDataAPI(
  'fc_match_data_men',
  (typeof window !== 'undefined' && window.DATA_MEN) || null,
  DATA_VERSION_MEN
);

const MatchDataAPIWomen = createMatchDataAPI(
  'fc_match_data_women',
  (typeof window !== 'undefined' && window.DATA_WOMEN) || null,
  DATA_VERSION_WOMEN
);

if (typeof window !== 'undefined') {
  window.MatchDataAPIMen = MatchDataAPIMen;
  window.MatchDataAPIWomen = MatchDataAPIWomen;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createMatchDataAPI, MatchDataAPIMen, MatchDataAPIWomen };
}