/**
 * 学习打卡·AI批改 - 核心应用 v2
 * 2026-07-04 完善版
 * - 三科目（语文/数学/英语）完整支持
 * - 2026秋新版教材目录
 * - 拍照→选课→批改→记录 全流程
 */
(function() {
  'use strict';

  // =================== 状态管理 ===================
  var state = {
    currentView: 'home',
    selectedSubject: 'chinese',
    selectedLessonId: null,
    selectedLessonName: '',
    capturedImageBase64: null,
    parentUnlocked: false
  };

  // =================== 内置参考答案（家长拍摄录入）===================
  var BUILT_IN_ANSWERS = {
    // ===== 语文 第一单元（第1-4天）=====
    'chinese_1': [
      '4. ①桂花香气迷人 ②忆 ③做饼 ④故乡',
      '5.(1)拖 摇 喊 兴奋 (2)啊！真像下雨，好香的雨呀！高昂 喜爱',
      '练习1.(1)③花 欣赏 (2)外婆 沉浸 尤其 蛋糕',
      '练习2. hánɡ luò',
      '练习3.(1)并 拼 拼 饼 (2)颈 劲 劲 功',
      '练习4. C',
      '梳理：家乡院子里的桂花→思乡'
    ],
    'chinese_2': [
      '4. ①收 ②议 ③味道很美 ④可以榨油',
      '5. 人要做有用的人，不要做只讲体面，而对别人没有好处的人',
      '练习1. 茅亭 食品 吩咐',
      '练习2. zhà liú mò',
      '梳理：果实埋在地里不炫耀→做有用的人'
    ],
    'chinese_3': [
      '3. ①亲近 ②趴在肩头睡着了 ③信赖',
      '练习1. B',
      '练习2. 眨 脸',
      '梳理：“小家伙”表现作者对小珍珠鸟的喜爱'
    ],
    'chinese_4': [
      '语文园地：从作者描述的具体事物情感变化中体会思想感情',
      '词句段运用1. ①花生的果实 ②花生 ③蟋蟀的住宅 ④别的昆虫的隐藏所 ⑤蟋蟀对住宅的要求高',
      '词句段运用2. “温和”“新鲜”多义词造句（示例）',
      '日积月累1. ①动物名称 ②褒义词 ③贬义词 2.D 3.画龙点睛 生龙活虎 画蛇添足 狐假虎威'
    ],
    // ===== 语文 第二单元（第5-9天）=====
    'chinese_5': [
      '4.(1)5段 (2)B',
      '5. ①构造 ②联络 ③奇迹',
      '练习1. 抗日战争 民兵 无穷无尽 游击 对付 粉碎',
      '练习2. D',
      '练习3. 任丘 姓任 任县',
      '练习4. ①用土和沙灭火 ②把吊板放下来挡住毒气',
      '梳理：数量 式样 广'
    ],
    'chinese_6': [
      '4.(1)7段 (2)一目一句子',
      '5. ①完璧归赵 ②负荆请罪 ③知错就改 ④智勇双全',
      '练习1. 隆重 典礼 约定',
      '练习2.(1)qīn qìng (2)xiáo xuē (3)qiǎng qiǎng',
      '练习3. ①之 宝 ②无 缺 ③同 归 ④心 力 ⑤不 提 ⑥圆 睁；(1)①② (2)⑥③',
      '练习4. B',
      '梳理：神态 语言 愤怒；勇敢机智'
    ],
    'chinese_7': [
      '2. 书写要点：“冠”的部首是“冖”',
      '4.(1)3段 (2)借助关键语句读',
      '5. ①猎豹 ②鸵鸟 ③猎豹 ④光 ⑤流星体 ⑥光',
      '练习1. 火箭 速度 摆脱',
      '练习2.(1)× (2)× (3)√ (4)√',
      '练习3.(1)guǎn (2)guàn',
      '练习4. D',
      '梳理：(1)√ (2)× (3)√'
    ],
    'chinese_8': [
      '2. 书写要点：“晨”下半部分是“辰”；“犹”勿漏右上角的点',
      '4.(1)5段 (2)诺曼底号是一艘大轮船…',
      '5. ①遇险 ②9~39 ③牺牲 ④40~44',
      '练习1. C',
      '练习2. màn dùn mì yì pōu gāng zàng qiǎn lù',
      '练习3. 例 列 例 例 列',
      '梳理：犹如铁铸一般 比喻 坚定无畏'
    ],
    'chinese_9': [
      '梳理与交流：集中注意力读/不停顿/借助关键语句/带着问题阅读',
      '词句段运用1. 光的速度是惊人的。冀中人民挖了许多地道。',
      '词句段运用2. 示例：百折不挠/一鼓作气/泰然自若/身先士卒/神机妙算/勇往直前/坚韧不拔（造句略）',
      '日积月累1. D 2. A 3. 莫等闲，白了少年头，空悲切'
    ],
    // ===== 语文 第三单元（第10-13天）=====
    'chinese_10': [
      '2. 书写要点：“禽”最下面是“厶”；“延”不要写成“廷”',
      '4. ①救小白蛇得宝石 ②为救乡亲变石头',
      '5. D',
      '练习1. 嗣后 镇定 避难',
      '练习2. C',
      '练习3. 飞走千万天地大雨；(1)震天动地 (2)千真万确',
      '梳理：听抬搭开射→热心助人'
    ],
    'chinese_11': [
      '2. 书写要点：“挺”右半部分是“廷”不是“延”',
      '4. ①童年 ②老牛 ③成家 ④织女',
      '练习1. 打柴 稀罕 牵亏',
      '练习2.(1)shāo sǎo (2)liè liě (3)liáng niàng',
      '练习3. 开笑不足成立相为；(1)美中不足 (2)成家立业',
      '梳理：①剩饭②破衣裳③牛棚④亲密⑤温和→同情'
    ],
    'chinese_12': [
      '3. ②③①',
      '4. C',
      '练习1. B',
      '练习2. shān hú jiāo',
      '梳理：排比 她喜欢 满意'
    ],
    'chinese_13': [
      '语文园地：民间故事有特定主题类型，如《白蛇传》《田螺姑娘》属神奇故事',
      '词句段运用1.(1)俗语口语 成语书面语 (2)示例：翘首盼月亮/望眼欲穿',
      '词句段运用2. 示例：牛郎织女对话（详略）',
      '日积月累1.C 2.家家乞巧望秋月 穿尽红丝几万条'
    ],
    // ===== 语文 第四单元（第14-18天）=====
    'chinese_14': [
      '2. 书写要点：“哀”的中间部分是“口”',
      '4. ①王师北定中原日 ②担忧 ③不拘一格降人材',
      '5.(1)给儿子看，诗人对儿子的嘱咐 (2)写在临安旅店墙壁上 (3)已亥/己亥',
      '练习1.(1)万 杭州 (2)哀伤',
      '练习2. D  练习3. C  练习4. A',
      '练习5. 持 诗 持 持',
      '梳理：春天 奢靡享乐 春风 奢靡风气'
    ],
    'chinese_15': [
      '2. 书写要点：“兽”下面是“口”不是“日”',
      '4.(1)独立 自由 进步 中国少年 (2)黄河 乳虎 鹰隼 干将',
      '5. B',
      '练习1. B  练习2. D  练习3. A',
      '梳理：(1)排比 (2)D (3)示例：少年勤则国勤，少年勇则国勇'
    ],
    'chinese_16': [
      '2. 书写要点：“毁”的“臼”里面是两横',
      '4. ①众星拱月 ②风格各异 ③搬运 ④毁掉 ⑤烧',
      '5. 不可估计。数量大/程度深 痛心 沉痛 愤怒',
      '练习1. 损失 环绕',
      '练习2. C',
      '梳理：(1)不能删，体现侵略者人数多/纵火时间长/破坏范围广 (2)痛惜愤怒'
    ],
    'chinese_17': [
      '3. ①租界 ②香港 ③卖房 ④打针 ⑤剃须 ⑥喜爱 ⑦敬佩'
    ],
    'chinese_18': [
      '梳理与交流1. 示例：屠呦呦的责任是对事业的执着坚守',
      '梳理与交流2. 梁启超写文章为激励中国少年发愤图强',
      '词句段运用：(1)B (2)相近不同 ①③⑤⑦ ②④⑥⑧ (3)示例造句',
      '日积月累：安定 动荡 (1)丰衣足食 (2)内忧外患'
    ],
    // ===== 语文 第五单元（第19-20天）=====
    'chinese_19': [
      '2. 书写要点：“抵”不要漏写下面的点',
      '4. ①远 ②高 ③动植物生长 ④预防治疗疾病',
      '5.(1)列数字 (2)打比方',
      '练习1.(1)煤炭 实际 摄氏度 (2)抵挡 热量 区',
      '练习2.(1)zhì (2)liáo',
      '练习3.(1)寸草不生 (2)繁殖',
      '练习4.(1)预备 (2)预防 (3)漂浮 (4)飘浮'
    ],
    'chinese_20': [
      '2. 书写要点：“墓”下面是“土”，“筑”上面是“⺮”',
      '4. ①胡夫金字塔 ②公元前2600年 ③墓室 ④甬道 ⑤墓门 ⑥平缓斜坡',
      '5. 外形 用途由来 作比较 列数字 50层楼高 126个篮球场',
      '练习1. 埃及 建筑 金字塔 陵墓',
      '练习2. C',
      '练习3. 墓 基 暮 暮 彻 砌 砌 彻',
      '练习4.(1)狭窄 (2)狭长',
      '梳理：赞美事物好到极点；胡夫金字塔建造技术；石块间无水泥却粘合紧密'
    ],
    // ===== 语文 第六单元（第21-25天）=====
    'chinese_21': [
      '2. 书写要点：“脊”先两边后中间；“噪”左右结构左窄右宽',
      '4. ①渴望买书 ②向母亲要钱',
      '5. 母亲对“我”买书的支持和无私的爱',
      '练习1.(1)酷暑 (2)掏 皱巴巴 慈爱 忙碌',
      '练习2. B',
      '练习3. 躁 噪 燥 噪 躁',
      '练习4. ABC',
      '梳理：(1)破缝纫机 灯泡 (2)拥挤 母亲挣钱不易 慈母情深'
    ],
    'chinese_22': [
      '2. 书写要点：“糖”左右结构左窄右宽；“妄”上下结构上窄下宽',
      '4. ①买枇杷 ②逛庙会 ③缝补棉被',
      '5. 示例：“住客栈”场景印象最深',
      '练习1. wǎng jiàn',
      '练习2.(1)稼 嫁 (2)培 陪',
      '练习3. ACD',
      '梳理：破旧小渔船→精致乌篷船→怀念'
    ],
    'chinese_23': [
      '3. 刘洋 对孩子的爱与期望',
      '练习1.(1)niàng liàng (2)zhào nǎo',
      '练习2. 不怕困难 养成良好习惯',
      '梳理：排比 承诺 重视'
    ],
    'chinese_24': [
      '梳理与交流1. 示例：《父爱之舟》父亲节省却愿意加钱换房',
      '梳理与交流2. 示例：妈妈端热牛奶的细节',
      '识字加油站：(1)父慈子孝 (2)骨肉之情含义 (3)连线题',
      '词句段运用1.(1)①√②√③× (2)示例：桂花雨结尾点明主题表达思乡之情',
      '日积月累1. 临行密密缝 意恐迟迟归'
    ],
    // ===== 语文 第七单元（第25-28天）=====
    'chinese_25': [
      '2. 书写要点：“寺”上半部分为“土”不是“士”；“遥”半包围结构',
      '4.(1)√ (2)× (3)√',
      '5. 天街小雨润如酥 草色遥看近却无',
      '练习1. 祖孙 古寺 老加',
      '练习2. AC',
      '梳理：B'
    ],
    'chinese_26': [
      '2. 书写要点：“稻”左右结构左窄右宽；“瑞”左右结构',
      '4. ①伴小雨后来大雪纷飞 ②粉妆玉砌世界孩子们嬉戏 ③瑞雪兆丰年',
      '5. 白雪覆盖范围广厚度足',
      '6. 示例：对比手法突出天气变化突然',
      '练习1. 枕头 风俗 铅笔 纸屑 飘落',
      '练习2. D',
      '练习3.(1)√ (2)× (3)√',
      '梳理：(1)①√②√ (2)ABCD'
    ],
    'chinese_27': [
      '2. 书写要点：“哨”左右结构左小右大',
      '4. ①精巧 ②色素 ③身段 ④韵在骨子里',
      '5. ②①③',
      '练习1. 朴素 韵味',
      '练习2. B',
      '梳理：排比 外形之美 蓑毛长喙脚 适宜'
    ],
    'chinese_28': [
      '梳理与交流：示例：抓关键词、分析修辞手法',
      '词句段运用：时间/下雪天气变化/又大又快/拟人比喻/一幅嵌在玻璃框里的画',
      '示例1. 河水清澈见底…岸边垂柳…像碎银',
      '示例2. 圆滚滚小狗追蝴蝶打滚儿',
      '示例3. 乌云霸占天空像打翻墨汁',
      '日积月累2.(1)√ (2)√'
    ],
    // ===== 语文 第八单元（第29-33天）=====
    'chinese_29': [
      '2. 书写要点：“岂”下半部分是“己”不是“已”',
      '4. ①虚心求教 ②学思结合 ③心到 ④口到',
      '5. 心到最急。心不在此，则眼看不仔细…',
      '练习1. chǐ zhī wù yí',
      '练习2. B',
      '梳理：知之为知之 不知为不知 是知也；与思考结合'
    ],
    'chinese_30': [
      '2. 书写要点：“衰”中间横要两边出头',
      '4. ①三国演义 ②水浒传 ③多读书 ④读好书',
      '5. ABCD',
      '练习1. 朝代 兴亡盛衰 有趣 处世',
      '练习2.(1)gē gě (2)sēn shēn',
      '练习3. B',
      '梳理：(1)概述 (2)示例：妈妈接着讲故事'
    ],
    'chinese_31': [
      '3. ①一位朋友 ②故地',
      '4. ①反复阅读同一本书 ②续编故事 ③生活经历',
      '练习1. yù táng lǜ xí',
      '练习2. 蟋 蟀',
      '练习3. A',
      '梳理：比喻 朋友 故地 喜爱'
    ],
    'chinese_32': [
      '梳理与交流：示例：《忆读书》比较中制订好书标准；集中注意力阅读；心到眼到口到；画结构图；分条列举',
      '词句段运用1.(1)①4②2③5④3 (2)示例：阅读为写作提供素材，写作是阅读成果',
      '词句段运用2. 示例：书是智慧的钥匙/书是人生路上的指路明灯',
      '日积月累2. A D 3. 问渠那得清如许 为有源头活水来'
    ],
    'chinese_33': [
      '字音自测1.(1)①fǔ mǔ ②gē chéng liè (3)qiǎn jiān niàng (4)shài huàn tīng',
      '2.(1)√ (4)√',
      '3. A',
      '4.(1)luò (2)lǜ (3)qiǎng (4)jiàng (5)qiǎng',
      '5.(1)√ (2)× (3)√'
    ],
    'chinese_34': [
      '字形自测(一)1. 忘却 水滴 吩咐 瑰宝 浅显 书刊 陷坑 漫游 繁殖 狭长 噪声 机械 意识 供应 建筑',
      '2. 约定 漫步 瑞雪 飘落 隐约 诗情画意',
      '3.(1)冰 济 (2)燥 躁 (3)√ (4)冈 岗',
      '4. 叮 钉 盯 钉 幕 暮 墓 暮'
    ],
    'chinese_35': [
      '字形自测(二)1.(1)木兰花 小心翼翼 欣赏 忍心 (2)可贵 寻常 精彩 叹为观止',
      '2. B',
      '3.(1)摧 催 (2)梢 哨 (3)池 池 (4)仰 抑',
      '4. 黄 皇',
      '5. C'
    ],
    // ===== 数学 第一单元 观察简单组合体（第1-3天）=====
    'math_1': [
      '1.（课本学习内容）',
      '2. 上、左、前',
      '3.(1)A D  (2)C  (3)B',
      '4. 从前面看、从上面看、从左面看（画图题）'
    ],
    'math_2': [
      '知识点：相同、不同；相同、不同',
      '1.(1)②③  (2)①②  (3)图形题',
      '2.(1)C  (2)B',
      '3.(1)①  (2)②④⑥  (3)①③  (4)③⑤',
      '4. 从（前）面看、从（左）面看（画图题）'
    ],
    // 第3天 观察简单组合体(3) - 无照片，暂空

    // ===== 第二单元 小数乘法（第4-11天）=====
    'math_4': [
      '1. 48  4.8  548  5.48（竖式略）',
      '2. D',
      '3. 14.8×4=59.2(元)；14.8×6=88.8(元)；88.8<100，够买6份'
    ],
    'math_5': [
      '1.(1) 39 10 1.95 100  (2) 两 一 2.142 三',
      '2. 3.12  10.92  5.824（竖式略）',
      '3. 4680 4680 46.8 46.8 4.68 4.68',
      '4. 4.8×2.85=13.68(m²)',
      '5.(1)发钗长度 (2)1.6×2.1=3.36(dm) 3.36−1.6=1.76(dm)'
    ],
    'math_6': [
      '1. 0.392  0.039  0.0054（竖式略）',
      '2.(1) 两 两 0.019 四  (2) 三 四  (3) 1.654 1.645',
      '3. 0.7  3.11  0.07（竖式略）',
      '4.(1) 1.5×1.4=2.1(m)，牦牛体长2.1m',
      '4.(2) 0.59×1.7=1.003(t)，牦牛体重1.003t',
      '5. 235.88×0.6≈141.5(元)',
      '6. 0.88×0.88=0.7744(dm²)>0.99×0.77=0.7623(dm²)，正方形面积更大'
    ],
    'math_7': [
      '1. > = > > < <',
      '2.(1)B  (2)A  (3)A',
      '3. 85.6×1.25=107(元)；85.6+107=192.6(元)',
      '4. 18.6×1.5=27.9(cm)；27.9−18.6=9.3(cm)'
    ],
    'math_8': [
      '1.(1)0.8 0.86  (2)4.62 5.38 2.5  (3)7.39 7.39  (4)4 1.25',
      '2. 0.26  63  1269.9  700.92  524  18',
      '3. (16.8+13.2)×180=5400(元)',
      '4. 方法一:4.2×0.25+3.8×0.25=2(km)；方法二:(4.2+3.8)×0.25=2(km)'
    ],
    'math_9': [
      '1.(1)8 240 够  (2)9 270 不够',
      '2. A',
      '3. 往小估:33×2+4×5+5×3=101(元)>100，能参加满减',
      '4. 往大估:38×5+80×2.5+98=488(元)<500，够买扇贝'
    ],
    // 第10天 分段计费 - 在上一页照片底部
    'math_10': [
      '1. A',
      '2. 5.4小时按6小时：5+3.5×(6−2)=19(元)',
      '3. 2.7千克按3千克：12+5.5×(3−1)=23(元)',
      '4. 0.52×2400+0.57×(3900−2400)=2103(元)'
    ],
    // 第11天 小数乘法专项练
    'math_11': [
      '1. D  2. D  3. 378 378 3.78 37.8  4. A',
      '5. > < =  6. A',
      '7. 2.52 2.664 0.65（竖式略）  8. 38.61 50 95',
      '9. 往小估:28×2+8×4+32=126>120，不够',
      '10. 4.9km按5km：5+1.5×(5−3)=8(元)'
    ],

    // ===== 第三单元 小数除法（第12-17天）=====
    'math_12': [
      '1.(竖排)16 1.6 12 1.2 11 1.1',
      '2. 3.8 1.4 2.9 2.5 7.1 3.75（竖式略）',
      '3. 52.5÷3=17.5(元)',
      '4.(1) 4.5÷2=2.25(千米/时)  (2) 4.5×2÷(3+2)=1.8(千米/时)'
    ],
    'math_13': [
      '1. 0.6 0.46 0.27 0.75 0.27 0.0168（竖式及验算略）',
      '2. 9.6÷24=0.4  4÷25=0.16  6.63÷17=0.39',
      '3. D',
      '4. 1.25÷5=0.25(m)',
      '5. 45.1-43.6=1.5(元) 1.5÷6=0.25(元)',
      '6. 牛奶3.3÷2=1.65  磷虾皮10.8÷18=0.6  蛋糕15.8  应收29.9  找回70.1'
    ],
    'math_14': [
      '1. 0.9  0.450  1.138',
      '2. B',
      '3. 34÷24≈1.42(元) 36÷27≈1.33(元) 1.33<1.42，B超市更划算'
    ],
    'math_15': [
      '1. 13 1.5 200（竖式略）',
      '2.(竖排)0.42 0.63 0.9 1.5 4.8 12 6 15 30；小于 等于 大于',
      '3. 7.2÷0.6=12(分) 10÷2.5=4(分)',
      '4. 4.8×240=1152(dm²) 1152÷4.5=256(个)'
    ],
    'math_16': [
      '知识点：11.85 3 4',
      '1. 9 8',
      '2. 88.8÷7.8≈11.4',
      '3. 21.6÷0.32=67.5(个)，最多捏67个',
      '4. 0.5×30÷1.2=12.5(次)，至少13次'
    ],
    'math_17': [
      '1. 商的小数点与被除数小数点对齐；除数扩大100倍转化成整数',
      '2. 0.83 0.8',
      '3. < > > > < > >',
      '4. 4.95 3.4 7.71（竖式略）',
      '5. 27.55 2.5 0.75',
      '6. 550÷60=9.16，至少需10个瓶子',
      '7. 7.5÷5=1.5(米) 23.5÷1.5=15.6，最多色15个',
      '8. 18.88−1.08×11=7(元) 7÷0.7=10(千克)'
    ],

    // ===== 第四单元 图形的运动（第18-24天）=====
    'math_18': [
      '知识点：3 2 1 1 1 相等',
      '1. 2 2 1 1 3 3 是',
      '2.(1)轴对称 对称轴  (2)3 垂直  (3)F 2',
      '3. A',
      '4. E F 5'
    ],
    'math_19': [
      '第1题、第2题为画图题（补全轴对称图形），请对照课本'
    ],
    'math_20': [
      '知识点：右9 右9 右9 右9 右9 相同 相等',
      '1.(1)④①  (2)下 3',
      '第2、3题为画图题（平移图形）'
    ],
    'math_21': [
      '知识点：24 24',
      '1.(1)1500  (2)A B 8',
      '2.(1)4×4=16(dm²)  (2)(9+4)×2=26(cm)',
      '3. 1/4 1/3 1/2 1/4',
      '4.(1)(78−3)×(45−3)=3150(平方米)  (2)(52+28)×2=160(米)'
    ],
    'math_22': [
      '知识点：360 12 30 30 30 30 顺时针 30；60 6 180',
      '1.(1)顺时针180  (2)2  (3)逆时针90',
      '2.(1)90  (2)顺90(或逆270) / 逆90(或顺270)'
    ],
    'math_23': [
      '知识点：O 顺 90',
      '第1题为网格图画图题',
      '2.(1)B  (2)A  (3)B',
      '第3题为画图题（网格图旋转）'
    ],
    'math_24': [
      '知识点：平移+旋转组合变换',
      '1. A',
      '2.(1)网格图变换  (2)顺90(或逆270) 8 2 8',
      '3. √ √ √',
      '4. 答案不唯一（描述卡片平移+旋转步骤）'
    ],

    // ===== 第五单元 用字母表示数（第25-29天）=====
    'math_25': [
      '1.(1)x+12  (2)a-20  (3)150-m 150',
      '2.(1)A  (2)B',
      '3.(1)15+n 39.9  (2)m-15',
      '4.(1)每天投递(75-a)件  (2)a=18时 75-18=57件'
    ],
    'math_26': [
      '知识点：90 35',
      '1.(1)1.5x  (2)50 100 150 50m 1000',
      '2. 5n 3y 10b a',
      '3. 3a b÷10',
      '4.(1)60-a  (2)5a 25  (3)a最小1最大59'
    ],
    'math_27': [
      '知识点：b b v t s t s v 250 20 5000；25 25 12 6 6',
      '1. 18+82×a×b / ×a−z 2.5×4',
      '2.(1)c=ab  (2)a=36,c=720时 b=c÷a=720÷36=20'
    ],
    'math_28': [
      '1. 8 16 8n',
      '2. B',
      '3.(1)13 3m+1  (2)m=15时n=46；n=73时m=24'
    ],
    'math_29': [
      '1.(1)6x  (2)x=6时 6×6=36分',
      '2.(1)85t千米  (2)255−8t表示距离北京还有多少千米',
      '3.(1)m=16x+16y  (2)x=10,y=6时 m=256  (3)m=192,x=5时 y=7'
    ],

    // ===== 第六单元 多边形的面积（第30-36天）=====
    'math_30': [
      '知识点：底 高 底 高 ah',
      '1. 576 48.72 104.5 360',
      '2.(1)10×6=60(cm²)  (2)45×30=1350(cm²)  (3)17×16=272(cm²)',
      '3. 15×3=45(m²)',
      '4. 3×1.4=4.2(m²) 2.1÷4.2=0.5(kg)',
      '5. 32÷8=4(m)'
    ],
    'math_31': [
      '知识点：300 200 60000 60000',
      '1. 600 3 15 50000 2 2000000',
      '2.(1)平方米  (2)平方千米  (3)公顷',
      '3. C',
      '4.(1)600 6  (2)①④②③',
      '5. 250千米=250000米 250000×8=2000000(平方米)=2平方千米'
    ],
    'math_32': [
      '知识点：底 高 120 39.8 2388 2388',
      '1.(1)18×12÷2=108(cm²)  (2)26×15÷2=195(cm²)  (3)18×5÷2=45(cm²)',
      '2. 108÷2=54(cm²)',
      '3. 1.2×0.35÷2×40=8.4(m²)',
      '4. 37.5×2÷5=15(dm)'
    ],
    'math_33': [
      '知识点：上底 下底 高；上底 下底 高 ÷2；a b h ÷2；36 120 135 10530 10530',
      '1.(1)(2+4)×3÷2=9(cm²)  (2)(4+6)×3÷2=15(cm²)  (3)(5+11)×2÷2=16(cm²)',
      '2. D',
      '3. (2.5+5.5)×2÷2=8(m²)',
      '4. (1.5+1.6)×0.8÷2×25=31(元)'
    ],
    'math_34': [
      '知识点：5×5÷2+5×5=30；(5+2+5)×5÷2-(5+2)÷2=30',
      '1.(1)24×11+24×8÷2=360(cm²)  (2)(16+28)×15÷2+8×6=282(cm²)',
      '2. B',
      '3. (160+290)×120÷2+40×50×2=23000(m²)',
      '4. 36×28=1008 (36-12)×(28-16)÷2=264 1008-264=744(平方米)',
      '5. (10×5+10×1.6÷2)×160=9280(块)'
    ],
    'math_35': [
      '知识点：27 27 5 5 6 5 30 30',
      '1. C',
      '2. 16 40 23（合理即可）',
      '3. 60×28÷2=840(m²)',
      '4. 估计草坪约49m² 49×48.5=2376.5(元)（答案不唯一）'
    ],
    'math_36': [
      '专项第1题：(1)92  (2)72  (3)3',
      '第2题：(1)10.5×8=84  (2)9×5.4÷2=24.3  (3)(6+10)×5÷2=40',
      '第3题：18×30+18×2×4=1728(cm²)',
      '第5题：375×2÷25=30(cm) (5+25)×30÷2=450(m²)',
      '第6题：(1)15×6+(4+15)×18÷2=261  (2)30×30-(12+30)×10÷2=690  (3)8×15÷2+(18+26)×17÷2=434',
      '第7题：50×30+40×30÷2=2100 2100÷0.75=2800(人)'
    ],

    // ===== 有趣的密铺（第37天）=====
    'math_37': [
      '知识点：360 180',
      '1. 720 120 3 3 360 能',
      '2.(1)B  (2)C',
      '3. 画法不唯一（设计能密铺的新图案）'
    ],

    // ===== 第七单元 可能性（第38-39天）=====
    'math_38': [
      '知识点：跳绳 唱歌或朗诵 唱歌',
      '1.(1)③  (2)①  (3)②  (4)③',
      '2.(1)B  (2)B'
    ],
    'math_39': [
      '知识点：大于 红',
      '1. D',
      '2.(1)B  (2)25-7=18(个) 5-3=2(个)；抽中D最小，A和C相同'
    ],

    // ===== 第八单元 复习与关联（第40-42天）=====
    'math_40': [
      '知识点：100÷5+1=21(棵)；100÷5-1=19(棵)；100÷5=20(棵)',
      '1. A',
      '2. 1',
      '3.(1)96  (2)45',
      '4.(156+234+186)÷6=96(棵)',
      '4(续). 0.25+(20-1)×0.9=22.1(米)'
    ],
    'math_41': [
      '一、1.三 + 4.897  2.> < >  3.3  x+24 x+22  5.黄 白 6.240',
      '二、1.D 2.A 3.B 4.C 5.D',
      '三、1.10 39.2 10 5a 0.54 0.8 1.5 0.09  2.2.072 4.8 3.00  3.0.824 32 480',
      '四、画图题：下5 顺90',
      '五、1.1.3×64=83.2(元)  2.(38+62)×45÷2+38×20÷2=2630(m²)'
    ],
    'math_42': [
      '一、1.可能 2.340.4 3.404 14.8 3.3 4 4.0.63 5.8 15 22 7n+1',
      '二、1.A 2.B 3.B 4.B 5.D',
      '三、1.0.21 40 6 39 1.07 4 2.4x 4  2.73.5 4.865 54',
      '3.(1)8×6÷2=24  (2)18×24=432  (3)54×27-(20+30)×10÷2=1208',
      '四、1.7+(17-2)×1.6=31(元)  2.s=20(a+b) a=20,b=30时s=1000；s=1400,a=40时b=30'
    ]
  };

  function getAnswerKey(subject, lessonId) {
    return subject + '_' + lessonId;
  }

  function getBuiltInAnswers(subject, lessonId) {
    var key = getAnswerKey(subject, lessonId);
    var builtIn = BUILT_IN_ANSWERS[key];
    if (!builtIn) return null;
    return {
      subject: subject,
      lessonId: lessonId,
      lessonName: '',
      answers: builtIn.map(function(text) { return { answer: text }; }),
      updatedAt: 'built-in'
    };
  }

  // =================== 科目配置 ===================
  var SUBJECTS = {
    chinese: { name: '语文', icon: '📖', sub: '部编版五年级上册（2026秋新版）' },
    math: { name: '数学', icon: '🔢', sub: '人教版五年级上册（2026秋新版）' },
    english: { name: '英语', icon: '🔤', sub: '人教精通版五年级上册' }
  };

  // =================== 鼓励语 ===================
  var PRAISES = [
    '太棒了！你真是学习小达人！🌟',
    '继续加油，越来越厉害了！💪',
    '每一道题都是进步的阶梯！📈',
    '认真的孩子最可爱！😍',
    '今天又进步了一点点！🎉',
    '坚持就是胜利，为你点赞！👍',
    '聪明的小脑瓜，转转转！🧠✨',
    '错题不可怕，弄懂就是收获！📚'
  ];

  function getRandomPraise() {
    return PRAISES[Math.floor(Math.random() * PRAISES.length)];
  }

  // =================== 视图切换 ===================
  function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active');
    document.querySelectorAll('.tab-item').forEach(function(t) { t.classList.remove('active'); });
    var tab = document.querySelector('.tab-item[data-view="' + viewName + '"]');
    if (tab) tab.classList.add('active');
    if (viewName === 'home') renderHome();
    if (viewName === 'camera') renderCamera();
    if (viewName === 'records') renderRecords();
    if (viewName === 'answers') renderAnswers();
    window.scrollTo(0, 0);
  }

  // =================== 首页（打卡） ===================
  function renderHome() {
    var today = new Date();
    var dateStr = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
    var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    var weekDay = '星期' + weekDays[today.getDay()];
    var dayOfWeek = today.getDay();
    var isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    var streak = Storage.getStreak();
    var stats = Storage.getStats();
    var todayCheckins = Storage.getTodayCheckins();

    var html = '';

    // 周末提示
    if (isWeekend) {
      html += '<div class="card weekend-card">';
      html += '<div style="font-size:48px; margin-bottom:10px;">🎉</div>';
      html += '<div style="font-size:20px; font-weight:bold; color:#e65100;">周末休息！</div>';
      html += '<div style="font-size:14px; color:#999; margin-top:8px;">好好玩吧～周一继续加油！💪</div>';
      html += '</div>';
    }

    // 日期+连续打卡
    html += '<div class="card date-card">';
    html += '<div class="date-text">📅 ' + dateStr + ' ' + weekDay + '</div>';
    html += '<div class="streak-badge">🔥 连续打卡 <span class="streak-num">' + streak + '</span> 天</div>';
    html += '</div>';

    // 统计
    if (stats.totalDays > 0) {
      html += '<div class="card stats-card">';
      html += '<div class="stats-title">📊 累计统计</div>';
      html += '<div class="stats-row">';
      html += '<div class="stats-item"><div class="stats-num">' + stats.totalDays + '</div><div class="stats-label">打卡天数</div></div>';
      html += '<div class="stats-item"><div class="stats-num">' + stats.totalQuestions + '</div><div class="stats-label">总题数</div></div>';
      html += '<div class="stats-item"><div class="stats-num">' + stats.accuracy + '%</div><div class="stats-label">正确率</div></div>';
      html += '</div>';
      html += '</div>';
    }

    // 今日进度
    var doneCount = todayCheckins.length;
    var totalSubjects = 3;
    html += '<div class="card today-progress-card">';
    html += '<div class="progress-title">📝 今日进度 ' + doneCount + '/' + totalSubjects + '</div>';
    html += '<div class="progress-bar-wrap">';
    var pct = Math.round(doneCount / totalSubjects * 100);
    html += '<div class="progress-bar" style="width:' + pct + '%"></div>';
    html += '</div>';
    html += '</div>';

    // 三个科目入口
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      var done = todayCheckins.some(function(r) { return r.subject === subj; });
      html += '<div class="card subject-card ' + (done ? 'done' : '') + '" onclick="App.selectSubjectFromHome(\'' + subj + '\')">';
      html += '<div class="subject-icon">' + conf.icon + '</div>';
      html += '<div class="subject-info">';
      html += '<div class="subject-name">' + conf.name + '</div>';
      html += '<div class="subject-sub">' + conf.sub + '</div>';
      html += '</div>';
      html += '<div class="subject-status">' + (done ? '✅' : '❌') + '</div>';
      html += '</div>';
    });

    // 鼓励语
    html += '<div class="card encourage-card">';
    html += '<div class="encourage-text">' + getRandomPraise() + '</div>';
    html += '</div>';

    document.getElementById('home-content').innerHTML = html;
  }

  // =================== 拍照页 ===================
  function renderCamera() {
    var html = '';

    // 科目选择（三科目）
    html += '<div class="section-title">选择科目</div>';
    html += '<div class="subject-tabs">';
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      html += '<button class="subject-tab ' + (state.selectedSubject === subj ? 'active' : '') + '" onclick="App.selectSubject(\'' + subj + '\')">' + conf.icon + ' ' + conf.name + '</button>';
    });
    html += '</div>';

    // 课时选择
    html += '<div class="section-title">选择课文/课时</div>';
    var lessons = LESSONS[state.selectedSubject] || [];
    html += '<select class="lesson-select" id="lesson-select">';
    html += '<option value="">请选择...</option>';
    // 按单元分组
    var currentUnit = '';
    lessons.forEach(function(l) {
      html += '<option value="' + l.id + '" data-name="' + l.name + '">' + l.name + '</option>';
    });
    html += '</select>';

    // 自定义课时
    html += '<input type="text" class="custom-lesson" id="custom-lesson" placeholder="或输入自定义内容（如：复习卷子）">';

    // 拍照
    html += '<div class="section-title">拍照上传作业</div>';
    html += '<div class="camera-area" id="camera-area">';
    html += '<label for="file-input" class="camera-label">';
    html += '<div class="camera-placeholder">';
    html += '<div class="camera-icon">📷</div>';
    html += '<div>点击拍照或选择图片</div>';
    html += '</div>';
    html += '</label>';
    html += '<input type="file" id="file-input" accept="image/*" capture="environment" style="display:none">';
    html += '</div>';

    // 预览
    html += '<div class="image-preview" id="image-preview" style="display:none">';
    html += '<img id="preview-img" src="" alt="作业预览">';
    html += '<button class="btn btn-secondary btn-small" onclick="App.clearImage()">重新拍照</button>';
    html += '</div>';

    // 参考答案提示
    html += '<div id="reference-answer-area"></div>';

    // 提交
    html += '<button class="btn btn-primary btn-large" id="submit-btn" onclick="App.submitHomework()" style="display:none">';
    html += '✨ 开始AI批改';
    html += '</button>';

    // 结果
    html += '<div id="result-area"></div>';

    document.getElementById('camera-content').innerHTML = html;
    bindCameraEvents();
    updateReferenceAnswer();
  }

  function bindCameraEvents() {
    var fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileSelect);
    }
    var lessonSelect = document.getElementById('lesson-select');
    if (lessonSelect) {
      lessonSelect.addEventListener('change', function() {
        var sel = this.selectedOptions[0];
        state.selectedLessonId = parseInt(this.value) || null;
        state.selectedLessonName = sel ? sel.getAttribute('data-name') : '';
        updateReferenceAnswer();
      });
    }
  }

  function handleFileSelect(e) {
    var file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('图片太大了，请选择10MB以内的图片');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(ev) {
      state.capturedImageBase64 = ev.target.result;
      var preview = document.getElementById('image-preview');
      var img = document.getElementById('preview-img');
      var cameraArea = document.getElementById('camera-area');
      if (preview && img && cameraArea) {
        img.src = ev.target.result;
        preview.style.display = 'block';
        cameraArea.style.display = 'none';
        document.getElementById('submit-btn').style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }

  function updateReferenceAnswer() {
    var area = document.getElementById('reference-answer-area');
    if (!area) return;
    if (!state.selectedLessonId) {
      area.innerHTML = '';
      return;
    }
    // 先查localStorage，再查内置答案
    var answer = Storage.getAnswers(state.selectedSubject, state.selectedLessonId);
    if (!answer) answer = getBuiltInAnswers(state.selectedSubject, state.selectedLessonId);
    var html = '';
    if (answer && answer.answers) {
      html += '<div class="card answer-hint-card">';
      html += '<div class="answer-hint-title">📝 已有参考答案</div>';
      html += '<div class="answer-hint-count">共 ' + answer.answers.length + ' 题</div>';
      html += '</div>';
    } else {
      html += '<div class="card answer-hint-card warning">';
      html += '<div class="answer-hint-title">⚠️ 还没有参考答案</div>';
      html += '<div class="answer-hint-sub">请家长先在"答案管理"中录入</div>';
      html += '<div class="answer-hint-sub">也可以直接拍照后手动批改</div>';
      html += '</div>';
    }
    area.innerHTML = html;
  }

  // =================== 批改逻辑 ===================
  function submitHomework() {
    var lessonSelect = document.getElementById('lesson-select');
    var customLesson = document.getElementById('custom-lesson');
    var lessonName = '';

    if (customLesson && customLesson.value.trim()) {
      lessonName = customLesson.value.trim();
    } else if (lessonSelect && lessonSelect.value) {
      lessonName = state.selectedLessonName;
    }

    if (!lessonName) {
      alert('请先选择课文/课时');
      return;
    }

    if (!state.capturedImageBase64) {
      alert('请先拍照上传作业');
      return;
    }

    var submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ 批改中...';

    var resultArea = document.getElementById('result-area');
    resultArea.innerHTML = '<div class="loading-card"><div class="loading-spinner"></div><div class="loading-text">正在准备批改...</div></div>';

    setTimeout(function() {
      var referenceAnswer = Storage.getAnswers(state.selectedSubject, state.selectedLessonId);
      if (!referenceAnswer) referenceAnswer = getBuiltInAnswers(state.selectedSubject, state.selectedLessonId);
      var result;
      if (referenceAnswer && referenceAnswer.answers && referenceAnswer.answers.length > 0) {
        result = { mode: 'manual', referenceAnswers: referenceAnswer.answers, lessonName: lessonName };
      } else {
        result = { mode: 'no_reference', lessonName: lessonName };
      }
      displayResult(result, lessonName);
      submitBtn.disabled = false;
      submitBtn.textContent = '✨ 开始AI批改';
    }, 800);
  }

  function displayResult(result, lessonName) {
    var resultArea = document.getElementById('result-area');
    var html = '';

    if (result.mode === 'manual') {
      html += '<div class="card result-card">';
      html += '<div class="result-title">📝 逐题批改</div>';
      html += '<div class="result-sub">对照参考答案，点击每题对/错</div>';
      html += '<div id="manual-grading-list">';
      result.referenceAnswers.forEach(function(ans, i) {
        html += '<div class="grading-item unmarked" data-index="' + i + '">';
        html += '<div class="grading-q">第' + (i + 1) + '题</div>';
        html += '<div class="grading-a">参考答案：' + escapeHtml(ans.answer || ans) + '</div>';
        html += '<div class="grading-btns">';
        html += '<button class="grading-btn correct-btn" onclick="App.markQuestion(' + i + ', true)">✅ 对</button>';
        html += '<button class="grading-btn wrong-btn" onclick="App.markQuestion(' + i + ', false)">❌ 错</button>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
      html += '<button class="btn btn-primary btn-large" onclick="App.finishGrading(\'' + escapeAttr(lessonName) + '\', ' + result.referenceAnswers.length + ')" id="finish-grading-btn" disabled>完成批改</button>';
      html += '</div>';
    } else if (result.mode === 'no_reference') {
      html += '<div class="card result-card">';
      html += '<div class="result-title">✏️ 手动批改</div>';
      html += '<div class="result-sub">没有参考答案，请输入批改结果</div>';
      html += '<div class="manual-input-row">';
      html += '<label>总题数：</label>';
      html += '<input type="number" id="manual-total" min="0" value="10" class="manual-input">';
      html += '</div>';
      html += '<div class="manual-input-row">';
      html += '<label>正确数：</label>';
      html += '<input type="number" id="manual-correct" min="0" value="8" class="manual-input">';
      html += '</div>';
      html += '<div class="form-label">错题说明（可选）：</div>';
      html += '<textarea id="manual-notes" class="manual-textarea" placeholder="记录错题和需要注意的地方..."></textarea>';
      html += '<button class="btn btn-primary btn-large" onclick="App.submitManualResult(\'' + escapeAttr(lessonName) + '\')">完成批改</button>';
      html += '</div>';
    }

    resultArea.innerHTML = html;
    if (result.mode === 'manual') {
      App._gradingState = {};
    }
  }

  // =================== 手动批改 ===================
  function markQuestion(index, isCorrect) {
    App._gradingState[index] = isCorrect;
    var item = document.querySelector('.grading-item[data-index="' + index + '"]');
    if (item) {
      item.classList.remove('unmarked', 'marked-correct', 'marked-wrong');
      item.classList.add(isCorrect ? 'marked-correct' : 'marked-wrong');
    }
    var total = document.querySelectorAll('.grading-item').length;
    var marked = Object.keys(App._gradingState).length;
    var finishBtn = document.getElementById('finish-grading-btn');
    if (finishBtn) finishBtn.disabled = marked < total;
  }

  function finishGrading(lessonName, total) {
    var correct = 0, wrong = 0, details = [];
    for (var i = 0; i < total; i++) {
      if (App._gradingState[i]) { correct++; details.push({ index: i, correct: true }); }
      else { wrong++; details.push({ index: i, correct: false }); }
    }
    saveAndShowResult(lessonName, { total: total, correct: correct, wrong: wrong, details: details });
  }

  function submitManualResult(lessonName) {
    var total = parseInt(document.getElementById('manual-total').value) || 0;
    var correct = parseInt(document.getElementById('manual-correct').value) || 0;
    var notes = document.getElementById('manual-notes').value;
    if (correct > total) correct = total;
    saveAndShowResult(lessonName, { total: total, correct: correct, wrong: total - correct, details: [], notes: notes });
  }

  function saveAndShowResult(lessonName, result) {
    Storage.recordCheckin(state.selectedSubject, state.selectedLessonId || 0, lessonName, result);
    var resultArea = document.getElementById('result-area');
    var rate = result.total > 0 ? Math.round(result.correct / result.total * 100) : 0;
    var isGood = rate >= 80;

    var html = '';
    html += '<div class="card result-summary ' + (isGood ? 'good' : 'need-improve') + '">';
    html += '<div class="result-emoji">' + (isGood ? '🎉' : '💪') + '</div>';
    html += '<div class="result-score">' + result.correct + '/' + result.total + '</div>';
    html += '<div class="result-rate">正确率 ' + rate + '%</div>';
    html += '<div class="result-praise">' + getRandomPraise() + '</div>';
    if (result.wrong > 0) {
      html += '<div class="result-wrong">错题 ' + result.wrong + ' 道，继续加油！</div>';
    } else {
      html += '<div class="result-perfect">🏆 全对！太厉害了！</div>';
    }
    html += '</div>';

    if (result.notes) {
      html += '<div class="card"><div class="notes-title">📝 错题笔记</div><div class="notes-content">' + escapeHtml(result.notes) + '</div></div>';
    }

    html += '<button class="btn btn-primary btn-large" onclick="App.goHome()">✅ 完成，返回首页</button>';

    resultArea.innerHTML = html;
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.style.display = 'none';
    resultArea.scrollIntoView({ behavior: 'smooth' });
  }

  // =================== 记录页 ===================
  function renderRecords() {
    var history = Storage.getCheckinHistory(7);
    var stats = Storage.getStats();
    var html = '';

    html += '<div class="card stats-overview">';
    html += '<div class="stats-overview-title">📊 学习统计</div>';
    html += '<div class="stats-row">';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalDays + '</div><div class="stats-label">打卡天数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalQuestions + '</div><div class="stats-label">总题数</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.totalCorrect + '</div><div class="stats-label">答对</div></div>';
    html += '<div class="stats-item"><div class="stats-num">' + stats.accuracy + '%</div><div class="stats-label">正确率</div></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="section-title">最近7天记录</div>';
    var hasAny = false;
    history.forEach(function(day) {
      var parts = day.date.split('-');
      var displayDate = parseInt(parts[1]) + '月' + parseInt(parts[2]) + '日';
      var today = new Date();
      var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      var isToday = day.date === todayStr;
      var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
      var weekLabel = '周' + weekDays[d.getDay()];

      if (day.records.length === 0) {
        html += '<div class="card record-day-card empty">';
        html += '<div class="record-date">' + displayDate + ' ' + weekLabel + (isToday ? '（今天）' : '') + '</div>';
        html += '<div class="record-empty">😴 未打卡</div>';
        html += '</div>';
      } else {
        hasAny = true;
        html += '<div class="card record-day-card">';
        html += '<div class="record-date">' + displayDate + ' ' + weekLabel + (isToday ? '（今天）' : '') + '</div>';
        day.records.forEach(function(r) {
          var conf = SUBJECTS[r.subject] || { icon: '📝', name: r.subject };
          var rate = r.total > 0 ? Math.round(r.correct / r.total * 100) : 0;
          html += '<div class="record-item">';
          html += '<div class="record-item-header">';
          html += '<span class="record-subject">' + conf.icon + ' ' + conf.name + '</span>';
          html += '<span class="record-lesson">' + escapeHtml(r.lessonName || '') + '</span>';
          html += '</div>';
          html += '<div class="record-item-score">';
          html += '<span class="score-text">' + r.correct + '/' + r.total + '</span>';
          html += '<span class="rate-badge rate-' + (rate >= 80 ? 'good' : rate >= 60 ? 'ok' : 'bad') + '">' + rate + '%</span>';
          html += '</div>';
          html += '</div>';
        });
        html += '</div>';
      }
    });

    if (!hasAny) {
      html += '<div class="card empty-hint"><div class="empty-icon">📝</div><div>还没有打卡记录</div><div class="empty-sub">完成第一次打卡开始记录吧！</div></div>';
    }

    document.getElementById('records-content').innerHTML = html;
  }

  // =================== 答案管理 ===================
  function renderAnswers() {
    var html = '';

    if (!state.parentUnlocked) {
      html += '<div class="card unlock-card">';
      html += '<div class="unlock-icon">🔐</div>';
      html += '<div class="unlock-title">家长入口</div>';
      html += '<div class="unlock-sub">请输入密码进入答案管理</div>';
      html += '<input type="password" class="password-input" id="parent-password" placeholder="请输入密码" maxlength="4">';
      html += '<button class="btn btn-primary btn-large" onclick="App.unlockParent()">进入</button>';
      html += '</div>';
      document.getElementById('answers-content').innerHTML = html;
      return;
    }

    html += '<div class="answers-header">';
    html += '<span>📝 答案管理</span>';
    html += '<button class="btn btn-secondary btn-small" onclick="App.lockParent()">🔒 退出</button>';
    html += '</div>';

    // 录入
    html += '<div class="card answer-form-card">';
    html += '<div class="form-title">录入参考答案</div>';
    html += '<div class="subject-tabs">';
    ['chinese', 'math', 'english'].forEach(function(subj) {
      var conf = SUBJECTS[subj];
      html += '<button class="subject-tab ' + (state.selectedSubject === subj ? 'active' : '') + '" onclick="App.selectSubject(\'' + subj + '\')">' + conf.icon + ' ' + conf.name + '</button>';
    });
    html += '</div>';
    var lessons = LESSONS[state.selectedSubject] || [];
    html += '<select class="lesson-select" id="answer-lesson-select">';
    html += '<option value="">请选择课文/课时...</option>';
    lessons.forEach(function(l) {
      html += '<option value="' + l.id + '" data-name="' + l.name + '">' + l.name + '</option>';
    });
    html += '</select>';
    html += '<div class="form-label">参考答案（每行一道题，格式：1. 答案内容）</div>';
    html += '<textarea id="answer-input" class="answer-textarea" placeholder="1. 答案一&#10;2. 答案二&#10;3. 答案三"></textarea>';
    html += '<button class="btn btn-primary btn-large" onclick="App.saveAnswer()">💾 保存答案</button>';
    html += '</div>';
    html += '<div id="answer-save-result"></div>';

    // 已录入列表
    html += '<div class="section-title">已录入的答案</div>';
    var allAnswers = Storage.getAllAnswers();
    // 合并内置答案
    Object.keys(BUILT_IN_ANSWERS).forEach(function(key) {
      if (!allAnswers[key]) {
        var parts = key.split('_');
        var subj = parts[0];
        var lid = parseInt(parts[1]);
        var lessons = LESSONS[subj] || [];
        var lesson = lessons.find(function(l) { return l.id === lid; });
        allAnswers[key] = {
          subject: subj,
          lessonId: lid,
          lessonName: lesson ? lesson.name : '',
          answers: BUILT_IN_ANSWERS[key].map(function(t) { return { answer: t }; }),
          updatedAt: 'built-in'
        };
      }
    });
    var keys = Object.keys(allAnswers);
    if (keys.length === 0) {
      html += '<div class="card empty-hint"><div class="empty-icon">📋</div><div>还没有录入答案</div></div>';
    } else {
      keys.forEach(function(key) {
        var a = allAnswers[key];
        var conf = SUBJECTS[a.subject] || { icon: '📝', name: a.subject };
        html += '<div class="card answer-list-card">';
        html += '<div class="answer-list-header">';
        html += '<span class="answer-list-title">' + conf.icon + ' ' + conf.name + ' · ' + escapeHtml(a.lessonName || '') + '</span>';
        html += '</div>';
        html += '<div class="answer-list-count">共 ' + (a.answers ? a.answers.length : 0) + ' 题' + (a.updatedAt === 'built-in' ? ' · 📦 内置' : '') + '</div>';
        html += '<div class="answer-list-actions">';
        html += '<button class="btn btn-secondary btn-small" onclick="App.editAnswer(\'' + a.subject + '\', ' + a.lessonId + ')">✏️ 编辑</button>';
        html += '<button class="btn btn-danger btn-small" onclick="App.deleteAnswer(\'' + a.subject + '\', ' + a.lessonId + ')">🗑️ 删除</button>';
        html += '</div>';
        html += '</div>';
      });
    }

    document.getElementById('answers-content').innerHTML = html;
  }

  function saveAnswer() {
    var lessonSelect = document.getElementById('answer-lesson-select');
    if (!lessonSelect || !lessonSelect.value) { alert('请选择课文/课时'); return; }
    var lessonId = parseInt(lessonSelect.value);
    var lessonName = lessonSelect.selectedOptions[0].getAttribute('data-name');
    var input = document.getElementById('answer-input').value.trim();
    if (!input) { alert('请输入参考答案'); return; }

    var lines = input.split('\n').filter(function(l) { return l.trim(); });
    var answers = lines.map(function(line) {
      var match = line.match(/^\d+[.、．]\s*(.*)/);
      return { answer: match ? match[1] : line };
    });

    Storage.saveAnswer(state.selectedSubject, lessonId, answers, lessonName);

    var result = document.getElementById('answer-save-result');
    result.innerHTML = '<div class="card success-msg">✅ 答案已保存！共 ' + answers.length + ' 题</div>';
    setTimeout(function() { result.innerHTML = ''; }, 2000);
    document.getElementById('answer-input').value = '';
    renderAnswers();
  }

  function editAnswer(subject, lessonId) {
    var answer = Storage.getAnswers(subject, lessonId);
    if (!answer) return;
    state.selectedSubject = subject;
    renderAnswers();
    var lessonSelect = document.getElementById('answer-lesson-select');
    if (lessonSelect) {
      lessonSelect.value = lessonId;
      var text = answer.answers.map(function(a, i) { return (i + 1) + '. ' + (a.answer || a); }).join('\n');
      document.getElementById('answer-input').value = text;
    }
  }

  function deleteAnswer(subject, lessonId) {
    if (!confirm('确定删除这组答案吗？')) return;
    Storage.deleteAnswer(subject, lessonId);
    renderAnswers();
  }

  // =================== 工具 ===================
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  function escapeAttr(str) {
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // =================== 公开API ===================
  window.App = {
    _gradingState: {},
    init: function() {
      document.querySelectorAll('.tab-item').forEach(function(tab) {
        tab.addEventListener('click', function() {
          switchView(this.getAttribute('data-view'));
        });
      });
      switchView('home');
    },
    switchView: switchView,
    goHome: function() { switchView('home'); },
    selectSubject: function(subject) {
      state.selectedSubject = subject;
      state.selectedLessonId = null;
      if (state.currentView === 'camera') renderCamera();
      else if (state.currentView === 'answers') renderAnswers();
    },
    selectSubjectFromHome: function(subject) {
      state.selectedSubject = subject;
      state.selectedLessonId = null;
      switchView('camera');
    },
    clearImage: function() {
      state.capturedImageBase64 = null;
      var fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      renderCamera();
    },
    submitHomework: submitHomework,
    markQuestion: markQuestion,
    finishGrading: finishGrading,
    submitManualResult: submitManualResult,
    unlockParent: function() {
      var pwd = document.getElementById('parent-password').value;
      var settings = Storage.getSettings();
      if (pwd === settings.parentPassword) {
        state.parentUnlocked = true;
        renderAnswers();
      } else {
        alert('密码错误');
      }
    },
    lockParent: function() { state.parentUnlocked = false; renderAnswers(); },
    saveAnswer: saveAnswer,
    editAnswer: editAnswer,
    deleteAnswer: deleteAnswer
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.App.init);
  } else {
    window.App.init();
  }
})();
