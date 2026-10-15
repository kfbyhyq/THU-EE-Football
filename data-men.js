/* ============================================================
   电子男足原始比赛数据
   ============================================================ */
(function () {

    /**
     * 球员数据构造辅助函数
     * P(name, shirt, opts)
     *   opts.subOn     替补登场分钟（不填 = 首发）
     *   opts.subOff    被换下分钟（不填 = 未换下）
     *   opts.goals     进球数
     *   opts.penalties 点球进球数（含在 goals 内）
     *   opts.assists   助攻数
     *   opts.ownGoals  乌龙球数
     *   opts.yellow    黄牌数
     *   opts.red       红牌数
     */
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

    window.DATA_MEN = [
        /* 2000-2001 甲级 */
        {
            season: '2000-2001', date: '2000',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '数学', venue: '', scoreFor: 5, scoreAgainst: 0,
            partial: true,
            players: []
        },

        {
            season: '2000-2001', date: '2000',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '建筑', venue: '', scoreFor: 0, scoreAgainst: 2,
            partial: true,
            players: []
        },

        {
            season: '2000-2001', date: '2000',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '大专', venue: '', scoreFor: 2, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2000-2001', date: '2001',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '精仪', venue: '', scoreFor: 0, scoreAgainst: 5,
            partial: true,
            players: []
        },

        /* 2001-2002 甲级 */
        {
            season: '2001-2002', date: '2001',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '经管', venue: '', scoreFor: 1, scoreAgainst: 1,
            partial: true,
            players: [
                { name: '王萌', goals: 1 }
            ]
        },

        {
            season: '2001-2002', date: '2001',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '电机', venue: '', scoreFor: 1, scoreAgainst: 0,
            partial: true,
            players: [
                { name: '李昕', goals: 1 }
            ]
        },

        {
            season: '2001-2002', date: '2001',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '化工', venue: '', scoreFor: 1, scoreAgainst: 1,
            partial: true,
            players: [
                { name: '宋小康', goals: 1 }
            ]
        },

        {
            season: '2001-2002', date: '2002',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '建筑', venue: '', scoreFor: 2, scoreAgainst: 0,
            partial: true,
            players: [
                { name: '张阳', goals: 1 },
                { name: '王萌', goals: 1 }
            ]
        },

        {
            season: '2001-2002', date: '2002',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '自动化', venue: '', scoreFor: 2, scoreAgainst: 2,
            extraTime: true, penaltyFor: 5, penaltyAgainst: 4, 
            partial: true,
            players: [
                { name: '张丹', goals: 1 },
                { name: '吴舒伟', goals: 1 }
            ]
        },

        {
            season: '2001-2002', date: '2002',
            competition: '甲级', stage: '淘汰赛', round: '决赛',
            opponent: '电机', venue: '东操', scoreFor: 0, scoreAgainst: 1,
            partial: true,
            players: [
                { name: '王萌', red: 1 },
                { name: '吴舒伟', goals: 1 }
            ]
        },

        /* 2012-2013 甲级 只有比分 */
        {
            season: '2012-2013', date: '2012',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '化工', venue: '', scoreFor: 1, scoreAgainst: 0,
            partial: true,
            players: []
        },

        {
            season: '2012-2013', date: '2012',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '美院', venue: '', scoreFor: 1, scoreAgainst: 0,
            partial: true,
            players: []
        },

        {
            season: '2012-2013', date: '2012',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '核研', venue: '', scoreFor: 0, scoreAgainst: 0,
            partial: true,
            players: []
        },

        {
            season: '2012-2013', date: '2013',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '材料', venue: '', scoreFor: 3, scoreAgainst: 2,
            partial: true,
            players: []
        },

        {
            season: '2012-2013', date: '2013',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '车辆', venue: '', scoreFor: 0, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2012-2013', date: '2013',
            competition: '甲级', stage: '淘汰赛', round: '季军决赛',
            opponent: '核研', venue: '', scoreFor: 4, scoreAgainst: 0,
            partial: true,
            players: []
        },

        /* 2013-2014 甲级 只有比分 */
        {
            season: '2013-2014', date: '2013',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '土木', venue: '', scoreFor: 3, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2013-2014', date: '2013',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '计算机', venue: '', scoreFor: 0, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2013-2014', date: '2013',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '自动化', venue: '', scoreFor: 1, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2013-2014', date: '2014',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '机械', venue: '', scoreFor: 2, scoreAgainst: 1,
            partial: true,
            players: []
        },

        {
            season: '2013-2014', date: '2014',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '环境', venue: '', scoreFor: 1, scoreAgainst: 3,
            partial: true,
            players: []
        },

        {
            season: '2013-2014', date: '2014',
            competition: '甲级', stage: '淘汰赛', round: '季军决赛',
            opponent: '计算机', venue: '', scoreFor: 0, scoreAgainst: 3,
            partial: true,
            players: []
        },

        /* 2014-2015 甲级 只有进球数据 */
        {
            season: '2014-2015', date: '2014-10-18 10:00',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '机械', venue: '紫操', scoreFor: 2, scoreAgainst: 4,
            partial: true,
            players: [
                { name: '宫可玮', goals: 1 },
                { name: '张浩林', goals: 1 }
            ]
        },

        {
            season: '2014-2015', date: '2014-10-25 14:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '水利', venue: '紫操', scoreFor: 0, scoreAgainst: 2,
            partial: true,
            players: []
        },

        {
            season: '2014-2015', date: '2014-11-11 10:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '美院', venue: '西操', scoreFor: 3, scoreAgainst: 2,
            partial: true,
            players: [
                { name: '张亦弛', goals: 1 },
                { name: '杨轶林', goals: 2 }
            ]
        },

        /* 2015-2016 乙级 部分缺助攻 */
        {
            season: '2015-2016', date: '2015-10-18 08:00',
            competition: '乙级', stage: '小组赛', round: '第1轮',
            opponent: '土木', venue: '紫操', scoreFor: 1, scoreAgainst: 3,
            players: [
                P('高威雨', 1, { subOff: 55 }),
                P('李东来', 2),
                P('马泰坤', 4),
                P('熊铮', 5, { subOff: 40 }),
                P('张亦弛', 7),
                P('唐紫健', 8),
                P('张皓', 9, { subOn: 55 }),
                P('张浩林', 11, { goals: 1 }),
                P('李佳钉', 13),
                P('封潇', 17),
                P('曲铮', 24, { subOn: 55 }),
                P('刘怀宇', 28, { subOn: 40 }),
                P('何雨桥', 44, { subOff: 55 }),
                P('张原', 77)
            ]
        },

        {
            season: '2015-2016', date: '2015-11-08 14:00',
            competition: '乙级', stage: '小组赛', round: '第2轮',
            opponent: '化学', venue: '紫操', scoreFor: 3, scoreAgainst: 1,
            players: [
                P('李东来', 2),
                P('熊铮', 5),
                P('符晓', 6),
                P('张亦弛', 7, { goals: 1 }),
                P('唐紫健', 8, { subOff: 74 }),
                P('张皓', 9),
                P('张浩林', 11, { goals: 2, subOff: 80 }),
                P('刘作桢', 12, { subOff: 40 }),
                P('李佳钉', 13),
                P('林浚杰', 20),
                P('王萌', 21, { subOn: 40 }),
                P('何雨桥', 44, { subOn: 74 }),
                P('郝宇', 57, { subOn: 80 }),
                P('张原', 77)
            ]
        },

        {
            season: '2015-2016', date: '2015-12-20 14:00',
            competition: '乙级', stage: '小组赛', round: '第3轮',
            opponent: '交叉', venue: '紫操', scoreFor: 6, scoreAgainst: 1,
            players: [
                P('高威雨', 1, { subOn: 65 }),
                P('马泰坤', 4),
                P('熊铮', 5, { subOn: 74 }),
                P('张亦弛', 7),
                P('唐紫健', 8),
                P('王哲宣', 10, { goals: 4, penalties: 1 }),
                P('张浩林', 11, { subOn: 28, subOff: 65 }),
                P('刘作桢', 12, { subOff: 65 }),
                P('李佳钉', 13, { subOff: 74 }),
                P('封潇', 17, { subOff: 58 }),
                P('林浚杰', 20, { goals: 2 }),
                P('何振豪', 23, { ownGoals: 1 }),
                P('曲铮', 24, { subOn: 58 }),
                P('刘怀宇', 28, { subOn: 65 }),
                P('何雨桥', 44, { subOff: 28 }),
                P('张原', 77)
            ]
        },

        {
            season: '2015-2016', date: '2016-03-07 13:00',
            competition: '乙级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '数学', venue: '紫操', scoreFor: 2, scoreAgainst: 1,
            players: [
                P('高威雨', 1, { subOn: 72 }),
                P('马泰坤', 4, { subOn: 72 }),
                P('熊铮', 5, { subOn: 76, yellow: 1 }),
                P('符晓', 6, { yellow: 1, subOff: 72 }),
                P('张亦弛', 7),
                P('唐紫健', 8),
                P('张皓', 9, { subOff: 40 }),
                P('王哲宣', 10, { goals: 1, yellow: 1, subOff: 76 }),
                P('张浩林', 11, { assists: 1 }),
                P('李佳钉', 13),
                P('封潇', 17, { subOff: 72 }),
                P('林浚杰', 20, { subOn: 40 }),
                P('何振豪', 23, { yellow: 1 }),
                P('何雨桥', 44, { yellow: 1 }),
                P('张原', 77)
            ]
        },

        {
            season: '2015-2016', date: '2016-03-20 13:00',
            competition: '乙级', stage: '淘汰赛', round: '半决赛',
            opponent: '化工', venue: '紫操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('符晓', 6, { yellow: 1 }),
                P('张亦弛', 7),
                P('唐紫健', 8),
                P('张皓', 9, { subOn: 53 }),
                P('王哲宣', 10),
                P('张浩林', 11, { yellow: 1 }),
                P('李佳钉', 13),
                P('封潇', 17),
                P('林浚杰', 20, { yellow: 1, subOff: 53 }),
                P('何振豪', 23),
                P('何雨桥', 44),
                P('张原', 77)
            ]
        },

        {
            season: '2015-2016', date: '2016-04-02 13:00',
            competition: '乙级', stage: '淘汰赛', round: '季军决赛',
            opponent: '土木', venue: '紫操', scoreFor: 2, scoreAgainst: 0,
            players: [
                P('李东来', 2),
                P('马泰坤', 4),
                P('张亦弛', 7, { yellow: 1 }),
                P('唐紫健', 8),
                P('张皓', 9, { subOn: 51 }),
                P('王哲宣', 10),
                P('张浩林', 11, { goals: 2 }),
                P('李佳钉', 13),
                P('封潇', 17),
                P('张钰', 42, { subOff: 51 }),
                P('何雨桥', 44),
                P('张原', 77)
            ]
        },

        /* 2016-2017 甲级 */
        {
            season: '2016-2017', date: '2016-10-22 10:00',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '经管', venue: '紫操', scoreFor: 0, scoreAgainst: 0,
            players: [
                P('李东来', 2),
                P('符晓', 6),
                P('张亦弛', 7),
                P('唐紫健', 8),
                P('张皓', 9, { subOff: 67 }),
                P('王哲宣', 10),
                P('张浩林', 11),
                P('李佳钉', 13),
                P('林浚杰', 20, { subOn: 67 }),
                P('张钰', 42),
                P('何雨桥', 44),
                P('张原', 77, { yellow: 1 })
            ]
        },

        {
            season: '2016-2017', date: '2016-11-06 14:00',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '环境', venue: '紫操', scoreFor: 3, scoreAgainst: 1,
            players: [
                P('李东来', 2),
                P('符晓', 6),
                P('张亦弛', 7, { goals: 1, assists: 1 }),
                P('唐紫健', 8, { subOn: 68 }),
                P('张皓', 9),
                P('王哲宣', 10, { goals: 1, yellow: 1 }),
                P('张浩林', 11, { goals: 1, yellow: 1, assists: 1 }),
                P('李佳钉', 13),
                P('彭进霖', 33, { yellow: 1, assists: 1 }),
                P('张钰', 42, { subOff: 68 }),
                P('何雨桥', 44),
                P('张原', 77)
            ]
        },

        {
            season: '2016-2017', date: '2016-11-19 14:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '自动化', venue: '西操', scoreFor: 2, scoreAgainst: 0,
            players: [
                P('李东来', 2),
                P('符晓', 6),
                P('张亦弛', 7, { goals: 1, penalties: 1 }),
                P('唐紫健', 8, { subOn: 80 }),
                P('张皓', 9),
                P('王哲宣', 10, { goals: 1 }),
                P('张浩林', 11),
                P('李佳钉', 13),
                P('林浚杰', 20, { subOn: 63 }),
                P('彭进霖', 33, { yellow: 1, subOff: 80, assists: 1 }),
                P('张钰', 42, { subOff: 63 }),
                P('何雨桥', 44),
                P('张原', 77)
            ]
        },

        {
            season: '2016-2017', date: '2017-03-19 13:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '化工', venue: '紫操', scoreFor: 1, scoreAgainst: 2,
            extraTime: true,
            players: [
                P('李东来', 2, { red: 1 }),
                P('符晓', 6),
                P('张亦弛', 7),
                P('唐紫健', 8, { yellow: 1 }),
                P('王哲宣', 10, { subOff: 95 }),
                P('张浩林', 11, { yellow: 1, subOff: 85 }),
                P('李佳钉', 13, { yellow: 1 }),
                P('苏若尘', 15, { subOn: 81 }),
                P('刘绍辉', 19, { subOn: 95 }),
                P('林浚杰', 20, { subOff: 81 }),
                P('刘怀宇', 28, { subOn: 85, goals: 1 }),
                P('张钰', 42),
                P('何雨桥', 44, { yellow: 1, assists: 1 }),
                P('张原', 77)
            ]
        },

        /* 2017-2018 甲级 */
        {
            season: '2017-2018', date: '2017-10-22 14:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '材料', venue: '紫操', scoreFor: 3, scoreAgainst: 0,
            players: [
                P('李东来', 1),
                P('张亦弛', 2, { goals: 1, assists: 1 }),
                P('符晓', 6),
                P('唐紫健', 8),
                P('王哲宣', 10, { goals: 2, assists: 1, subOff: 80 }),
                P('张浩林', 11, { assists: 1 }),
                P('李佳钉', 13, { subOff: 40 }),
                P('苏若尘', 15, { subOn: 65, yellow: 1 }),
                P('杨仝', 19),
                P('林浚杰', 20, { subOn: 20 }),
                P('刘树清', 24, { subOff: 20 }),
                P('刘怀宇', 28, { subOn: 80 }),
                P('张曈', 41, { subOn: 40 }),
                P('张钰', 42, { subOff: 65 }),
                P('何雨桥', 44)
            ]
        },

        {
            season: '2017-2018', date: '2017-11-04 14:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '航院', venue: '紫操', scoreFor: 1, scoreAgainst: 0,
            players: [
                P('李东来', 1),
                P('张钧', 4),
                P('符晓', 6, { yellow: 1 }),
                P('唐紫健', 8),
                P('王哲宣', 10),
                P('张浩林', 11, { goals: 1, yellow: 1 }),
                P('李佳钉', 13),
                P('林浚杰', 20),
                P('王世杰', 22, { subOff: 45 }),
                P('王嘉曦', 25, { subOn: 45 }),
                P('高熙元', 40, { subOn: 59 }),
                P('张钰', 42, { subOff: 59 }),
                P('何雨桥', 44, { assists: 1 })
            ]
        },

        {
            season: '2017-2018', date: '2017-11-19 13:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '建筑', venue: '紫操', scoreFor: 8, scoreAgainst: 0,
            players: [
                P('李东来', 1),
                P('张亦弛', 2, { subOff: 52, assists: 1 }),
                P('张钧', 4, { subOff: 41 }),
                P('符晓', 6, { subOff: 72, assists: 1 }),
                P('唐紫健', 8, { goals: 2 }),
                P('毛治齐', 9, { subOn: 63 }),
                P('王哲宣', 10, { goals: 2, assists: 1, subOff: 72 }),
                P('张浩林', 11, { goals: 1, assists: 1, subOff: 67 }),
                P('李佳钉', 13),
                P('苏若尘', 15, { subOn: 67 }),
                P('贾秀峰', 16, { subOn: 72 }),
                P('林浚杰', 20, { goals: 1, assists: 1 }),
                P('王世杰', 22, { subOn: 52 }),
                P('刘树清', 24, { subOn: 41 }),
                P('张曈', 41, { subOn: 72 }),
                P('张钰', 42, { subOff: 63 }),
                P('何雨桥', 44, { goals: 1 })
            ]
        },

        {
            season: '2017-2018', date: '2018-03-18 13:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '计算机', venue: '紫操', scoreFor: 2, scoreAgainst: 0,
            extraTime: true,
            players: [
                P('李东来', 1),
                P('张亦弛', 2, { assists: 1 }),
                P('张钧', 4, { subOn: 64 }),
                P('符晓', 6, { subOff: 109 }),
                P('唐紫健', 8),
                P('王哲宣', 10, { assists: 1 }),
                P('张浩林', 11, { goals: 1 }),
                P('李佳钉', 13, { subOn: 109 }),
                P('杨仝', 19),
                P('林浚杰', 20, { subOff: 64 }),
                P('刘怀宇', 28, { subOff: 67 }),
                P('高熙元', 40, { subOn: 61, yellow: 1 }),
                P('张曈', 41, { subOn: 67 }),
                P('张钰', 42, { yellow: 1, subOff: 61 }),
                P('何雨桥', 44, { goals: 1 })
            ]
        },

        {
            season: '2017-2018', date: '2018-04-01 13:00',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '化工', venue: '紫操', scoreFor: 4, scoreAgainst: 1,
            players: [
                P('李东来', 1),
                P('张亦弛', 2, { goals: 3, yellow: 1 }),
                P('张钧', 4, { subOn: 62 }),
                P('符晓', 6),
                P('唐紫健', 8),
                P('王哲宣', 10, { goals: 1, assists: 2 }),
                P('张浩林', 11, { assists: 2, yellow: 1 }),
                P('林浚杰', 20, { subOff: 58 }),
                P('王嘉曦', 25, { subOn: 58 }),
                P('刘怀宇', 28, { subOff: 62 }),
                P('张曈', 41),
                P('张钰', 42),
                P('何雨桥', 44)
            ]
        },

        {
            season: '2017-2018', date: '2018-04-19 13:00',
            competition: '甲级', stage: '淘汰赛', round: '决赛',
            opponent: '车辆', venue: '东操', scoreFor: 3, scoreAgainst: 3,
            extraTime: true,
            penaltyFor: 4, penaltyAgainst: 3,
            players: [
                P('李东来', 1),
                P('张亦弛', 2, { goals: 1 }),
                P('符晓', 6, { yellow: 1 }),
                P('唐紫健', 8, { assists: 1 }),
                P('王哲宣', 10, { assists: 1 }),
                P('张浩林', 11, { yellow: 1 }),
                P('李佳钉', 13, { assists: 1 }),
                P('杨仝', 19, { goals: 2 }),
                P('林浚杰', 20, { yellow: 1, subOff: 77 }),
                P('刘怀宇', 28, { subOn: 77 }),
                P('高熙元', 40, { subOn: 71 }),
                P('张钰', 42, { subOff: 71 }),
                P('何雨桥', 44, { yellow: 1 })
            ]
        },

        /* 2018-2019 甲级 */
        {
            season: '2018-2019', date: '2018-10-20 12:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '计算机', venue: '紫操', scoreFor: 1, scoreAgainst: 0,
            players: [
                P('高威雨', 0),
                P('张亦弛', 2, { yellow: 1 }),
                P('张钧', 4),
                P('黄振宇', 6, { subOn: 41, yellow: 1 }),
                P('唐紫健', 8, { subOff: 80 }),
                P('王哲宣', 10),
                P('张浩林', 11),
                P('李佳钉', 13, { subOn: 48 }),
                P('王健丰', 15, { subOn: 80 }),
                P('刘中金', 22, { assists: 1 }),
                P('高熙元', 40, { subOff: 41 }),
                P('张曈', 41, { subOff: 48 }),
                P('何雨桥', 44, { goals: 1 }),
                P('游弘哲', 59)
            ]
        },

        {
            season: '2018-2019', date: '2018-11-04 12:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '水利', venue: '紫操', scoreFor: 7, scoreAgainst: 1,
            players: [
                P('高威雨', 0, { subOff: 75 }),
                P('王浩然', 1, { subOn: 75 }),
                P('张亦弛', 2, { goals: 1, assists: 1 }),
                P('周沛灵', 3, { subOn: 80 }),
                P('黄振宇', 6, { assists: 1, subOff: 63 }),
                P('熊鑫', 7, { subOn: 63, goals: 1 }),
                P('唐紫健', 8),
                P('王哲宣', 10, { goals: 2 }),
                P('张浩林', 11, { goals: 1, assists: 1, yellow: 1, subOff: 80 }),
                P('李佳钉', 13, { subOff: 63 }),
                P('王健丰', 15, { subOn: 75 }),
                P('林浚杰', 20, { subOff: 75 }),
                P('刘中金', 22, { goals: 2, assists: 3 }),
                P('张曈', 41, { subOn: 63 }),
                P('何雨桥', 44, { assists: 1 }),
                P('游弘哲', 59)
            ]
        },

        {
            season: '2018-2019', date: '2018-11-17 13:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '工物', venue: '西操', scoreFor: 3, scoreAgainst: 1,
            players: [
                P('高威雨', 0),
                P('张亦弛', 2, { goals: 1, penalties: 1 }),
                P('张钧', 4, { subOn: 63, yellow: 1 }),
                P('唐紫健', 8),
                P('王哲宣', 10, { assists: 1 }),
                P('张浩林', 11, { goals: 1 }),
                P('李佳钉', 13, { ownGoals: 1 }),
                P('王健丰', 15, { subOff: 74 }),
                P('林浚杰', 20, { yellow: 1, subOff: 63 }),
                P('刘中金', 22, { goals: 1 }),
                P('高熙元', 40, { subOn: 74 }),
                P('何雨桥', 44),
                P('游弘哲', 59, { yellow: 1 })
            ]
        },

        {
            season: '2018-2019', date: '2019-03-16 13:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '电机', venue: '紫操', scoreFor: 2, scoreAgainst: 1,
            players: [
                P('高威雨', 0),
                P('张亦弛', 2, { assists: 1 }),
                P('黄振宇', 6),
                P('唐紫健', 8),
                P('王哲宣', 10, { goals: 1 }),
                P('张浩林', 11),
                P('李佳钉', 13, { goals: 1 }),
                P('林浚杰', 20, { red: 1 }),
                P('刘中金', 22),
                P('何雨桥', 44, { assists: 1 }),
                P('游弘哲', 59)
            ]
        },

        {
            season: '2018-2019', date: '2019-03-30 15:30',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '工工', venue: '紫操', scoreFor: 0, scoreAgainst: 1,
            players: [
                P('高威雨', 0),
                P('张亦弛', 2),
                P('熊鑫', 7, { subOn: 80 }),
                P('黄振宇', 6),
                P('唐紫健', 8),
                P('王哲宣', 10),
                P('张浩林', 11),
                P('李佳钉', 13, { yellow: 1 }),
                P('刘中金', 22, { subOff: 80 }),
                P('于鹏飞', 26),
                P('何雨桥', 44),
                P('游弘哲', 59)
            ]
        },

        {
            season: '2018-2019', date: '2019-04-06 10:00',
            competition: '甲级', stage: '淘汰赛', round: '季军决赛',
            opponent: '化工', venue: '紫操', scoreFor: 2, scoreAgainst: 2,
            penaltyFor: 4, penaltyAgainst: 5,
            extraTime: true,
            players: [
                P('王浩然', 1),
                P('周沛灵', 3, { subOff: 54 }),
                P('黄振宇', 6, { goals: 1, penalties: 1 }),
                P('熊鑫', 7, { yellow: 1 }),
                P('唐紫健', 8, { subOn: 88, goals: 1 }),
                P('李佳钉', 13, { subOn: 81, yellow: 1 }),
                P('金博文', 17, { subOn: 41 }),
                P('聂天一', 18, { subOff: 64 }),
                P('林浚杰', 20, { subOff: 88 }),
                P('程凯越', 21, { subOff: 81 }),
                P('蒋浩', 23, { subOn: 41 }),
                P('刘树清', 24, { subOff: 41 }),
                P('于鹏飞', 26),
                P('朱庆涛', 29, { subOff: 41 }),
                P('林宗裕', 30, { subOn: 54 }),
                P('张曈', 41),
                P('何雨桥', 44, { subOn: 64, assists: 1 })
            ]
        },

        {
            season: '2019-2020', date: '2019-10-19 12:00',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '建筑', venue: '紫操', scoreFor: 7, scoreAgainst: 1,
            players: [
                P('程凯越', 5, { subOff: 41 }),
                P('黄振宇', 6),
                P('王哲宣', 7, { goals: 1, assists: 1 }),
                P('高旖泽', 10, { subOn: 78 }),
                P('张浩林', 11, { goals: 2, assists: 1, subOff: 60 }),
                P('李佳钉', 13, { goals: 1, subOff: 62 }),
                P('李宣成', 16, { goals: 1, subOff: 41 }),
                P('金博文', 17, { subOn: 60, assists: 1 }),
                P('刘翊臣', 20, { assists: 1, subOff: 28 }),
                P('刘中金', 22, { subOn: 28, assists: 1 }),
                P('刘树清', 24),
                P('盛业鑫', 32, { subOn: 41, assists: 1 }),
                P('张曈', 41, { goals: 1, subOn: 62 }),
                P('何雨桥', 44, { goals: 1, assists: 1 }),
                P('朝越', 57, { subOn: 41 }),
                P('唐紫健', 58, { subOff: 78 }),
                P('游弘哲', 59, { yellow: 1 })
            ]
        },

        {
            season: '2019-2020', date: '2019-11-03 14:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '计算机', venue: '紫操', scoreFor: 4, scoreAgainst: 1,
            players: [
                P('王浩然', 1, { subOn: 80 }),
                P('张亦弛', 2, { assists: 1 }),
                P('黄振宇', 6),
                P('王哲宣', 7, { subOff: 68 }),
                P('张浩林', 11, { goals: 2, assists: 1 }),
                P('李佳钉', 13, { goals: 1, yellow: 1 }),
                P('刘中金', 22, { assists: 1 }),
                P('蒋浩', 23, { subOn: 51 }),
                P('刘树清', 24, { subOff: 80 }),
                P('张曈', 41, { subOn: 68 }),
                P('何雨桥', 44),
                P('朝越', 57, { yellow: 1, subOff: 51 }),
                P('唐紫健', 58, { goals: 1 }),
                P('游弘哲', 59, { yellow: 1 })
            ]
        },

        {
            season: '2019-2020', date: '2019-11-23 11:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '环境', venue: '西操', scoreFor: 4, scoreAgainst: 1,
            players: [
                P('张亦弛', 2, { goals: 1 }),
                P('程凯越', 5, { subOn: 80 }),
                P('黄振宇', 6, { goals: 1, yellow: 1, subOff: 80 }),
                P('王哲宣', 7),
                P('高威雨', 9, { subOn: 63, goals: 1 }),
                P('张浩林', 11, { yellow: 1, assists: 2 }),
                P('李佳钉', 13, { assists: 1 }),
                P('李宣成', 16, { subOn: 78 }),
                P('金博文', 17, { subOff: 63 }),
                P('刘中金', 22, { goals: 1, assists: 1 }),
                P('刘树清', 24),
                P('何雨桥', 44, { subOff: 78 }),
                P('朝越', 57, { subOff: 80 }),
                P('唐紫健', 58),
                P('吴锐浩', 76, { subOn: 80 })
            ]
        },

        /* 2020-2021 */
        {
            season: '2020-2021', date: '2020-10-17 12:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '土木', venue: '紫操', scoreFor: 9, scoreAgainst: 2,
            players: [
                P('程凯越', 5, { subOff: 73 }),
                P('王哲宣', 7, { goals: 2, assists: 1 }),
                P('张浩林', 11, { goals: 3, assists: 2, subOff: 69 }),
                P('周皓彬', 12, { subOn: 52 }),
                P('李佳钉', 13),
                P('金博文', 17, { subOn: 69 }),
                P('刘中金', 22, { goals: 1, subOff: 73 }),
                P('蒋浩', 23, { subOn: 60 }),
                P('张家炜', 34),
                P('杨元昊', 39, { subOn: 73 }),
                P('赵天放', 40, { subOff: 60, assists: 2 }),
                P('张曈', 41, { goals: 1, subOff: 52 }),
                P('朱静远', 42, { subOn: 75 }),
                P('何雨桥', 44, { goals: 2, assists: 1 }),
                P('朝越', 57, { assists: 2 }),
                P('唐紫健', 58, { subOff: 75 }),
                P('吴锐浩', 76, { subOn: 73 })
            ]
        },

        {
            season: '2020-2021', date: '2020-10-24 10:00',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '计算机', venue: '紫操', scoreFor: 2, scoreAgainst: 2,
            players: [
                P('黄振宇', 6),
                P('张浩林', 11, { goals: 1, assists: 1 }),
                P('李佳钉', 13, { subOn: 76 }),
                P('王健丰', 15, { subOn: 68 }),
                P('刘中金', 22, { assists: 1 }),
                P('蒋浩', 23, { subOff: 76 }),
                P('田奇睿', 29),
                P('张家炜', 34),
                P('杨元昊', 39, { subOff: 68 }),
                P('赵天放', 40, { subOn: 63 }),
                P('张曈', 41, { goals: 1, subOff: 76 }),
                P('何雨桥', 44, { subOn: 76 }),
                P('苏若尘', 53, { subOff: 63 }),
                P('朝越', 57, { subOff: 63 }),
                P('唐紫健', 58),
                P('吴锐浩', 76, { subOn: 63 })
            ]
        },

        {
            season: '2020-2021', date: '2020-11-15 11:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '材料', venue: '紫操', scoreFor: 1, scoreAgainst: 1,
            players: [
                P('程凯越', 5, { subOff: 66 }),
                P('黄振宇', 6, { goals: 1, penalties: 1 }),
                P('王哲宣', 7),
                P('张浩林', 11, { subOn: 41 }),
                P('李佳钉', 13),
                P('刘中金', 22),
                P('田奇睿', 29),
                P('张家炜', 34),
                P('杨元昊', 39, { subOn: 66 }),
                P('赵天放', 40, { subOff: 41 }),
                P('张曈', 41, { yellow: 1, subOn: 80 }),
                P('何雨桥', 44, { yellow: 1, subOff: 80 }),
                P('朝越', 57),
                P('唐紫健', 58)
            ]
        },

        {
            season: '2020-2021', date: '2021-03-06 10:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '化工', venue: '紫操', scoreFor: 1, scoreAgainst: 1,
            penaltyFor: 4, penaltyAgainst: 5,
            extraTime: true,
            players: [
                P('黄振宇', 6, { yellow: 1 }),
                P('王哲宣', 7),
                P('高威雨', 9, { goals: 1, subOff: 80 }),
                P('张浩林', 11, { subOn: 70 }),
                P('李佳钉', 13, { yellow: 1 }),
                P('金博文', 17, { subOn: 80 }),
                P('刘中金', 22, { assists: 1 }),
                P('蒋浩', 23),
                P('田奇睿', 29, { subOff: 70 }),
                P('盛业鑫', 32, { subOn: 87 }),
                P('张家炜', 34),
                P('张曈', 41),
                P('何雨桥', 44, { subOff: 87 }),
                P('朝越', 57, { yellow: 1 })
            ]
        },

        /* 2021-2022 */
        {
            season: '2021-2022', date: '2021-10-23 15:00',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '新闻', venue: '西操', scoreFor: 7, scoreAgainst: 0,
            players: [
                P('程凯越', 5, { yellow: 1, subOff: 80 }),
                P('黄振宇', 6, { goals: 1, assists: 1 }),
                P('王哲宣', 7, { goals: 1, assists: 1, subOff: 77 }),
                P('贾尼别克·阿达力别克', 10, { goals: 1, subOn: 61 }),
                P('张浩林', 11, { goals: 2, subOff: 61 }),
                P('李佳钉', 13),
                P('郑荣坤', 19, { subOn: 77 }),
                P('刘翊臣', 20, { subOn: 75 }),
                P('宋思齐', 21, { subOn: 70 }),
                P('刘中金', 22, { goals: 1, assists: 2, subOff: 75 }),
                P('刘泽浩', 24),
                P('刘明礼', 27, { subOn: 75 }),
                P('张家炜', 34),
                P('杨元昊', 39, { subOn: 80 }),
                P('何雨桥', 44, { subOff: 70 }),
                P('朝越', 57, { assists: 2 }),
                P('唐紫健', 58, { goals: 1, subOff: 75 })
            ]
        },

        {
            season: '2021-2022', date: '2021-11-06 10:00',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '工物', venue: '紫操', scoreFor: 1, scoreAgainst: 1,
            players: [
                P('程凯越', 5, { yellow: 1 }),
                P('黄振宇', 6),
                P('王哲宣', 7, { goals: 1, yellow: 1 }),
                P('张浩林', 11, { assists: 1 }),
                P('李佳钉', 13),
                P('刘中金', 22),
                P('蒋浩', 23, { subOn: 79 }),
                P('刘泽浩', 24),
                P('张家炜', 34),
                P('何雨桥', 44),
                P('朝越', 57, { yellow: 1, subOff: 79 }),
                P('唐紫健', 58)
            ]
        },

        {
            season: '2021-2022', date: '2021-11-04 18:30',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '计算机', venue: '紫操', scoreFor: 3, scoreAgainst: 2,
            players: [
                P('黄振宇', 6, { subOff: 65 }),
                P('王哲宣', 7, { goals: 2 }),
                P('高威雨', 9, { subOn: 65 }),
                P('张浩林', 11, { goals: 1, assists: 1, subOff: 41 }),
                P('李佳钉', 13),
                P('刘中金', 22),
                P('蒋浩', 23),
                P('刘泽浩', 24, { subOff: 51 }),
                P('田奇睿', 29, { subOn: 51, subOff: 80 }),
                P('张家炜', 34),
                P('张曈', 41, { subOn: 80 }),
                P('何雨桥', 44),
                P('覃乐山', 45, { subOn: 41 }),
                P('朝越', 57, { yellow: 1 }),
                P('唐紫健', 58, { yellow: 1 })
            ]
        },

        {
            season: '2021-2022', date: '2022-03-06 13:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '社科', venue: '紫操', scoreFor: 1, scoreAgainst: 5,
            players: [
                P('程凯越', 5),
                P('王哲宣', 7),
                P('高威雨', 9, { subOn: 54 }),
                P('张浩林', 11, { subOff: 54, assists: 1 }),
                P('李佳钉', 13, { goals: 1 }),
                P('王健丰', 15, { subOff: 41 }),
                P('解天昊', 16, { subOn: 79 }),
                P('刘翊臣', 20, { subOn: 75 }),
                P('宋思齐', 21, { subOn: 79 }),
                P('刘中金', 22, { subOff: 79 }),
                P('蒋浩', 23, { ownGoals: 1 }),
                P('刘泽浩', 24, { subOff: 52 }),
                P('张家炜', 34),
                P('林骏延', 35, { subOn: 41, yellow: 1, subOff: 75 }),
                P('张曈', 41, { subOn: 52 }),
                P('何雨桥', 44),
                P('唐紫健', 58, { yellow: 1, subOff: 79 })
            ]
        },

        /* 2022-2023 */
        {
            season: '2022-2023', date: '2022-10-16 12:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '精仪', venue: '紫操', scoreFor: 6, scoreAgainst: 0,
            players: [
                P('程凯越', 5, { subOff: 41 }),
                P('王哲宣', 7, { goals: 1 }),
                P('高威雨', 9, { subOn: 41, goals: 1, assists: 1 }),
                P('贾尼别克·阿达力别克', 10, { subOff: 41 }),
                P('白旭光', 11, { goals: 2, assists: 1 }),
                P('解天昊', 16, { goals: 2, subOff: 56 }),
                P('时瑞杰', 17, { assists: 1, subOn: 56 }),
                P('刘泽浩', 24),
                P('孙屹申', 28, { subOn: 67 }),
                P('田奇睿', 29, { subOff: 70 }),
                P('高天鸿', 33),
                P('郑天翔', 38, { subOn: 41 }),
                P('何雨桥', 44, { subOff: 67, assists: 1 }),
                P('贾恺琛', 47, { subOn: 70 }),
                P('朝越', 57),
                P('唐紫健', 58, { assists: 1 })
            ]
        },

        {
            season: '2022-2023', date: '2022-11-13 18:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '车辆', venue: '紫操', scoreFor: 2, scoreAgainst: 1,
            players: [
                P('王哲宣', 7, { goals: 1, yellow: 1 }),
                P('高威雨', 9, { subOn: 69 }),
                P('贾尼别克·阿达力别克', 10, { assists: 1, subOff: 69 }),
                P('白旭光', 11),
                P('解天昊', 16, { yellow: 1, subOff: 41 }),
                P('时瑞杰', 17, { subOn: 73 }),
                P('陈子阳', 18, { subOn: 80, yellow: 1 }),
                P('蒋浩', 23, { subOn: 41, yellow: 1 }),
                P('孙屹申', 28, { subOn: 73 }),
                P('田奇睿', 29),
                P('高天鸿', 33),
                P('郑天翔', 38, { subOff: 73 }),
                P('何雨桥', 44),
                P('贾恺琛', 47),
                P('朝越', 57, { yellow: 1, subOff: 80 }),
                P('唐紫健', 58, { subOff: 73 })
            ]
        },

        {
            season: '2022-2023', date: '2022-11-26 14:30',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '工工', venue: '紫操', scoreFor: 2, scoreAgainst: 0,
            players: [
                P('张钧', 4, { subOn: 68 }),
                P('王哲宣', 7, { assists: 1 }),
                P('周皓彬', 12, { subOff: 53 }),
                P('方正', 14, { goals: 1 }),
                P('时瑞杰', 17),
                P('蒋浩', 23, { assists: 1, subOn: 53 }),
                P('刘泽浩', 24, { subOff: 68 }),
                P('刘明礼', 27, { subOn: 72 }),
                P('孙屹申', 28, { subOff: 41 }),
                P('高天鸿', 33),
                P('张家炜', 34, { subOn: 68 }),
                P('郑天翔', 38, { subOff: 68 }),
                P('朱静远', 42, { subOn: 41, subOff: 72 }),
                P('何雨桥', 44, { goals: 1 }),
                P('贾恺琛', 47),
                P('路子平', 49, { subOn: 53 }),
                P('朝越', 57, { subOff: 53 })
            ]
        },

        {
            season: '2022-2023', date: '2023-03-18 18:00',
            competition: '甲级', stage: '淘汰赛', round: '1/4决赛',
            opponent: '经管', venue: '紫操', scoreFor: 5, scoreAgainst: 5,
            penaltyFor: 5, penaltyAgainst: 4,
            extraTime: true,
            players: [
                P('王哲宣', 7, { assists: 1 }),
                P('贾尼别克·阿达力别克', 10, { subOff: 52 }),
                P('周皓彬', 12, { subOn: 52 }),
                P('方正', 14, { goals: 2 }),
                P('解天昊', 16, { goals: 1, subOff: 80 }),
                P('时瑞杰', 17, { subOn: 67 }),
                P('蒋浩', 23, { subOn: 77 }),
                P('刘泽浩', 24, { subOff: 77 }),
                P('高天鸿', 33),
                P('张家炜', 34, { subOff: 41 }),
                P('郑天翔', 38, { subOn: 41 }),
                P('何雨桥', 44, { goals: 1, penalties: 1, assists: 2 }),
                P('贾恺琛', 47),
                P('路子平', 49, { subOn: 85 }),
                P('朝越', 57, { assists: 1, subOff: 67 }),
                P('唐紫健', 58),
                P('吴锐浩', 76, { subOn: 80, subOff: 85 })
            ]
        },

        {
            season: '2022-2023', date: '2023-03-26 18:00',
            competition: '甲级', stage: '淘汰赛', round: '半决赛',
            opponent: '社科', venue: '紫操', scoreFor: 1, scoreAgainst: 4,
            players: [
                P('程凯越', 5, { yellow: 1, subOff: 60 }),
                P('王哲宣', 7, { assists: 1 }),
                P('贾尼别克·阿达力别克', 10, { subOff: 78 }),
                P('周皓彬', 12, { subOn: 69, goals: 1 }),
                P('方正', 14),
                P('解天昊', 16, { subOff: 69 }),
                P('时瑞杰', 17, { subOn: 78 }),
                P('蒋浩', 23, { subOn: 60 }),
                P('刘泽浩', 24),
                P('刘明礼', 27, { subOn: 80 }),
                P('高天鸿', 33),
                P('郑天翔', 38, { subOn: 60 }),
                P('何雨桥', 44, { yellow: 1, subOff: 60 }),
                P('贾恺琛', 47),
                P('朝越', 57),
                P('唐紫健', 58, { subOff: 80 })
            ]
        },

        {
            season: '2022-2023', date: '2023-04-08 18:00',
            competition: '甲级', stage: '淘汰赛', round: '季军决赛',
            opponent: '车辆', venue: '紫操', scoreFor: 0, scoreAgainst: 5,
            players: [
                P('程凯越', 5),
                P('高威雨', 9, { subOff: 59 }),
                P('白旭光', 11),
                P('周皓彬', 12),
                P('方正', 14),
                P('陈子阳', 18, { subOn: 59 }),
                P('蒋浩', 23),
                P('刘泽浩', 24),
                P('刘明礼', 27),
                P('田奇睿', 29, { yellow: 1, subOff: 48 }),
                P('张家炜', 34),
                P('宋思齐', 21, { subOn: 48 }),
                P('朝越', 57)
            ]
        },

        /* 2023-2024 */
        {
            season: '2023-2024', date: '2023-10-28 12:00',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '建筑', venue: '西操', scoreFor: 2, scoreAgainst: 4,
            players: [
                P('吴宇轩', 2, { subOn: 7 }),
                P('欧阳天健', 3, { goals: 1, subOff: 54 }),
                P('王哲宣', 7, { assists: 1 }),
                P('贾尼别克·阿达力别克', 10),
                P('解天昊', 11, { subOn: 54 }),
                P('华尔默', 19),
                P('方正', 21),
                P('刘泽浩', 24),
                P('高天鸿', 33),
                P('郑天翔', 38, { subOff: 7 }),
                P('汤怀智', 41),
                P('何雨桥', 44, { goals: 1, penalties: 1 }),
                P('朝越', 57)
            ]
        },

        {
            season: '2023-2024', date: '2023-11-11 10:00',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '工工', venue: '紫操', scoreFor: 2, scoreAgainst: 5,
            players: [
                P('吴宇轩', 2, { subOff: 71 }),
                P('欧阳天健', 3, { goals: 1, subOff: 80 }),
                P('贾恺琛', 5, { subOn: 62 }),
                P('李然', 8, { subOn: 78 }),
                P('贾尼别克·阿达力别克', 10, { assists: 1, subOff: 46 }),
                P('解天昊', 11, { subOff: 62 }),
                P('时瑞杰', 17, { subOn: 71 }),
                P('华尔默', 19, { subOff: 78 }),
                P('方正', 21, { subOn: 46 }),
                P('刘泽浩', 24, { ownGoals: 1 }),
                P('臧彦恒', 26, { subOn: 74 }),
                P('孙屹申', 28, { red: 1 }),
                P('张家炜', 34),
                P('何雨桥', 44, { goals: 1, yellow: 1 }),
                P('路子平', 49, { subOn: 80 }),
                P('朝越', 57, { subOff: 74 }),
                P('唐紫健', 58)
            ]
        },

        {   // 对方弃赛
            season: '2023-2024', date: '2023-12-03 12:30',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '精仪', venue: '紫操', scoreFor: 3, scoreAgainst: 0,
            players: []
        },

        /* 2024-2025 */
        {
            season: '2024-2025', date: '2024-10-13 18:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '车辆', venue: '紫操', scoreFor: 1, scoreAgainst: 6,
            players: [
                P('程宇灏', 1, { subOn: 41 }),
                P('欧阳天健', 3, { subOff: 64 }),
                P('李道逸', 7),
                P('解天昊', 11),
                P('张一鸣', 16, { subOn: 64 }),
                P('华尔默', 19, { subOff: 70 }),
                P('朱禹安', 20, { subOn: 41 }),
                P('方正', 21, { goals: 1 }),
                P('王宇翀', 23, { subOn: 70 }),
                P('刘泽浩', 24, { subOff: 41 }),
                P('周子煦', 25),
                P('孙屹申', 28, { subOff: 48 }),
                P('苏图克布格拉·帕尔哈提', 32, { assists: 1, subOn: 58 }),
                P('高天鸿', 33, { subOff: 41 }),
                P('郑天翔', 38),
                P('汤怀智', 41, { subOff: 58 }),
                P('何雨桥', 44, { subOn: 48 })
            ]
        },

        {
            season: '2024-2025', date: '2024-10-27 15:00',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '自动化', venue: '紫操', scoreFor: 4, scoreAgainst: 0,
            players: [
                P('欧阳天健', 3, { subOn: 25, goals: 3, yellow: 1 }),
                P('李道逸', 7, { goals: 1 }),
                P('解天昊', 11),
                P('张一鸣', 16, { subOn: 56 }),
                P('华尔默', 19, { yellow: 1, subOff: 56 }),
                P('朱禹安', 20, { subOn: 62 }),
                P('方正', 21, { subOff: 52 }),
                P('王宇翀', 23, { subOn: 80 }),
                P('刘泽浩', 24),
                P('周子煦', 25, { assists: 1 }),
                P('孙屹申', 28, { yellow: 1, subOff: 41 }),
                P('苏图克布格拉·帕尔哈提', 32, { subOff: 25 }),
                P('高天鸿', 33),
                P('郑天翔', 38, { subOff: 80 }),
                P('汤怀智', 41, { assists: 1, subOff: 62 }),
                P('何雨桥', 44, { subOn: 41 }),
                P('邰伟宸', 51, { subOn: 52 })
            ]
        },

        {
            season: '2024-2025', date: '2024-12-08 14:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '化工', venue: '紫操', scoreFor: 0, scoreAgainst: 0,
            players: [
                P('程宇灏', 1),
                P('吴宇轩', 2, { subOn: 58 }),
                P('欧阳天健', 3, { subOn: 40 }),
                P('宋思齐', 6, { subOn: 79 }),
                P('李道逸', 7, { subOff: 73 }),
                P('解天昊', 11),
                P('张一鸣', 16, { subOn: 80 }),
                P('朱禹安', 20, { subOff: 59 }),
                P('方正', 21),
                P('王宇翀', 23, { subOn: 59 }),
                P('周子煦', 25, { yellow: 1 }),
                P('孙屹申', 28, { subOff: 79 }),
                P('苏图克布格拉·帕尔哈提', 32, { subOn: 73 }),
                P('郑天翔', 38, { subOff: 58 }),
                P('汤怀智', 41, { subOff: 80 }),
                P('何雨桥', 44),
                P('邰伟宸', 51, { subOff: 40 })
            ]
        },

        /* 2025-2026 */
        {
            season: '2025-2026', date: '2025-11-02 18:30',
            competition: '甲级', stage: '小组赛', round: '第1轮',
            opponent: '建筑', venue: '紫操', scoreFor: 0, scoreAgainst: 2,
            players: [
                P('程宇灏', 1),
                P('吴宇轩', 2, { subOn: 65 }),
                P('李道逸', 7, { subOff: 80 }),
                P('刘骁毅', 9, { subOn: 80 }),
                P('张果然', 10, { subOn: 36 }),
                P('解天昊', 11, { subOff: 36 }),
                P('张一鸣', 16, { yellow: 1 }),
                P('崔玹彬', 18, { subOn: 41 }),
                P('方正', 21, { subOff: 72 }),
                P('王宇翀', 23, { subOff: 80 }),
                P('刘泽浩', 24, { subOff: 41 }),
                P('周子煦', 25),
                P('郑天翔', 38, { subOff: 65 }),
                P('汤怀智', 41),
                P('达里奥', 44, { subOn: 72 }),
                P('朱胤存', 76, { subOn: 80 })
            ]
        },

        {
            season: '2025-2026', date: '2025-11-23 18:30',
            competition: '甲级', stage: '小组赛', round: '第2轮',
            opponent: '经管', venue: '紫操', scoreFor: 0, scoreAgainst: 3,
            players: [
                P('程宇灏', 1),
                P('吴宇轩', 2, { subOn: 41 }),
                P('李道逸', 7, { subOff: 80 }),
                P('李然', 8, { subOn: 67 }),
                P('张果然', 10),
                P('邰伟宸', 15, { yellow: 1, subOff: 73 }),
                P('张一鸣', 16),
                P('崔玹彬', 18, { subOn: 63 }),
                P('方正', 21),
                P('王宇翀', 23, { subOff: 63 }),
                P('刘泽浩', 24, { subOff: 55 }),
                P('周子煦', 25),
                P('苏图克布格拉·帕尔哈提', 32, { subOn: 80 }),
                P('郑天翔', 38, { subOff: 41 }),
                P('汤怀智', 41, { yellow: 1, subOff: 67 }),
                P('白松涛', 42, { subOn: 73 }),
                P('达里奥', 44, { subOn: 55 })
            ]
        },

        {
            season: '2025-2026', date: '2025-12-21 10:00',
            competition: '甲级', stage: '小组赛', round: '第3轮',
            opponent: '材料', venue: '紫操', scoreFor: 1, scoreAgainst: 1,
            players: [
                P('程宇灏', 1),
                P('吴宇轩', 2),
                P('李道逸', 7, { subOff: 48 }),
                P('刘骁毅', 9, { subOff: 46 }),
                P('张果然', 10, { goals: 1 }),
                P('解天昊', 11, { assists: 1 }),
                P('张一鸣', 16),
                P('崔玹彬', 18, { subOn: 48 }),
                P('朱禹安', 20, { subOn: 46 }),
                P('方正', 21),
                P('张路星', 22, { subOn: 67 }),
                P('王宇翀', 23, { subOff: 80 }),
                P('臧彦恒', 26, { subOn: 80, yellow: 1 }),
                P('郑天翔', 38, { subOff: 67, yellow: 1 }),
                P('汤怀智', 41)
            ]
        }
    ];

})();


