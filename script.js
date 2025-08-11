'use strict';

// ====== 可改：你的 Vercel API 地址（建议保持这样）======
const API_URL = 'https://gushiye-letterbox.vercel.app/api/reply';

// ====== 小工具 =======
const $ = (id) => document.getElementById(id);
const setShow = (id, show) => { const n = $(id); if (n) n.style.display = show ? 'block' : 'none'; };

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function formatDate() {
  const d = new Date();
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
function updateBird(status) {
  const mailboxWithBird = "https://raw.githubusercontent.com/jimi430/gushiye-letterbox/refs/heads/main/f4614f1a7d046878cf90e4c38f1cc70a.jpeg";
  const mailboxOnly     = "https://raw.githubusercontent.com/jimi430/gushiye-letterbox/refs/heads/main/IMG_8396.jpeg";
  const bird = $('birdImg');
  if (bird) bird.src = (status === 'hasMail') ? mailboxWithBird : mailboxOnly;
}

// ====== 顾时夜的日记（示例；你可继续补全原来的长列表）======
const letters = [
  `今日军务冗繁，批阅至更深夜静方得归。推门入室，唯见公馆空廊寂寂，不似夫人在时，总有一盏暖灯候我。夜阑人静，尤念卿卿。`,
  `整日会议，茶凉了三次……我好想你。`,
  `路过西街，桂花开了。你若在，大概会揪一簇夹在账本里。`,
  `晨起见窗棂结霜，你总爱在这种天气赖床。我让厨房备了酒酿圆子，若你在，大约会嫌糖少。`,
  `今日得闲，去城郊马场跑了两圈。回程时绕道西山，梅苞初绽。若你在，又要折几枝插瓶了吧。`
  `洛宁今日的雨从晨至暮，未曾停歇。闲倚窗边时，忽见楼下有一双人影，缓缓踱过积水的街。老先生手中伞面总偏向他身侧的老妻。雨水浸透了他半边肩膀，他却不觉，只顾低头与她絮语。雨痕模糊了视线，恍惚间，竟觉得那背影恰似你我。若此刻你在身旁，我们是否也会这样，任细雨湿了衣衫，仍共撑一把伞，慢慢走过这长长的雨季？会吧。会的。`,
    
    `今日军务冗繁，批阅至更深夜静方得归。 推门入室，唯见公馆空廊寂寂，不似夫人在时，总有一盏暖灯候我。夜阑人静，尤念卿卿。若夫人近日得闲暇，盼见回信，聊慰相思。`,
    
    `今日得闲，特去了你我旧时常访的那家衣馆。按你的尺寸，将洛宁时兴的款式一一订制。家中试衣阁已渐无隙地，唯待夫人归来时，灯下比肩，细挑慢选。`,
    
   `今天想了许多，想没遇到你之前似乎我对于岁月流逝不甚在意，但遇到你之后才惊觉所谓时间不只是一个抽象的名词，它因为在意的人而有着不同的意义。和你在一起时，我总在祈盼时间流逝的慢些，等待你时，能感受到四时风物与时间的空寂。
    一言之，不过是岁月漫长。
洛宁的秋天总是来得很突然。天气虽然还是炎热如常，但切忌贪凉，西瓜等物性寒，我不在身边，你总是要多关照着些自己，不要多食。
昨日去洛宁大学商议些事情，走在路上时看见了校园里的枫树。现在才八月，离枫叶红起来的日子还早，但我还是折了一片叶子，夹在了去年你常看的的那本书里。夏日的风混着燥热和蝉鸣，吹过树梢的时候可以摇晃着枫叶把阳光切割成破碎的光影。
今年的葡萄很甜，回来若是想吃，叫人去拿便是。`,
    
    `今日午休时偶然听见手下的人说家里孩子不懂事，闹着去北陆最北的荒原看极光。后面他似乎还有什么要说的，只是看我低头不说话忙噤了声。
其实，我是在想上次我们一起去看到的景色。
那里许愿的确很灵验。可能是因为人迹罕至，四下万籁无声，所以神明更能听见信徒的祈愿。许多年前我曾自己来过一次，那次目光所及遍布荆棘白雪，顾某没有想过心中所念有一天能实现。从这点来看，的确要感谢神明。
至于你的愿望，不必等待神明听见，我会帮你一一实现。`,
  
    `昨夜梦到了去年生日时，夫人坐在暖气开足了的车里的情景，也又一次瞥见了夫人悄悄在车窗凝出的雾气上勾画人像的场景。梦境就是梦境，比不得现实，我分明是记得你的眉眼，可昨夜梦中，你的容颜却像是蒙着一层纱雾似的叫人看不清……
或许是内心的指引，我伸出手在窗户上滑动起来，也画了你。你嗔怪我画的小像头上只有三根头发，但却觉得这样跟夫人一样很生动，很可爱。
靠得太近了……明明是梦境，怎的跟那日一样，我感受到了你清浅的呼吸铺在面上，温软的身子就这样毫不设防的倚在我怀里。玩笑似乎变了味，我的视线从唇上移到你的眼眸，想知道那里是不是也因我而沾染上了些许不同的颜色。可是梦就这样醒了。
睁开有些酸涩的眼，视线内是空空荡荡的顾公馆。床头新悬了一个香囊，里面装着的是你离开那日折下的花。鲜花久留不得。我跟翠嫂学着制成了干花，而后把花装进了香囊。第一次做，不小心捏碎了一些。香囊气味散的差不多时，夫人大约就要回来了吧。
  到时我们再一起做一个更好的，好不好。`,
  
    `军中日子很漫长，雨声很大，将士们的衣物已经备好，不必担心。想我的话可以在晚饭的时候给我打电话，我和你吃饭的时间是一样的。我不在家的这段时间，夫人还好吗？有没有买到想要的东西，有没有按时吃饭，熬夜的话我也不能监督你。
等过了这个雨季，马场上的雨水也会少很多，新的小马驹也会出生。北地亦有花开，是别的地方看不到的品种，我会带着它回来见你，赶在春暖花开之前。
有个下属说他打了胜仗回去之后要求婚，好多人都在起哄，他说想用这次的军功来换取我做见证，我答应了。这群人突然就欢呼了起来，冲进了雨中，风声将他们兴奋的喊叫拉的很远。嗯，你也同去。军中有酒，平时严格管控不可饮酒，不过今天可以喝一点。在支起的帐篷里，半大的小子勾着彼此的肩膀唱着家乡的歌，谁都没有说，但是他们想家。外面下着雨，账内在欢庆，热气拍打在每个人的脸上。我也拿了一碗温热的酒度数并不高，只是用作取暖。是在行军路上从不同的村落里买的，味道也一般。我只是，坐在人群中，一口一口咽下，连同对你的思念一并含进嘴里，融入身体。
我想你。`,
    
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
let shuffled = shuffle(letters);
let idx = 0;
function getRandomLetter() {
  if (idx >= shuffled.length) { shuffled = shuffle(letters); idx = 0; }
  return shuffled[idx++];
}

// ====== 心情伪AI =======
const aiReplies = {
  开心: [
    "茶房送了你喜欢的甜点来。和以前一样。",
    "后园那株晚桂开了，香气渗进窗缝。"
  ],
  想他: [
    "刚批完的军报空白处洇了滴墨。",
    "嗯。渝州今晚有月亮。"
  ],
  难过: [
    "厨房蒸了你爱吃的甜点，后院的猫生了崽。要来看么？我带你去。"
  ],
  期待: [
    "我也期待，期待与你重逢。"
  ],
  幸福: [
    "西厢留声机修好了，放的是你常哼的那首。",
    "一切安好，想着你，我便也是幸福的。"
  ]
};

// ====== 调后端要回信 =======
async function askGushiye(text) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || ('HTTP ' + res.status));
  return data.reply;
}

// ====== 事件绑定 =======
document.addEventListener('DOMContentLoaded', () => {
  // 收信
  $('getMailBtn').onclick = () => {
    $('letterDate').innerText = `${formatDate()} 顾时夜来信`;
    $('letterContent').innerText = getRandomLetter();
    setShow('mailArea', true);
    setShow('sendArea', false);
    setShow('moodArea', true);
    $('moodResult').innerText = '';
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    updateBird('noMail');
  };

  // 写信
  $('sendMailBtn').onclick = () => {
    setShow('mailArea', false);
    setShow('sendArea', true);
    setShow('moodArea', false);
    $('submitResult').innerText = '';
    updateBird('hasMail');
  };

  // 投递（本地保存）
  $('submitLetterBtn').onclick = () => {
    const val = ($('myLetter').value || '').trim();
    if (!val) { $('submitResult').innerText = '信纸还是空的哦～写点什么给顾时夜吧！'; return; }
    const bag = JSON.parse(localStorage.getItem('myLetters') || '[]');
    bag.push({ date: new Date().toISOString(), content: val });
    localStorage.setItem('myLetters', JSON.stringify(bag));
    $('myLetter').value = '';
    $('submitResult').innerText = '信件已投递，顾时夜一定会偷偷读到你的心事。';
  };

  // 我的信箱
  $('showMyLettersBtn').onclick = () => {
    const bag = JSON.parse(localStorage.getItem('myLetters') || '[]');
    if (!bag.length) { alert('你还没写过信哦～'); return; }
    alert(bag.map(l => {
      const d = new Date(l.date);
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}：\n${l.content}`;
    }).join('\n\n——————\n\n'));
  };

  // 心情按钮
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mood = btn.dataset.mood;
      const list = aiReplies[mood] || ["嗯。"];
      $('moodResult').innerText = list[Math.floor(Math.random() * list.length)];
    };
  });

  // 让顾时夜回信（调用 API）
  $('aiReplyBtn').onclick = async () => {
    const val = ($('myLetter').value || '').trim();
    if (!val) { alert('先写点内容再让顾时夜回信吧～'); return; }
    const box = $('aiReplyResult');
    box.textContent = '顾时夜正在蘸墨回信…';
    try {
      const reply = await askGushiye(val);
      box.textContent = reply;
    } catch (e) {
      console.error(e);
      box.textContent = '抱歉，回信失败啦（稍后再试）';
    }
  };

  // 初始化
  updateBird('hasMail');
});
