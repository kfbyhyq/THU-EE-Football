/* ============================================================
   电子女足原始比赛数据
   ============================================================ */
(function () {

    function P(name, shirt, opts = {}) {
        return {
            name: name,
            shirt: shirt,
            subOn: opts.subOn ?? null,
            subOff: opts.subOff ?? null,
            goals: opts.goals ?? 0,
            penalties: opts.penalties ?? 0,
            assists: opts.assists ?? 0,
            ownGoals: opts.ownGoals ?? 0,
            yellow: opts.yellow ?? 0,
            red: opts.red ?? 0
        };
    }

    window.QF_DATA_WOMEN = [

        /* 2015-2016 只有进球数据 */
        {
            season: '2015-2016', date: '2016-03-05 14:30',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '车辆', venue: '北操', scoreFor: 2, scoreAgainst: 0,
            partial: true,
            players: [
                { name: '穆雨佳', goals: 1 },
                { name: '惠铄迪', goals: 1 }
            ]
        },

        {
            season: '2015-2016', date: '2016-03-10 13:00',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '美院', venue: '北操', scoreFor: 0, scoreAgainst: 2,
            partial: true,
            players: []
        },

        {
            season: '2015-2016', date: '2016-03-13 12:00',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '水利', venue: '北操', scoreFor: 0, scoreAgainst: 2,
            partial: true,
            players: []
        },

        /* 2016-2017 */
        {
            season: '2016-2017', date: '2017-03-05 14:15',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '经管', venue: '北操', scoreFor: 0, scoreAgainst: 2,
            players: [
                P('刘可淳', 1),
                P('王向团', 3, { subOff: 49 }),
                P('骆沁毅', 4, { subOff: 41 }),
                P('赵雅娟', 7, { subOff: 41 }),
                P('石莱茜', 8, { subOn: 41 }),
                P('惠铄迪', 9, { subOff: 41 }),
                P('穆雨佳', 10),
                P('刘畅', 12, { subOn: 41 }),
                P('孙雅琪', 13),
                P('项思琪', 22, { subOn: 49 }),
                P('肖春晖', 28, { subOn: 41 })
            ]
        },

        {
            season: '2016-2017', date: '2017-03-11 12:30',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '环境', venue: '北操', scoreFor: 1, scoreAgainst: 0,
            players: [
                P('刘可淳', 1),
                P('王向团', 3, { yellow: 1 }),
                P('马蕊', 5, { subOff: 16 }),
                P('赵雅娟', 7, { subOff: 30 }),
                P('石莱茜', 8),
                P('惠铄迪', 9, { subOn: 16 }),
                P('穆雨佳', 10, { goals: 1, penalties: 1 }),
                P('陈璋美', 11),
                P('肖春晖', 28, { subOn: 30 })
            ]
        },

        {
            season: '2016-2017', date: '2017-03-25 12:30',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '电机', venue: '北操', scoreFor: 4, scoreAgainst: 0,
            players: [
                P('刘可淳', 1, { subOff: 48 }),
                P('王向团', 3, { subOff: 31 }),
                P('骆沁毅', 4, { subOn: 48 }),
                P('马蕊', 5, { subOn: 31 }),
                P('赵雅娟', 7, { subOff: 31 }),
                P('石莱茜', 8),
                P('惠铄迪', 9),
                P('穆雨佳', 10, { goals: 4, subOff: 55 }),
                P('陈璋美', 11),
                P('闫舒婷', 14, { subOn: 55 }),
                P('肖春晖', 28, { subOn: 31 })
            ]
        },

        {
            season: '2016-2017', date: '2017-04-02 12:30',
            competition: '马女', stage: '淘汰赛', round: '1/4决赛',
            opponent: '自动化', venue: '北操', scoreFor: 0, scoreAgainst: 0,
            penaltyFor: 3, penaltyAgainst: 2,
            players: [
                P('刘可淳', 1),
                P('王向团', 3, { subOn: 60 }),
                P('马蕊', 5, { subOff: 60 }),
                P('石莱茜', 8),
                P('惠铄迪', 9, { subOn: 31 }),
                P('穆雨佳', 10),
                P('陈璋美', 11),
                P('孙雅琪', 13),
                P('肖春晖', 28, { subOff: 31 })
            ]
        },

        {
            season: '2016-2017', date: '2017-04-08 12:30',
            competition: '马女', stage: '淘汰赛', round: '半决赛',
            opponent: '苏世民', venue: '北操', scoreFor: 1, scoreAgainst: 6,
            players: [
                P('刘可淳', 1),
                P('王向团', 3),
                P('骆沁毅', 4, { subOn: 52 }),
                P('马蕊', 5, { subOn: 44 }),
                P('赵雅娟', 7, { subOff: 44 }),
                P('惠铄迪', 9),
                P('穆雨佳', 10, { goals: 1, penalties: 1 }),
                P('孙雅琪', 13, { subOff: 52 }),
                P('闫舒婷', 14, { subOn: 55 }),
                P('肖春晖', 28, { subOff: 55 })
            ]
        },

        {
            season: '2016-2017', date: '2017-04-15 14:00',
            competition: '马女', stage: '淘汰赛', round: '季军决赛',
            opponent: '法学', venue: '北操', scoreFor: 1, scoreAgainst: 4,
            players: [
                P('刘可淳', 1),
                P('王向团', 3, { subOn: 43 }),
                P('骆沁毅', 4, { subOn: 49, subOff: 69 }),
                P('马蕊', 5, { subOff: 43 }),
                P('赵雅娟', 7, { subOn: 37 }),
                P('惠铄迪', 9, { subOff: 37 }),
                P('穆雨佳', 10, { goals: 1 }),
                P('陈璋美', 11),
                P('孙雅琪', 13),
                P('闫舒婷', 14, { subOn: 69 }),
                P('肖春晖', 28, { subOff: 49 })
            ]
        },

        /* 2017-2018 */
        {
            season: '2017-2018', date: '2018-03-10 14:15',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '环境', venue: '北操', scoreFor: 0, scoreAgainst: 1,
            players: [
                P('刘可淳', 1),
                P('王向团', 6),
                P('惠铄迪', 9, { subOff: 31 }),
                P('石莱茜', 10, { subOff: 56 }),
                P('陈璋美', 11, { subOn: 31 }),
                P('曾锦薇', 12, { subOn: 56 }),
                P('孙雅琪', 13),
                P('肖春晖', 28),
                P('张雅坤', 44)
            ]
        },

        {
            season: '2017-2018', date: '2018-03-18 12:30',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '自动化', venue: '北操', scoreFor: 0, scoreAgainst: 4,
            players: [
                P('刘可淳', 1),
                P('王向团', 3),
                P('惠铄迪', 9, { subOff: 58 }),
                P('石莱茜', 10),
                P('陈璋美', 11, { subOn: 51 }),
                P('曾锦薇', 12, { subOn: 31, subOff: 51 }),
                P('孙雅琪', 13),
                P('项思琪', 14, { subOn: 58 }),
                P('肖春晖', 28, { subOff: 31 }),
                P('张雅坤', 44)
            ]
        },

        {
            season: '2017-2018', date: '2018-03-24 14:15',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '地学', venue: '北操', scoreFor: 2, scoreAgainst: 1,
            players: [
                P('刘可淳', 1, { goals: 1, penalties: 1 }),
                P('王向团', 6),
                P('赵雅娟', 7, { subOn: 48 }),
                P('石莱茜', 10),
                P('曾锦薇', 12, { goals: 1 }),
                P('孙雅琪', 13),
                P('项思琪', 14, { subOff: 48 }),
                P('闫舒婷', 15)
            ]
        },

        /* 2018-2019 */
        {
            season: '2018-2019', date: '2019-03-09 12:30',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '电机', venue: '北操', scoreFor: 2, scoreAgainst: 0,
            players: [
                P('惠铄迪', 9),
                P('曾锦薇', 10, { subOn: 42 }),
                P('陈璋美', 11),
                P('肖盈盈', 12, { goals: 2, subOff: 42 }),
                P('孙雅琪', 13),
                P('王向团', 16),
                P('章凡', 19, { subOn: 31, subOff: 59 }),
                P('秘佳彤', 25, { subOff: 31 }),
                P('林真如', 26, { subOn: 59 }),
                P('张雅坤', 44)
            ]
        },

        {
            season: '2018-2019', date: '2019-03-17 12:30',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '环境', venue: '北操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('刘可淳', 1, { subOn: 23 }),
                P('惠铄迪', 9),
                P('陈璋美', 11),
                P('肖盈盈', 12),
                P('孙雅琪', 13, { subOff: 37 }),
                P('王向团', 16),
                P('章凡', 19, { subOn: 37 }),
                P('秘佳彤', 25, { subOff: 23 }),
                P('林真如', 26)
            ]
        },

        {   // 我方弃赛
            season: '2018-2019', date: '2019-03-23 12:30',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '生院', venue: '北操', scoreFor: 0, scoreAgainst: 3,
            players: []
        },

        /* 2019-2020疫情取消 */

        /* 2020-2021 第3轮轮空 */
        {
            season: '2020-2021', date: '2021-03-07 10:30',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '经管', venue: '北操', scoreFor: 0, scoreAgainst: 7,
            players: [
                P('黄颖卓', 6),
                P('惠铄迪', 9, { subOff: 58 }),
                P('曾锦薇', 10),
                P('王向团', 16),
                P('章凡', 19, { subOn: 58 }),
                P('秘佳彤', 25),
                P('林真如', 26),
                P('李依霏', 29, { subOn: 58 }),
                P('赵英竹', 39, { subOff: 58 })
            ]
        },

        {
            season: '2020-2021', date: '2021-03-13 12:30',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '人文', venue: '北操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('梁竹喧', 7),
                P('惠铄迪', 9),
                P('曾锦薇', 10),
                P('王向团', 16),
                P('章凡', 19, { subOn: 15 }),
                P('秘佳彤', 25),
                P('林真如', 26),
                P('李依霏', 29, { subOff: 15 })
            ]
        },

        /* 2021-2022 第1轮轮空 */
        {
            season: '2021-2022', date: '2022-03-13 12:30',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '社科', venue: '北操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('黄颖卓', 6, { subOff: 41 }),
                P('梁竹喧', 7, { subOff: 54 }),
                P('王睿', 8, { subOn: 54 }),
                P('惠铄迪', 10, { subOn: 31 }),
                P('余谌思璇', 17, { subOn: 41 }),
                P('王艺陶', 25, { subOn: 54 }),
                P('林真如', 26),
                P('吴依凡', 27, { subOff: 54 }),
                P('秘佳彤', 29),
                P('曾锦薇', 30),
                P('赵英竹', 39, { subOff: 31 })
            ]
        },

        {
            season: '2021-2022', date: '2022-03-19 14:15',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '美院', venue: '北操', scoreFor: 0, scoreAgainst: 9,
            players: [
                P('梁竹喧', 7),
                P('王睿', 8, { subOn: 14 }),
                P('惠铄迪', 10),
                P('余谌思璇', 17),
                P('王艺陶', 25, { subOn: 44 }),
                P('林真如', 26),
                P('吴依凡', 27),
                P('曾锦薇', 30, { subOff: 14 }),
                P('赵英竹', 39, { subOff: 44 })
            ]
        },

        /* 2022-2023 */
        {
            season: '2022-2023', date: '2022-10-08 14:00',
            competition: '马女', stage: '循环赛', round: '第1轮',
            opponent: '建筑', venue: '北操', scoreFor: 1, scoreAgainst: 3,
            players: [
                P('钦若兰', 2),
                P('周芙瑶', 5, { subOn: 31 }),
                P('王睿', 8, { goals: 1 }),
                P('谢昱清', 9),
                P('杨越云', 10),
                P('王艺陶', 25),
                P('吴依凡', 27),
                P('赵英竹', 39, { subOff: 31 })
            ]
        },

        {
            season: '2022-2023', date: '2022-10-23 15:30',
            competition: '马女', stage: '循环赛', round: '第2轮',
            opponent: '未央', venue: '北操', scoreFor: 1, scoreAgainst: 7,
            players: [
                P('周芙瑶', 5),
                P('李沐孜', 7),
                P('王睿', 8, { goals: 1 }),
                P('谢昱清', 9, { subOff: 40 }),
                P('杨越云', 10, { subOff: 48 }),
                P('王艺陶', 25, { subOn: 40 }),
                P('吴依凡', 27),
                P('曾锦薇', 30),
                P('赵英竹', 39, { subOn: 48 })
            ]
        },

        {
            season: '2022-2023', date: '2022-11-13 15:45',
            competition: '马女', stage: '循环赛', round: '第3轮',
            opponent: '环境', venue: '北操', scoreFor: 2, scoreAgainst: 0,
            players: [
                P('钦若兰', 2),
                P('周芙瑶', 5),
                P('李沐孜', 7, { goals: 2 }),
                P('王睿', 8),
                P('杨越云', 10, { subOff: 59 }),
                P('王艺陶', 25, { subOn: 59, yellow: 1 }),
                P('吴依凡', 27),
                P('曾锦薇', 30)
            ]
        },

        /* 2023-2024 第1轮轮空 */
        {
            season: '2023-2024', date: '2023-10-22 16:00',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '美院', venue: '紫操', scoreFor: 0, scoreAgainst: 1,
            players: [
                P('周芙瑶', 5),
                P('张乐', 6),
                P('王睿', 8, { yellow: 1 }),
                P('杨越云', 10),
                P('王艺陶', 25, { subOn: 20 }),
                P('吴依凡', 27),
                P('曾锦薇', 30),
                P('董相显', 34, { subOff: 20 })
            ]
        },

        {
            season: '2023-2024', date: '2023-10-29 12:00',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '水利', venue: '紫操', scoreFor: 0, scoreAgainst: 1,
            players: [
                P('钦若兰', 2),
                P('周芙瑶', 5),
                P('张乐', 6),
                P('王睿', 8),
                P('杨越云', 10),
                P('吴依凡', 27),
                P('曾锦薇', 30)
            ]
        },

        /* 2024-2025 */
        {
            season: '2024-2025', date: '2024-10-13 12:00',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '新闻', venue: '紫操', scoreFor: 0, scoreAgainst: 0,
            penaltyFor: 2, penaltyAgainst: 1,
            players: [
                P('周芙瑶', 5, { yellow: 1 }),
                P('张乐', 6),
                P('韦艺', 7, { subOff: 41 }),
                P('王睿', 8, { subOn: 41 }),
                P('杨越云', 10),
                P('秦千驰', 21),
                P('王向团', 26),
                P('曾锦薇', 30)
            ]
        },

        {
            season: '2024-2025', date: '2024-11-17 10:00',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '精仪', venue: '紫操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('周芙瑶', 5),
                P('张乐', 6, { subOn: 39, ownGoals: 1 }),
                P('韦艺', 7, { subOn: 31 }),
                P('王睿', 8),
                P('杨越云', 10, { subOff: 39 }),
                P('秦千驰', 21),
                P('王向团', 26),
                P('曾锦薇', 30),
                P('董相显', 34, { yellow: 1, subOff: 31 })
            ]
        },

        {
            season: '2024-2025', date: '2024-11-24 13:00',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '法学', venue: '紫操', scoreFor: 1, scoreAgainst: 0,
            players: [
                P('周芙瑶', 5, { yellow: 1 }),
                P('韦艺', 7),
                P('王睿', 8, { subOn: 60, yellow: 1 }),
                P('杨越云', 10, { goals: 1, subOff: 60 }),
                P('占璟青', 17),
                P('王向团', 26, { yellow: 1 }),
                P('曾锦薇', 30),
                P('纪天然', 72)
            ]
        },

        {
            season: '2024-2025', date: '2025-03-16 15:45',
            competition: '马女', stage: '淘汰赛', round: '1/8决赛',
            opponent: '医药', venue: '紫操', scoreFor: 0, scoreAgainst: 8,
            players: [
                P('张乐', 6, { subOn: 45 }),
                P('韦艺', 7, { subOn: 31 }),
                P('杨越云', 10),
                P('占璟青', 17, { subOff: 31 }),
                P('秦千驰', 21),
                P('王向团', 26),
                P('曾锦薇', 30, { ownGoals: 1, yellow: 1 }),
                P('李锦轩', 37, { subOff: 45 }),
                P('纪天然', 72)
            ]
        },

        /* 2025-2026 */
        {
            season: '2025-2026', date: '2025-10-18 14:00',
            competition: '马女', stage: '小组赛', round: '第1轮',
            opponent: '日新', venue: '紫操', scoreFor: 0, scoreAgainst: 0,
            penaltyFor: 1, penaltyAgainst: 2,
            players: [
                P('周芙瑶', 5),
                P('张乐', 6),
                P('韦艺', 7, { subOff: 31 }),
                P('杨佳宜', 9),
                P('占璟青', 17, { subOn: 31 }),
                P('王向团', 26),
                P('纪天然', 72),
                P('曾锦薇', 78)
            ]
        },

        {
            season: '2025-2026', date: '2025-11-16 14:00',
            competition: '马女', stage: '小组赛', round: '第2轮',
            opponent: '社科', venue: '紫操', scoreFor: 1, scoreAgainst: 0,
            players: [
                P('周芙瑶', 5, { goals: 1 }),
                P('张乐', 6),
                P('韦艺', 7, { subOff: 15 }),
                P('占璟青', 17, { subOn: 40 }),
                P('王艺陶', 25, { subOn: 15, subOff: 40 }),
                P('王向团', 26),
                P('肖雅迪', 71),
                P('纪天然', 72),
                P('曾锦薇', 78)
            ]
        },

        {
            season: '2025-2026', date: '2025-12-06 11:45',
            competition: '马女', stage: '小组赛', round: '第3轮',
            opponent: '新雅', venue: '西操', scoreFor: 0, scoreAgainst: 0,
            penaltyFor: 2, penaltyAgainst: 3,
            players: [
                P('周芙瑶', 5),
                P('韦艺', 7, { subOff: 11 }),
                P('占璟青', 17),
                P('王向团', 26),
                P('夏淑茜', 28, { subOn: 11 }),
                P('肖雅迪', 71),
                P('纪天然', 72),
                P('曾锦薇', 78)
            ]
        },

        {
            season: '2025-2026', date: '2026-03-15 10:00',
            competition: '马女', stage: '淘汰赛', round: '1/8决赛',
            opponent: '苏世民', venue: '紫操', scoreFor: 0, scoreAgainst: 5,
            players: [
                P('周芙瑶', 5),
                P('张乐', 6, { subOff: 52 }),
                P('韦艺', 7, { subOff: 31 }),
                P('杨佳宜', 9),
                P('杨越云', 10, { subOn: 52 }),
                P('占璟青', 17, { subOn: 31 }),
                P('王向团', 26),
                P('夏淑茜', 28, { subOn: 34 }),
                P('肖雅迪', 71, { subOn: 31, yellow: 1, subOff: 34 }),
                P('纪天然', 72),
                P('曾锦薇', 78)
            ]
        }
    ];

})();