// 顾时夜的日记池（你直接粘贴自己的那份letters数组）
const letters = [
  `今日处理了商会账目，又去码头看了新到的货。雪很大，路过银楼时看见一支白玉簪，成色不错，已让人包好。
你上次说喜欢梨膏糖，明日差人送些过去。
夫人，近日一切如常，只是书房空了些。`,

  `军务冗杂，深夜方归。
路过西街，桂花开了。`,

  `整日会议。
茶凉了三次。
……
我好想你。`,

  `收到你寄的信。
近日风大，翠嫂着人添了衣物，一切安好。
你也记得添衣，等你回来。`,

  `晨起时见窗棂结霜，想起你总爱在这种天气赖床。早膳让厨房备了酒酿圆子，若你在，大约会嫌糖少。
午间巡视新军营房，士兵操练时呵出的白气连成一片。有个小伙子袖口破了，针脚歪斜地缝着，忽然记起你上次替我补大衣时，也是这般笨拙又认真。回来便吩咐后勤处加发新装。
傍晚路过茶楼，二楼雅座有人唱《游园惊梦》。站了片刻，班主认出我来，硬要请进去听全场。婉拒时瞥见案上摆着你常点的杏仁酥，油纸包着带了回来。
入夜后看了两封渝州来信。你上次提过的洋行股票，今日涨了三成。
炭笔快用完了，你什么时候回来？`,

  `今日难得清闲，去城郊马场跑了两圈。那匹我同你常骑的枣红马胖了些，驯马师说它总偷吃燕麦。回程时绕道去了趟西山的梅林，枝头刚结花苞，再冷些就该开了。若你在这里，大概又要折几枝插瓶，说是书房太沉闷。
午后裁缝来量衣服尺寸，带了新到的料子。那格纹颜色的料子很衬你，便多订了一套。路过钟表行时，修怀表的老匠人问起你怎么许久不来——你上次抱怨表链太旧说要给我买条新的，他特意留了条米兰带的，表链有了，你却不在我身边。
晚间收到南京旧友来信，邀我去听下月的德国交响乐团。演出单上有你先前提过的戏，已让副官订了相邻的包厢。
临睡前发现书房抽屉里剩着半盒你落下的发夹。
我去找你好不好
天阴，明日或许有雨。`,

  `今日路过长明街，见一孩童蹲在糖画摊前，扎着与你相似的双髻。摊主画凤凰时，她踮脚的模样让我多看了两眼。
你若在，大约也会这般踮脚看糖画，那样明媚。
不知。
大抵我会吧。`,

  `今日前线捷报，三镇叛军已降。将士们士气很盛，缴获的军械里有两把镶贝的勃朗宁，枪柄缠着红绸。其中一把准星略偏，但握把弧度合你的手型。
庆功宴上炊事班炖了羊肉，参谋处的小子们起哄要我讲话。只说了句“天冷，都吃饱”，他们反倒鼓掌更响。你若在场，大概又要笑我寡言。
战后清理时，在敌方指挥所找到盒未拆的巧克力，锡纸印着蜂鸟图案。
放你梳妆台抽屉里了。`,

  `寅时三刻醒了。
窗外有雨簌簌声，起来看了会，发现是风摇竹枝。
你总说枕头太高，今夜试了你的软枕，确实不惯。`,

  `近日诸事平顺。商会新到的茶叶尝过了，不如你沏的。翠嫂笑说我嘴刁，不是品茶而是品沏茶的人。
包扎很好，伤口没再疼。
勿念。`,

  `今日处理了几桩公事，见了旧部，谈及边境粮道事宜。午后批阅文书，安静许多。
你远在外头，音讯难得。写信给你已成习惯，今日无甚新事，只觉院中格外寂静。饭后取出你以前爱用的茶盏，倒也不觉苦涩，反倒安稳。
你在那边是否安好？
余无他事。愿一切顺遂。`,

  `今日起早，天色未亮已有人来报。处理了几桩旧案，余下时间查了些账本，倒也平静。
午后有人送了两本新书来，是你以前偶尔提过的那几本。翻了几页，总觉身边少个人问一句“好看吗”。想起你在的时候，总会随手递茶过来，问我想吃什么。
你那边天气如何？洛川最近多雨，夜里院里潮气重了些。你不在，总觉得屋子空了，茶也淡了。
莫要太累。若想家，写信来便是。`,

  `今日查阅城内商贾的帐册，遇到些小事，倒没什么大碍。饭后在廊下坐了会儿，望见桂树抽新芽，心里难得松了口气。
你那边可还顺心？这些日子总梦见你，说笑如常，醒来却只余冷清。你若偶尔想起我，别吝啬回信。
你安心在外，不必担心府里一切。等你回来时，洛川已无事，安稳如初。`,

  `今日与旧友小聚，谈了些陈年往事。众人散去后，独自一人回府。桌上还是你曾收拾的模样，动也未动。
时常记起你说的话。你总嫌我话少，其实有些话，不知怎么开口。你不在，日子也就一日日过去，没什么大起大落。只是安静下来时，心里难免空落。`
];

// 图片链接
const mailboxWithBird = "https://raw.githubusercontent.com/jimi430/gushiye-letterbox/refs/heads/main/f4614f1a7d046878cf90e4c38f1cc70a.jpeg";
const mailboxOnly     = "https://raw.githubusercontent.com/jimi430/gushiye-letterbox/refs/heads/main/IMG_8396.jpeg";

// 获取当天日期字符串，格式如 "8月4日"
function formatDate() {
  const d = new Date();
  return `${d.getMonth()+1}月${d.getDate()}日`;
}

// 随机抽一封信（不和上一封重复）
let lastIdx = -1;
function getRandomLetter() {
  let idx = Math.floor(Math.random() * letters.length);
  if (idx === lastIdx && letters.length > 1) {
    idx = (idx + 1) % letters.length;
  }
  lastIdx = idx;
  return letters[idx];
}

// 小鸟切换
function updateBird(status) {
  const bird = document.getElementById("birdImg");
  if (status === "hasMail") {
    bird.src = mailboxWithBird;
  } else {
    bird.src = mailboxOnly;
  }
}

// “收顾时夜的信”按钮
document.getElementById("getMailBtn").onclick = function() {
  const letter = getRandomLetter();
  document.getElementById("letterDate").innerText = `${formatDate()} 顾时夜来信`;
  document.getElementById("letterContent").innerText = letter;
  document.getElementById("mailArea").style.display = "block";
  document.getElementById("sendArea").style.display = "none";
  updateBird("noMail");
};

// “写信给顾时夜”按钮
document.getElementById("sendMailBtn").onclick = function() {
  document.getElementById("mailArea").style.display = "none";
  document.getElementById("sendArea").style.display = "block";
  document.getElementById("submitResult").innerText = "";
  updateBird("hasMail");
};

// “投递”按钮
document.getElementById("submitLetterBtn").onclick = function() {
  const val = document.getElementById("myLetter").value.trim();
  if (!val) {
    document.getElementById("submitResult").innerText = "信纸还是空的哦～写点什么给顾时夜吧！";
    return;
  }
  document.getElementById("submitResult").innerText = "信件已投递，顾时夜一定会偷偷读到你的心事。";
  document.getElementById("myLetter").value = "";
};

// 页面加载时显示有鸟信箱
window.onload = function() {
  updateBird("hasMail");
};
.mood-title {
  font-size: 17px;
  color: #496097;
  margin-bottom: 9px;
  margin-top: 20px;
}
.mood-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 6px;
}
.mood-btn {
  background: #e6f0ff;
  border: none;
  border-radius: 13px;
  font-size: 15px;
  color: #5578c2;
  padding: 6px 20px;
  margin: 2px;
  cursor: pointer;
  transition: background .2s;
}
.mood-btn:hover, .mood-btn.active {
  background: #bad1f6;
  color: #283d62;
}
.mood-result {
  font-size: 15px;
  color: #ad5c99;
  margin-top: 7px;
  min-height: 20px;
}
