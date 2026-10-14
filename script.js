/* ============================================================
   清华电子 · 页面渲染逻辑
   ============================================================ */

/* ============================================================
   可配置参数
   ============================================================ */
const MATCH_DURATION = {
  men:   80,
  women: 60
};

function getFullTime() {
  return MATCH_DURATION[currentGender] ?? 90;
}

/* ============================================================
   全局状态
   ============================================================ */
let currentGender = 'men';
let currentApi    = MatchDataAPIMen;

let matchSeasonFilter  = 'all';
let playerSeasonFilter = 'all';

let currentPlayers = [];

const sortState = {
  key: 'goals',
  direction: 'desc',
  starterMode: 'starts-desc'
};

const ASC_DEFAULT_KEYS = ['shirt', 'name'];

const VENUE_CLASS = {
  '紫操': 'zi',
  '西操': 'xi',
  '东操': 'dong',
  '北操': 'bei'
};

const COMPETITION_ORDER = {
  men:   ['甲级', '乙级', '丙级'],
  women: ['马女']
};

function getCompOrder() {
  return COMPETITION_ORDER[currentGender] || [];
}

const TEAM_META = {
  men: {
    crestFallback: 'THU',
    crestImg:      'crest-men.png',
    name:          '清华电子男足',
    sub:           'TSINGHUA ELECTRONICS FC · 男足 · 2024 – 2025'
  },
  women: {
    crestFallback: 'THU',
    crestImg:      'crest-women.png',
    name:          '清华电子女足',
    sub:           'TSINGHUA ELECTRONICS LADIES FC · 女足 · 2024 – 2025'
  }
};

/* ============================================================
   个人数据列标题提示文案配置
   ------------------------------------------------------------
   每一组可以填一个字符串，作为该组列标题的悬浮提示。
   留空（空字符串 ''）则按原来的方式自动生成：
     "统计数据自 YYYY年M月D日起（含历史不完整数据）"
     "统计数据自 YYYY年M月D日起（仅完整比赛）"

   分组说明：
     goals       → 进球 / 乌龙球
     assists     → 助攻
     appearances → 出场 / 首发替补 / 出场时间 / 号码 / 球员
     cards       → 黄牌 / 红牌

   男女足分别配置，互不影响。
   ============================================================ */
const COLUMN_TITLE_OVERRIDES = {
  men: {
    goals:       '',
    assists:     '',
    appearances: '',
    cards:       ''
  },
  women: {
    goals:       '',
    assists:     '暂无助攻数据',
    appearances: '',
    cards:       ''
  }
};

let unsubscribeCurrent = null;

/* ============================================================
   工具
   ============================================================ */
function getResult(match) {
  const hasPenalty = match.penaltyFor != null && match.penaltyAgainst != null;
  const isKnockout = match.stage === '淘汰赛';

  if (hasPenalty && isKnockout) {
    if (match.penaltyFor > match.penaltyAgainst) return 'win';
    if (match.penaltyFor < match.penaltyAgainst) return 'loss';
  }

  if (match.scoreFor > match.scoreAgainst) return 'win';
  if (match.scoreFor === match.scoreAgainst) return 'draw';
  return 'loss';
}

function resultText(result) {
  return { win: '胜', draw: '平', loss: '负' }[result] || '';
}

function filterMatches(season) {
  if (season === 'all') return currentApi.getList();
  return currentApi.getBySeason(season);
}

function formatScore(match) {
  const base = `${match.scoreFor} : ${match.scoreAgainst}`;
  const hasPenalty = match.penaltyFor != null && match.penaltyAgainst != null;
  if (!hasPenalty) return base;
  return `${base}<span class="penalty">(${match.penaltyFor}:${match.penaltyAgainst})</span>`;
}

/* ============================================================
   球员聚合
   ------------------------------------------------------------
   partial: true 的比赛：进球 / 点球 / 助攻 / 乌龙球 计入统计，
   出场 / 首发 / 替补 / 时间 / 黄牌 / 红牌 / 号码 不计入。
   ============================================================ */
function aggregatePlayers(season) {
  const matches = filterMatches(season)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const fullTime = getFullTime();
  const map = new Map();

  matches.forEach(match => {
    const comp      = match.competition;
    const stage     = match.stage || '小组赛';
    const isPartial = match.partial === true;

    match.players.forEach(p => {
      if (!map.has(p.name)) {
        map.set(p.name, {
          name:         p.name,
          shirts:       [],
          latestShirt:  null,
          appearances:  0,
          starts:       0,
          subs:         0,
          minutes:      0,
          goals:        0,
          penalties:    0,
          assists:      0,
          ownGoals:     0,
          yellow:       0,
          red:          0,
          goalsByComp:      {},
          assistsByComp:    {},
          ownGoalsByComp:   {},
          appearancesByComp:{},
          startsByComp:     {},
          subsByComp:       {},
          minutesByComp:    {},
          // 单场里程碑：{ 5: 次数, 4: 次数, 3: 次数, 2: 次数 }
          goalMilestones:   { 5: 0, 4: 0, 3: 0, 2: 0 },
          assistMilestones: { 5: 0, 4: 0, 3: 0, 2: 0 }
        });
      }

      const agg = map.get(p.name);

      // ---- 号码：partial 比赛不记录 ----
      // shirts 数组按首次出现的顺序记录号码，同一号码只出现一次（去重）
      // latestShirt 始终更新为最新一场比赛的号码，用于号码列排序
      if (!isPartial && p.shirt != null) {
        if (!agg.shirts.includes(p.shirt)) {
          agg.shirts.push(p.shirt);
        }
        agg.latestShirt = p.shirt;
      }

      // ---- 进球 / 点球 / 助攻 / 乌龙球：始终统计 ----
      const g   = p.goals     || 0;
      const pen = p.penalties || 0;
      const ast = p.assists   || 0;
      const og  = p.ownGoals  || 0;

      agg.goals     += g;
      agg.penalties += pen;
      agg.assists   += ast;
      agg.ownGoals  += og;

      // ---- 单场里程碑：本场进球 2~5 个分别累计 ----
      if (g >= 2 && g <= 5) {
        agg.goalMilestones[g] += 1;
      }
      if (ast >= 2 && ast <= 5) {
        agg.assistMilestones[ast] += 1;
      }

      // 进球分布
      if (g > 0) {
        if (!agg.goalsByComp[comp]) {
          agg.goalsByComp[comp] = { total: { goals: 0, penalties: 0 }, stages: {} };
        }
        agg.goalsByComp[comp].total.goals     += g;
        agg.goalsByComp[comp].total.penalties += pen;

        if (!agg.goalsByComp[comp].stages[stage]) {
          agg.goalsByComp[comp].stages[stage] = { goals: 0, penalties: 0 };
        }
        agg.goalsByComp[comp].stages[stage].goals     += g;
        agg.goalsByComp[comp].stages[stage].penalties += pen;
      }

      // 助攻分布
      if (ast > 0) {
        if (!agg.assistsByComp[comp]) {
          agg.assistsByComp[comp] = { total: 0, stages: {} };
        }
        agg.assistsByComp[comp].total += ast;
        agg.assistsByComp[comp].stages[stage] =
          (agg.assistsByComp[comp].stages[stage] || 0) + ast;
      }

      // 乌龙球分布
      if (og > 0) {
        if (!agg.ownGoalsByComp[comp]) {
          agg.ownGoalsByComp[comp] = { total: 0, stages: {} };
        }
        agg.ownGoalsByComp[comp].total += og;
        agg.ownGoalsByComp[comp].stages[stage] =
          (agg.ownGoalsByComp[comp].stages[stage] || 0) + og;
      }

      // ---- 出场 / 首发 / 时间 / 牌：仅完整比赛统计 ----
      if (!isPartial) {
        const isStarter = p.subOn == null;

        agg.appearances += 1;
        if (isStarter) agg.starts += 1;
        else           agg.subs   += 1;

        agg.yellow += p.yellow || 0;
        agg.red    += p.red    || 0;

        /* 本场比赛的实际时长：
           常规时长 + 30 分钟（若有加时赛 extraTime: true） */
        const matchDuration = fullTime + (match.extraTime === true ? 30 : 0);

        const start  = isStarter ? 0 : (p.subOn ?? 0);
        const rawEnd = p.subOff != null ? p.subOff : matchDuration;
        const end    = Math.min(rawEnd, matchDuration);

        /* 伤停补时换人等极端情况可能算出 ≤0，最少按 1 分钟计 */
        let mins = end - start;
        if (mins <= 0) mins = 1;

        agg.minutes += mins;

        agg.appearancesByComp[comp] = (agg.appearancesByComp[comp] || 0) + 1;
        if (isStarter) agg.startsByComp[comp] = (agg.startsByComp[comp] || 0) + 1;
        else           agg.subsByComp[comp]   = (agg.subsByComp[comp]   || 0) + 1;
        agg.minutesByComp[comp] = (agg.minutesByComp[comp] || 0) + mins;
      }
    });
  });

  return Array.from(map.values());
}

/* ============================================================
   排序
   ------------------------------------------------------------
   进球列多级排序：
     1. 进球（按主方向）
     2. 点球数升序
     3. 出场数升序
     4. 乌龙球升序
     5. 号码升序
   ============================================================ */
function sortPlayers(players) {
  const { key, direction, starterMode } = sortState;

  // ---- 进球列：多级排序 ----
  if (key === 'goals') {
    const factor = direction === 'asc' ? 1 : -1;
    return [...players].sort((a, b) => {
      if (a.goals !== b.goals) return (a.goals - b.goals) * factor;
      if (a.penalties !== b.penalties) return a.penalties - b.penalties;
      if (a.appearances !== b.appearances) return a.appearances - b.appearances;
      if (a.ownGoals !== b.ownGoals) return a.ownGoals - b.ownGoals;
      const aShirt = a.latestShirt ?? 9999;
      const bShirt = b.latestShirt ?? 9999;
      return aShirt - bShirt;
    });
  }

  // ---- 首发/替补列：四种模式 ----
  if (key === 'starter') {
    return [...players].sort((a, b) => {
      let va, vb, factor;
      switch (starterMode) {
        case 'starts-desc': va = a.starts; vb = b.starts; factor = -1; break;
        case 'starts-asc':  va = a.starts; vb = b.starts; factor = 1;  break;
        case 'subs-desc':   va = a.subs;   vb = b.subs;   factor = -1; break;
        case 'subs-asc':    va = a.subs;   vb = b.subs;   factor = 1;  break;
        default:            va = a.starts; vb = b.starts; factor = -1;
      }
      return (va - vb) * factor;
    });
  }

  // ---- 号码列：按最新号码 ----
  if (key === 'shirt') {
    return [...players].sort((a, b) => {
      const aShirt = a.latestShirt ?? 9999;
      const bShirt = b.latestShirt ?? 9999;
      return (aShirt - bShirt) * (direction === 'asc' ? 1 : -1);
    });
  }

  // ---- 其他列：单级排序 ----
  return [...players].sort((a, b) => {
    const va = a[key];
    const vb = b[key];

    if (typeof va === 'string' && typeof vb === 'string') {
      return va.localeCompare(vb, 'zh-Hans-CN') * (direction === 'asc' ? 1 : -1);
    }
    return ((va ?? 0) - (vb ?? 0)) * (direction === 'asc' ? 1 : -1);
  });
}

/* ============================================================
   悬停浮窗
   ============================================================ */
const tooltipEl = document.createElement('div');
tooltipEl.className = 'goal-tooltip';
document.body.appendChild(tooltipEl);

function fmtGoals(v) {
  const pen = v.penalties || 0;
  return pen > 0
    ? `${v.goals}<span class="tip-pen">(${pen})</span>`
    : `${v.goals}`;
}

/** 构建里程碑统计块（进球 / 助攻共用） */
function buildMilestonesHTML(milestones) {
  if (!milestones) return '';

  const defs = [
    [5, '五子登科'],
    [4, '大四喜'],
    [3, '帽子戏法'],
    [2, '梅开二度']
  ];

  const entries = defs.filter(([n]) => milestones[n] > 0);
  if (entries.length === 0) return '';

  return `
    <div class="tooltip-milestones">
      <div class="tooltip-milestones-title">里程碑</div>
      ${entries.map(([n, name]) => `
        <div class="tooltip-row milestone">
          <span class="label">${name}</span>
          <span class="value">${milestones[n]} 次</span>
        </div>
      `).join('')}
    </div>
  `;
}

function buildTooltipHTML(player, type) {
  let title = '';
  let comps = null;

  switch (type) {
    case 'goals':       title = '进球分布';       comps = player.goalsByComp;     break;
    case 'assists':     title = '助攻分布';       comps = player.assistsByComp;   break;
    case 'ownGoals':    title = '乌龙球分布';     comps = player.ownGoalsByComp;  break;
    case 'appearances': title = '出场次数分布';   comps = player.appearancesByComp; break;
    case 'minutes':     title = '出场时间分布';   comps = player.minutesByComp;     break;
    case 'starter':     title = '首发 / 替补分布'; comps = null; break;
    default: return `<div class="tooltip-title">数据</div>`;
  }

  const order = getCompOrder();

  let compKeys;
  if (type === 'starter') {
    const all = new Set([
      ...Object.keys(player.startsByComp),
      ...Object.keys(player.subsByComp)
    ]);
    compKeys = order.filter(c => all.has(c));
  } else {
    compKeys = order.filter(c => comps[c]);
  }

  // 主体内容
  let bodyHtml = '';
  if (compKeys.length === 0) {
    bodyHtml = `<div class="tooltip-empty">暂无记录</div>`;
  } else {
    bodyHtml = compKeys.map(comp => {
      let rows = '';

      if (type === 'goals' || type === 'ownGoals') {
        const data = comps[comp];
        const totalHtml = type === 'goals' ? fmtGoals(data.total) : `${data.total}`;
        const stages = data.stages || {};
        const stageRows = ['小组赛', '淘汰赛']
          .filter(s => stages[s] && (type === 'goals' ? stages[s].goals > 0 : stages[s] > 0))
          .map(s => {
            const sv = stages[s];
            const valHtml = type === 'goals' ? fmtGoals(sv) : `${sv}`;
            return `
              <div class="tooltip-row sub">
                <span class="label">${s}</span>
                <span class="value">${valHtml}</span>
              </div>
            `;
          }).join('');

        rows = `
          <div class="tooltip-row main">
            <span class="label comp-name">${comp}</span>
            <span class="value">${totalHtml}</span>
          </div>
          ${stageRows}
        `;
      } else if (type === 'assists') {
        const data = comps[comp];
        const stages = data.stages || {};
        const stageRows = ['小组赛', '淘汰赛']
          .filter(s => stages[s] > 0)
          .map(s => `
            <div class="tooltip-row sub">
              <span class="label">${s}</span>
              <span class="value">${stages[s]}</span>
            </div>
          `).join('');

        rows = `
          <div class="tooltip-row main">
            <span class="label comp-name">${comp}</span>
            <span class="value">${data.total}</span>
          </div>
          ${stageRows}
        `;
      } else if (type === 'appearances') {
        rows = `
          <div class="tooltip-row main">
            <span class="label comp-name">${comp}</span>
            <span class="value">${comps[comp]} 场</span>
          </div>
        `;
      } else if (type === 'minutes') {
        rows = `
          <div class="tooltip-row main">
            <span class="label comp-name">${comp}</span>
            <span class="value">${comps[comp]} 分钟</span>
          </div>
        `;
      } else if (type === 'starter') {
        const s = player.startsByComp[comp] || 0;
        const b = player.subsByComp[comp]   || 0;
        rows = `
          <div class="tooltip-row main">
            <span class="label comp-name">${comp}</span>
            <span class="value">首发 ${s} / 替补 ${b}</span>
          </div>
        `;
      }

      return `<div class="tooltip-comp">${rows}</div>`;
    }).join('');
  }

  // 里程碑统计（仅进球 / 助攻展示）
  let milestonesHtml = '';
  if (type === 'goals') {
    milestonesHtml = buildMilestonesHTML(player.goalMilestones);
  } else if (type === 'assists') {
    milestonesHtml = buildMilestonesHTML(player.assistMilestones);
  }

  return `<div class="tooltip-title">${title}</div>${bodyHtml}${milestonesHtml}`;
}

function isMobileLayout() {
  return window.matchMedia('(max-width: 640px)').matches;
}

function showTooltip(cell) {
  const playerName = cell.dataset.tooltipPlayer;
  const type       = cell.dataset.tooltipType;
  const player     = currentPlayers.find(p => p.name === playerName);
  if (!player) return;

  tooltipEl.innerHTML = buildTooltipHTML(player, type);
  tooltipEl.classList.add('visible');
  tooltipEl.dataset.key = playerName + '|' + type;

  // ---- 手机端：交给 CSS 居中，跳过定位计算 ----
  if (isMobileLayout()) {
    tooltipEl.style.top  = '';
    tooltipEl.style.left = '';
    document.body.classList.add('tooltip-open');
    return;
  }

  // ---- 桌面端：跟随单元格 ----
  const tipRect  = tooltipEl.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();

  let top  = cellRect.top - tipRect.height - 10;
  let left = cellRect.left + cellRect.width / 2 - tipRect.width / 2;

  if (top < 10) top = cellRect.bottom + 10;
  if (left < 10) left = 10;
  if (left + tipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tipRect.width - 10;
  }

  tooltipEl.style.top  = top  + 'px';
  tooltipEl.style.left = left + 'px';
}

function hideTooltip() {
  tooltipEl.classList.remove('visible');
  document.body.classList.remove('tooltip-open');
  delete tooltipEl.dataset.key;
}

/* ============================================================
   赛季筛选器
   ============================================================ */
function renderSeasonFilter(containerId, current, onSelect) {
  const container = document.getElementById(containerId);
  const options = ['all', ...currentApi.getSeasons()];

  container.innerHTML = options.map(s => {
    const label = s === 'all' ? '全部' : s + ' 赛季';
    const cls = s === current ? 'active' : '';
    return `<button type="button" class="${cls}" data-season="${s}">${label}</button>`;
  }).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => onSelect(btn.dataset.season));
  });
}

function onMatchSeasonChange(season) {
  matchSeasonFilter = season;
  renderSeasonFilter('matches-season-filter', season, onMatchSeasonChange);
  renderMatches();
}

function onPlayerSeasonChange(season) {
  playerSeasonFilter = season;
  renderSeasonFilter('players-season-filter', season, onPlayerSeasonChange);
  renderPlayers();
}

/* ============================================================
   渲染
   ============================================================ */
function renderOverview() {
  const matches = filterMatches('all');
  let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;

  matches.forEach(m => {
    const r = getResult(m);
    if (r === 'win') wins++;
    else if (r === 'draw') draws++;
    else losses++;
    goalsFor += m.scoreFor;
    goalsAgainst += m.scoreAgainst;
  });

  document.getElementById('stat-total').textContent = matches.length;
  document.getElementById('stat-win').textContent = wins;
  document.getElementById('stat-draw').textContent = draws;
  document.getElementById('stat-loss').textContent = losses;
  document.getElementById('stat-goals').textContent = goalsFor;
  document.getElementById('stat-conceded').textContent = goalsAgainst;
}

function renderMatches() {
  const tbody = document.getElementById('matches-tbody');

  const filtered = filterMatches(matchSeasonFilter)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  tbody.innerHTML = filtered.map(m => {
    const result = getResult(m);
    const venueClass = VENUE_CLASS[m.venue] || '';
    const stageText  = m.stage ? `${m.stage} · ` : '';
    const roundText  = m.round || '';

    const venueHtml = m.venue
      ? `<span class="venue ${venueClass}">${m.venue}</span>`
      : `<span class="venue-empty">—</span>`;

    return `
      <tr>
        <td class="date">${m.date}</td>
        <td>
          <span class="comp">${m.competition}</span>
          <span class="round">${stageText}${roundText}</span>
        </td>
        <td class="opponent">${m.opponent}</td>
        <td class="c">${venueHtml}</td>
        <td class="c score">${formatScore(m)}</td>
        <td class="c"><span class="badge ${result}">${resultText(result)}</span></td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="6" class="empty">该赛季暂无比赛记录</td></tr>`;

  let w = 0, d = 0, l = 0;
  filtered.forEach(m => {
    const r = getResult(m);
    if (r === 'win') w++;
    else if (r === 'draw') d++;
    else l++;
  });

  document.getElementById('matches-hint').textContent =
    `共 ${filtered.length} 场 · 胜 ${w} 平 ${d} 负 ${l}`;
}

function renderPlayers() {
  const allPlayers = aggregatePlayers(playerSeasonFilter);
  const maxGoals = Math.max(...allPlayers.map(p => p.goals), 0);

  const sorted = sortPlayers(allPlayers);
  currentPlayers = sorted;

  const tbody = document.getElementById('players-tbody');

  tbody.innerHTML = sorted.map(p => {
    const isTopScorer = p.goals > 0 && p.goals === maxGoals;
    const rowClass = isTopScorer ? 'top-scorer' : '';

    const shirtHtml = p.shirts.length > 0 ? p.shirts.join('/') : '—';

    const goalsHtml = p.penalties > 0
      ? `${p.goals}<span class="pen">(${p.penalties})</span>`
      : `${p.goals}`;

    const hasGoalsTip    = Object.keys(p.goalsByComp).length > 0;
    const hasAssistsTip  = Object.keys(p.assistsByComp).length > 0;
    const hasOwnGoalsTip = Object.keys(p.ownGoalsByComp).length > 0;
    const hasAppsTip     = Object.keys(p.appearancesByComp).length > 0;
    const hasStarterTip  = Object.keys(p.startsByComp).length > 0
                        || Object.keys(p.subsByComp).length > 0;
    const hasMinutesTip  = Object.keys(p.minutesByComp).length > 0;

    const appsTd = hasAppsTip
      ? `<td class="c num" data-tooltip-player="${p.name}" data-tooltip-type="appearances">${p.appearances}</td>`
      : `<td class="c num">${p.appearances}</td>`;

    const starterText = `${p.starts}/${p.subs}`;
    const starterTd = hasStarterTip
      ? `<td class="c num" data-tooltip-player="${p.name}" data-tooltip-type="starter">${starterText}</td>`
      : `<td class="c num">${starterText}</td>`;

    const minutesTd = hasMinutesTip
      ? `<td class="c num" data-tooltip-player="${p.name}" data-tooltip-type="minutes">${p.minutes}</td>`
      : `<td class="c num">${p.minutes}</td>`;

    const goalsTd = hasGoalsTip
      ? `<td class="c ${p.goals > 0 ? 'goals' : 'num'}" data-tooltip-player="${p.name}" data-tooltip-type="goals">${goalsHtml}</td>`
      : `<td class="c ${p.goals > 0 ? 'goals' : 'num'}">${goalsHtml}</td>`;

    const assistsTd = hasAssistsTip
      ? `<td class="c ${p.assists > 0 ? 'assists' : 'num'}" data-tooltip-player="${p.name}" data-tooltip-type="assists">${p.assists}</td>`
      : `<td class="c ${p.assists > 0 ? 'assists' : 'num'}">${p.assists}</td>`;

    const ownGoalsContent = p.ownGoals > 0
      ? `<span class="own-goal">${p.ownGoals}</span>`
      : '0';
    const ownGoalsTd = hasOwnGoalsTip
      ? `<td class="c" data-tooltip-player="${p.name}" data-tooltip-type="ownGoals">${ownGoalsContent}</td>`
      : `<td class="c ${p.ownGoals > 0 ? '' : 'num'}">${ownGoalsContent}</td>`;

    return `
      <tr class="${rowClass}">
        <td class="c"><span class="shirt">${shirtHtml}</span></td>
        <td class="player-name">${p.name}</td>
        ${appsTd}
        ${starterTd}
        ${minutesTd}
        ${goalsTd}
        ${assistsTd}
        ${ownGoalsTd}
        <td class="c num">${p.yellow}</td>
        <td class="c num">${p.red}</td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="11" class="empty">该赛季暂无球员数据</td></tr>`;

  updateSortIcons();

  const matchCount = filterMatches(playerSeasonFilter).length;
  document.getElementById('players-hint').textContent =
    `共 ${allPlayers.length} 名球员 · 数据来自 ${matchCount} 场比赛`;
}

/* ============================================================
   列标题悬浮提示：数据起始日
   ============================================================ */
function formatDateCN(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
}

function updateColumnTooltips() {
  const allMatches  = currentApi.getList();
  const fullMatches = allMatches.filter(m => !m.partial);

  const allDates  = allMatches.map(m => m.date).sort();
  const fullDates = fullMatches.map(m => m.date).sort();

  const allEarliest  = allDates[0]  || null;
  const fullEarliest = fullDates[0] || null;

  const overrides = COLUMN_TITLE_OVERRIDES[currentGender] || {};

  const setTitle = (key, text) => {
    const el = document.querySelector(`th[data-sort="${key}"]`);
    if (el) el.title = text;
  };

  const defaultGoalsTip = `统计数据自 ${formatDateCN(allEarliest)} 起（含历史不完整数据）`;
  const defaultFullTip  = `统计数据自 ${formatDateCN(fullEarliest)} 起（仅完整比赛）`;

  const goalsTip       = overrides.goals       || defaultGoalsTip;
  const assistsTip     = overrides.assists     || defaultGoalsTip;
  const appearancesTip = overrides.appearances || defaultFullTip;
  const cardsTip       = overrides.cards       || defaultFullTip;

  // 进球 / 乌龙球
  ['goals', 'ownGoals'].forEach(k => setTitle(k, goalsTip));

  // 助攻（单独一个配置值）
  setTitle('assists', assistsTip);

  // 出场相关
  ['appearances', 'starter', 'minutes', 'shirt', 'name'].forEach(k => {
    setTitle(k, appearancesTip);
  });

  // 黄牌 / 红牌
  ['yellow', 'red'].forEach(k => setTitle(k, cardsTip));
}

/* ============================================================
   排序交互
   ============================================================ */
function updateSortIcons() {
  document.querySelectorAll('th.sortable').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc', 'sort-active');
    const key = th.dataset.sort;

    if (key === 'starter') {
      th.classList.add('sort-active');
      const modeEl = th.querySelector('.sort-mode');
      if (modeEl) {
        const labels = {
          'starts-desc': '首发↓',
          'starts-asc':  '首发↑',
          'subs-desc':   '替补↓',
          'subs-asc':    '替补↑'
        };
        modeEl.textContent = (sortState.key === 'starter')
          ? labels[sortState.starterMode]
          : '';
      }
      return;
    }

    if (sortState.key === key) {
      th.classList.add(sortState.direction === 'asc' ? 'sort-asc' : 'sort-desc');
    }
  });
}

function handleSortClick(key) {
  if (key === 'starter') {
    if (sortState.key === 'starter') {
      const modes = ['starts-desc', 'starts-asc', 'subs-desc', 'subs-asc'];
      const idx = modes.indexOf(sortState.starterMode);
      sortState.starterMode = modes[(idx + 1) % modes.length];
    } else {
      sortState.key = 'starter';
      sortState.starterMode = 'starts-desc';
    }
  } else {
    if (sortState.key === key) {
      sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.key = key;
      sortState.direction = ASC_DEFAULT_KEYS.includes(key) ? 'asc' : 'desc';
    }
  }
  renderPlayers();
}

function bindSortEvents() {
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => handleSortClick(th.dataset.sort));
  });
}

/* ============================================================
   悬停事件
   ============================================================ */
function bindTooltipEvents() {
  const tbody = document.getElementById('players-tbody');

  // ---- 桌面端：鼠标悬浮显示 / 移出隐藏 ----
  tbody.addEventListener('mouseover', e => {
    if (isMobileLayout()) return;
    const cell = e.target.closest('[data-tooltip-player]');
    if (!cell) return;
    showTooltip(cell);
  });

  tbody.addEventListener('mouseout', e => {
    if (isMobileLayout()) return;
    const cell = e.target.closest('[data-tooltip-player]');
    if (!cell) return;
    const related = e.relatedTarget;
    if (related && cell.contains(related)) return;
    hideTooltip();
  });

  // ---- 手机端：点击单元格 打开 / 关闭 ----
  tbody.addEventListener('click', e => {
    if (!isMobileLayout()) return;
    const cell = e.target.closest('[data-tooltip-player]');
    if (!cell) return;
    e.stopPropagation();

    const key = cell.dataset.tooltipPlayer + '|' + cell.dataset.tooltipType;
    if (tooltipEl.classList.contains('visible') && tooltipEl.dataset.key === key) {
      hideTooltip();
    } else {
      showTooltip(cell);
    }
  });

  // ---- 手机端：点击浮窗之外关闭 ----
  document.addEventListener('click', e => {
    if (!isMobileLayout()) return;
    if (!tooltipEl.classList.contains('visible')) return;
    if (tooltipEl.contains(e.target)) return;
    if (e.target.closest('[data-tooltip-player]')) return;
    hideTooltip();
  });

  // 桌面端滚动 / 改变尺寸时隐藏
  window.addEventListener('scroll', () => {
    if (!isMobileLayout()) hideTooltip();
  }, true);

  window.addEventListener('resize', () => {
    // 跨断点时清理状态，避免残留遮罩或错位
    hideTooltip();
  });
}

/* ============================================================
   队徽加载
   ============================================================ */
function loadCrest(meta) {
  const imgEl  = document.getElementById('crest-img');
  const textEl = document.getElementById('crest-text');

  textEl.textContent = meta.crestFallback;

  imgEl.onload = null;
  imgEl.onerror = null;
  imgEl.style.display = 'none';
  textEl.style.display = 'grid';
  imgEl.removeAttribute('src');

  imgEl.onload = () => {
    imgEl.style.display = 'block';
    textEl.style.display = 'none';
  };
  imgEl.onerror = () => {
    imgEl.style.display = 'none';
    textEl.style.display = 'grid';
  };

  imgEl.src = meta.crestImg;
}

/* ============================================================
   性别切换
   ============================================================ */
function updateTeamMeta(gender) {
  const meta = TEAM_META[gender];

  document.getElementById('team-name').textContent = meta.name;
  document.getElementById('team-sub').textContent  = meta.sub;

  document.body.dataset.gender = gender;

  loadCrest(meta);
}

function switchGender(gender) {
  if (!TEAM_META[gender]) return;

  currentGender = gender;
  currentApi = gender === 'men' ? MatchDataAPIMen : MatchDataAPIWomen;

  document.querySelectorAll('#gender-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gender === gender);
  });

  if (unsubscribeCurrent) unsubscribeCurrent();
  unsubscribeCurrent = currentApi.subscribe(renderAll);

  matchSeasonFilter  = 'all';
  playerSeasonFilter = 'all';

  updateTeamMeta(gender);

  renderSeasonFilter('matches-season-filter', 'all', onMatchSeasonChange);
  renderSeasonFilter('players-season-filter', 'all', onPlayerSeasonChange);

  renderAll();
}

/* ============================================================
   统一渲染
   ============================================================ */
function renderAll() {
  hideTooltip();
  updateColumnTooltips();
  renderOverview();
  renderMatches();
  renderPlayers();
  updateFootNote();
}

function updateFootNote() {
  const dates = currentApi.getList().map(m => m.date).sort();
  const latest = dates[dates.length - 1] || '—';
  document.getElementById('foot-note').textContent =
    `数据更新于 ${latest} · 悬停表头可查看统计起始日 · 悬停数据可查看按赛事分布`;
}

/* ============================================================
   初始化
   ============================================================ */
function init() {
  document.querySelectorAll('#gender-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.gender !== currentGender) {
        switchGender(btn.dataset.gender);
      }
    });
  });

  switchGender('men');

  bindSortEvents();
  bindTooltipEvents();
}

init();