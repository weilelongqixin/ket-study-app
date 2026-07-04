/**
 * 课文/课时数据 - 2026年秋季新版教材
 * 语文：统编版五年级上册（2026秋新版，40天学习计划）
 * 数学：人教版五年级上册（2026秋新版，42天学习计划）
 * 英语：人教精通版五年级上册
 */
const LESSONS = {
  chinese: [
    // 第一单元 万物有灵（第1-4天）
    { id: 1, name: "第1天 1 桂花雨" },
    { id: 2, name: "第2天 2 落花生" },
    { id: 3, name: "第3天 3 珍珠鸟" },
    { id: 4, name: "第4天 语文园地一" },
    // 第二单元 阅读策略（第5-9天）
    { id: 5, name: "第5天 4 冀中的地道战" },
    { id: 6, name: "第6天 5 将相和" },
    { id: 7, name: "第7天 6 什么比猎豹的速度更快" },
    { id: 8, name: "第8天 7 '诺曼底号'遇难记" },
    { id: 9, name: "第9天 语文园地二" },
    // 第三单元 民间故事（第10-13天）
    { id: 10, name: "第10天 8 猎人海力布" },
    { id: 11, name: "第11天 9 牛郎织女（一）" },
    { id: 12, name: "第12天 10* 牛郎织女（二）" },
    { id: 13, name: "第13天 语文园地三" },
    // 第四单元 爱国情怀（第14-18天）
    { id: 14, name: "第14天 11 古诗三首" },
    { id: 15, name: "第15天 12 少年中国说（节选）" },
    { id: 16, name: "第16天 13 圆明园的毁灭" },
    { id: 17, name: "第17天 14* 梅兰芳蓄须明志" },
    { id: 18, name: "第18天 语文园地四" },
    // 第五单元 说明性文章（第19-20天）
    { id: 19, name: "第19天 15 太阳" },
    { id: 20, name: "第20天 16 金字塔" },
    // 第六单元 父母之爱（第21-24天）
    { id: 21, name: "第21天 17 慈母情深" },
    { id: 22, name: "第22天 18 父爱之舟" },
    { id: 23, name: "第23天 19* 航天员写给孩子的信" },
    { id: 24, name: "第24天 语文园地六" },
    // 第七单元 自然之美（第25-28天）
    { id: 25, name: "第25天 20 古诗三首" },
    { id: 26, name: "第26天 21 第一场雪" },
    { id: 27, name: "第27天 22 白鹭" },
    { id: 28, name: "第28天 语文园地七" },
    // 第八单元 读书明智（第29-32天）
    { id: 29, name: "第29天 23 古人谈读书" },
    { id: 30, name: "第30天 24 忆读书" },
    { id: 31, name: "第31天 25* 走遍天下书为侣" },
    { id: 32, name: "第32天 语文园地八" },
    // 收心自测（第33-40天）
    { id: 33, name: "第33天 字音自测" },
    { id: 34, name: "第34天 字形自测(一)" },
    { id: 35, name: "第35天 字形自测(二)" },
    { id: 36, name: "第36天 词语自测(一)" },
    { id: 37, name: "第37天 词语自测(二)" },
    { id: 38, name: "第38天 句子自测" },
    { id: 39, name: "第39天 阅读理解自测" },
    { id: 40, name: "第40天 综合自测" }
  ],
  math: [
    // 第一单元 观察简单组合体（第1-3天）
    { id: 1, name: "第1天 观察简单组合体(1)" },
    { id: 2, name: "第2天 观察简单组合体(2)" },
    { id: 3, name: "第3天 观察简单组合体(3)" },
    // 第二单元 小数乘法（第4-11天）
    { id: 4, name: "第4天 小数乘整数" },
    { id: 5, name: "第5天 小数乘小数(1)" },
    { id: 6, name: "第6天 小数乘小数(2)" },
    { id: 7, name: "第7天 求一个数的小数倍是多少" },
    { id: 8, name: "第8天 整数乘法运算律推广到小数" },
    { id: 9, name: "第9天 用小数的估算解决购物问题" },
    { id: 10, name: "第10天 分段计费" },
    { id: 11, name: "第11天 '小数乘法'专项练" },
    // 第三单元 小数除法（第12-17天）
    { id: 12, name: "第12天 除数是整数的小数除法(1)" },
    { id: 13, name: "第13天 除数是整数的小数除法(2)" },
    { id: 14, name: "第14天 循环小数" },
    { id: 15, name: "第15天 一个数除以小数" },
    { id: 16, name: "第16天 解决问题" },
    { id: 17, name: "第17天 '小数除法'专项练" },
    // 第四单元 图形的运动（第18-24天）
    { id: 18, name: "第18天 轴对称(1)" },
    { id: 19, name: "第19天 轴对称(2)" },
    { id: 20, name: "第20天 平移(1)" },
    { id: 21, name: "第21天 平移(2)" },
    { id: 22, name: "第22天 旋转(1)" },
    { id: 23, name: "第23天 旋转(2)" },
    { id: 24, name: "第24天 旋转(3)" },
    // 第五单元 用字母表示数和数量关系（第25-29天）
    { id: 25, name: "第25天 用字母表示数(1)" },
    { id: 26, name: "第26天 用字母表示数(2)" },
    { id: 27, name: "第27天 用字母表示数(3)" },
    { id: 28, name: "第28天 用字母表示数(4)" },
    { id: 29, name: "第29天 用字母表示数(5)" },
    // 第六单元 多边形的面积（第30-36天）
    { id: 30, name: "第30天 平行四边形的面积(1)" },
    { id: 31, name: "第31天 平行四边形的面积(2)" },
    { id: 32, name: "第32天 三角形的面积" },
    { id: 33, name: "第33天 梯形的面积" },
    { id: 34, name: "第34天 组合图形的面积" },
    { id: 35, name: "第35天 不规则图形的面积" },
    { id: 36, name: "第36天 多边形的面积 专项练" },
    // 有趣的密铺（第37天）
    { id: 37, name: "第37天 有趣的密铺" },
    // 第七单元 可能性（第38-39天）
    { id: 38, name: "第38天 可能性(1)" },
    { id: 39, name: "第39天 可能性(2)" },
    // 第八单元 复习与关联（第40-42天）
    { id: 40, name: "第40天 植树问题" },
    { id: 41, name: "第41天 收心自测(1)" },
    { id: 42, name: "第42天 收心自测(2)" }
  ],
  english: [
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
