/**
 * 课文/课时数据 - 2026年秋季新版教材
 * 语文：统编版五年级上册（2026秋新版，OCR+网络搜索确认）
 * 数学：人教版五年级上册（2026秋新版，搜索确认8大变化）
 * 英语：人教精通版五年级上册
 *
 * 2026秋语文新版变化：
 * - 删除：搭石、小岛（→彩色的翅膀）、松鼠（→金字塔）、精彩极了和糟糕透了（→女航天员的信）
 * - 删除：四季之美（→第一场雪）、鸟的天堂（→白鹭移到第七单元）、我的长生果（→走遍天下书为侣）
 * - 古诗变化：长相思→早春呈水部张十八员外
 *
 * 2026秋数学新版变化（百度搜索确认）：
 * - 新增第一单元：观察简单组合体（原四年级内容）
 * - 删除：简易方程（解方程内容移到初中）、植树问题、位置单元
 * - 保留但调整：小数乘法、小数除法、多边形的面积
 * - 新增：图形的运动（轴对称/平移/旋转）、有趣的密铺（实践活动）
 * - 第五单元：用字母表示数和数量关系（方程的感知，不含解方程）
 * - 第七单元：可能性（从第四单元后移）
 */
const LESSONS = {
  chinese: [
    // 第一单元 万物有灵
    { id: 1, name: "第1课 桂花雨" },
    { id: 2, name: "第2课 落花生" },
    { id: 3, name: "第3课 珍珠鸟" },
    { id: 4, name: "口语交际+习作：我的心爱之物+语文园地一" },
    // 第二单元 阅读策略
    { id: 5, name: "第4课 冀中的地道战" },
    { id: 6, name: "第5课 将相和" },
    { id: 7, name: "第6课 什么比猎豹的速度更快" },
    { id: 8, name: "第7课 '诺曼底号'遇难记" },
    { id: 9, name: "习作：'漫画'老师+语文园地二" },
    // 第三单元 民间故事
    { id: 10, name: "第8课 猎人海力布" },
    { id: 11, name: "第9课 牛郎织女（一）" },
    { id: 12, name: "第10课 牛郎织女（二）" },
    { id: 13, name: "口语交际+习作：故事新编+语文园地三+快乐读书吧" },
    // 第四单元 爱国情怀
    { id: 14, name: "第11课 古诗三首（示儿/题临安邸/己亥杂诗）" },
    { id: 15, name: "第12课 少年中国说（节选）" },
    { id: 16, name: "第13课 圆明园的毁灭" },
    { id: 17, name: "第14课 梅兰芳蓄须明志" },
    { id: 18, name: "习作：二十年后的家乡+语文园地四" },
    // 第五单元 说明性文章
    { id: 19, name: "第15课 太阳" },
    { id: 20, name: "第16课 金字塔" },
    { id: 21, name: "习作：介绍一种事物+语文园地五" },
    // 第六单元 父母之爱
    { id: 22, name: "第17课 慈母情深" },
    { id: 23, name: "第18课 父爱之舟" },
    { id: 24, name: "第19课 女航天员的信" },
    { id: 25, name: "习作：我想对您说+语文园地六" },
    // 第七单元 自然之美
    { id: 26, name: "第20课 古诗三首（山居秋暝/枫桥夜泊/早春呈水部张十八员外）" },
    { id: 27, name: "第21课 第一场雪" },
    { id: 28, name: "第22课 白鹭" },
    { id: 29, name: "习作：____即景+语文园地七" },
    // 第八单元 读书明智
    { id: 30, name: "第23课 古人谈读书" },
    { id: 31, name: "第24课 忆读书" },
    { id: 32, name: "第25课 走遍天下书为侣" },
    { id: 33, name: "习作：写读后感+语文园地八" }
  ],
  math: [
    // 第一单元 观察简单组合体（新增，原四年级内容上移）
    { id: 1, name: "第一单元 观察简单组合体 - 第1课时 从前面看" },
    { id: 2, name: "第一单元 观察简单组合体 - 第2课时 从上面和侧面看" },
    // 第二单元 小数乘法
    { id: 3, name: "第二单元 小数乘法 - 第1课时 小数乘整数" },
    { id: 4, name: "第二单元 小数乘法 - 第2课时 小数乘小数" },
    { id: 5, name: "第二单元 小数乘法 - 第3课时 积的近似数" },
    { id: 6, name: "第二单元 小数乘法 - 第4课时 连乘、乘加、乘减" },
    { id: 7, name: "第二单元 小数乘法 - 第5课时 运算定律推广到小数" },
    { id: 8, name: "第二单元 小数乘法 - 第6课时 解决问题（出租车计费/水电费等）" },
    // 第三单元 小数除法
    { id: 9, name: "第三单元 小数除法 - 第1课时 除数是整数的小数除法" },
    { id: 10, name: "第三单元 小数除法 - 第2课时 一个数除以小数" },
    { id: 11, name: "第三单元 小数除法 - 第3课时 商的近似数" },
    { id: 12, name: "第三单元 小数除法 - 第4课时 循环小数" },
    { id: 13, name: "第三单元 小数除法 - 第5课时 用计算器探索规律" },
    { id: 14, name: "第三单元 小数除法 - 第6课时 解决问题（进一法/去尾法）" },
    // 第四单元 图形的运动（新增）
    { id: 15, name: "第四单元 图形的运动 - 第1课时 轴对称" },
    { id: 16, name: "第四单元 图形的运动 - 第2课时 补全轴对称图形" },
    { id: 17, name: "第四单元 图形的运动 - 第3课时 平移" },
    { id: 18, name: "第四单元 图形的运动 - 第4课时 旋转" },
    { id: 19, name: "第四单元 图形的运动 - 第5课时 欣赏与设计图案" },
    // 第五单元 用字母表示数和数量关系
    { id: 20, name: "第五单元 用字母表示数 - 第1课时 用字母表示数" },
    { id: 21, name: "第五单元 用字母表示数 - 第2课时 用字母表示运算定律和公式" },
    { id: 22, name: "第五单元 用字母表示数 - 第3课时 用字母表示数量关系" },
    { id: 23, name: "第五单元 用字母表示数 - 第4课时 含字母式子的简写与代入求值" },
    // 第六单元 多边形的面积
    { id: 24, name: "第六单元 多边形的面积 - 第1课时 平行四边形的面积" },
    { id: 25, name: "第六单元 多边形的面积 - 第2课时 三角形的面积" },
    { id: 26, name: "第六单元 多边形的面积 - 第3课时 梯形的面积" },
    { id: 27, name: "第六单元 多边形的面积 - 第4课时 组合图形的面积" },
    { id: 28, name: "第六单元 多边形的面积 - 第5课时 不规则图形面积估算" },
    // 综合与实践 有趣的密铺（新增）
    { id: 29, name: "综合与实践 有趣的密铺" },
    // 第七单元 可能性
    { id: 30, name: "第七单元 可能性 - 第1课时 确定性与不确定性" },
    { id: 31, name: "第七单元 可能性 - 第2课时 可能性的大小" },
    { id: 32, name: "第七单元 可能性 - 第3课时 游戏规则的公平性" },
    // 第八单元 复习与关联
    { id: 33, name: "第八单元 复习与关联 - 第1课时 数与代数" },
    { id: 34, name: "第八单元 复习与关联 - 第2课时 图形与几何" },
    { id: 35, name: "第八单元 复习与关联 - 第3课时 统计与概率" }
  ],
  english: [
    // 人教精通版五年级上册
    { id: 1, name: "Unit 1 My New Classmates（我的新同学）- Lesson 1" },
    { id: 2, name: "Unit 1 My New Classmates - Lesson 2" },
    { id: 3, name: "Unit 1 My New Classmates - Lesson 3" },
    { id: 4, name: "Unit 1 My New Classmates - Lesson 4" },
    { id: 5, name: "Unit 1 My New Classmates - Lesson 5" },
    { id: 6, name: "Unit 1 My New Classmates - Lesson 6" },
    { id: 7, name: "Unit 2 She Looks Cute（她看起来很可爱）- Lesson 1" },
    { id: 8, name: "Unit 2 She Looks Cute - Lesson 2" },
    { id: 9, name: "Unit 2 She Looks Cute - Lesson 3" },
    { id: 10, name: "Unit 2 She Looks Cute - Lesson 4" },
    { id: 11, name: "Unit 2 She Looks Cute - Lesson 5" },
    { id: 12, name: "Unit 2 She Looks Cute - Lesson 6" },
    { id: 13, name: "Unit 3 My Father Is a Writer（我爸爸是作家）- Lesson 1" },
    { id: 14, name: "Unit 3 My Father Is a Writer - Lesson 2" },
    { id: 15, name: "Unit 3 My Father Is a Writer - Lesson 3" },
    { id: 16, name: "Unit 3 My Father Is a Writer - Lesson 4" },
    { id: 17, name: "Unit 3 My Father Is a Writer - Lesson 5" },
    { id: 18, name: "Unit 3 My Father Is a Writer - Lesson 6" },
    { id: 19, name: "Revision 1 复习一" },
    { id: 20, name: "Unit 4 Where Do You Work?（你在哪里工作？）- Lesson 1" },
    { id: 21, name: "Unit 4 Where Do You Work? - Lesson 2" },
    { id: 22, name: "Unit 4 Where Do You Work? - Lesson 3" },
    { id: 23, name: "Unit 4 Where Do You Work? - Lesson 4" },
    { id: 24, name: "Unit 4 Where Do You Work? - Lesson 5" },
    { id: 25, name: "Unit 4 Where Do You Work? - Lesson 6" },
    { id: 26, name: "Unit 5 Is This Your Pencil?（这是你的铅笔吗？）- Lesson 1" },
    { id: 27, name: "Unit 5 Is This Your Pencil? - Lesson 2" },
    { id: 28, name: "Unit 5 Is This Your Pencil? - Lesson 3" },
    { id: 29, name: "Unit 5 Is This Your Pencil? - Lesson 4" },
    { id: 30, name: "Unit 5 Is This Your Pencil? - Lesson 5" },
    { id: 31, name: "Unit 5 Is This Your Pencil? - Lesson 6" },
    { id: 32, name: "Unit 6 There Are Four Seasons in a Year（一年有四季）- Lesson 1" },
    { id: 33, name: "Unit 6 There Are Four Seasons in a Year - Lesson 2" },
    { id: 34, name: "Unit 6 There Are Four Seasons in a Year - Lesson 3" },
    { id: 35, name: "Unit 6 There Are Four Seasons in a Year - Lesson 4" },
    { id: 36, name: "Fun Time 1 趣味时间 1" },
    { id: 37, name: "Fun Time 2 趣味时间 2" }
  ]
};
