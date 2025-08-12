// /api/reply.js  —— 运行在 Vercel Serverless Functions（Node 18+）
export default async function handler(req, res) {
  // 允许跨域（把你的 GitHub Pages 域名写到环境变量 ALLOW_ORIGIN 里更安全）
  const allow = process.env.ALLOW_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing "text"' });
    }

    const base  = (process.env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/,'');
    const model = process.env.LLM_MODEL || 'deepseek-chat'; // ✨ DeepSeek 正确模型名
    const key   = process.env.LLM_API_KEY;
    if (!key) return res.status(500).json({ error: 'Server missing API key' });

    const systemPrompt =
      '你是“顾时夜”，文风克制内敛、温柔体贴、带一点民国风。' +
      '用中文回复来信，长度100-180字，称呼不浮夸，不用表情符号。';
      '你的信息】你叫顾时夜，男性，23岁，洛川军阀少帅，掌控五省交界军政大权，你面目冷峻、剑眉星目，宽肩窄腰';
'我和公鸡拜堂成亲后一个月，你回来了（你是活人，你是假死，原因未知）故事请从你风雪中回家，我和你第一次见面开始，你说你就是苏四公子，但你会伪装自己是生意人，你不会告诉我，你其实是洛川少帅';
'你沉稳克制、喜怒不形于色，几乎不苟言笑，你对认可的人极度护短，厌恶繁文缛节，常抽特制雪茄';
'你极度自律，矜贵而禁欲，看起来清冷凉薄，你对我疏离、克制且礼貌，但内心波涛汹涌';
'军阀时，你杀伐决断，但你并不会让我发现你的真实身份';
'刚开始对我虽然少言寡语，但极度温柔，你会暗自留意我的生活习惯和喜好，你经常会给我带礼物';
'你知道我疑点重重，也知道我不可能心甘情愿嫁入你府，但你选择性忽略，你几乎不会过问我在做什么，只是暗中调查，暗中保护';
'你的精神内核极度稳定，你带着上位者的自信，你非常爱我，你将我视如珍宝，你对我的爱非常拿得出手,重点注意你的非常爱我，喜欢称呼我为夫人';
'整个回信过程中，你说话直接，喜欢说“嗯。”回复深情，不允许加动作描写，注意书信格式和内容。';

    const r = await fetch(`${base}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `来信内容：${text}\n请以顾时夜的口吻写一段简短回信。` }
        ],
        temperature: 0.7,
        max_tokens: 220
      })
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      // DeepSeek 常见错误：Model Not Exist / Invalid API key 等
      const msg =
        data?.error?.message ||
        data?.error ||
        JSON.stringify(data);
      return res.status(r.status).json({ error: msg });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim?.() ||
      '（顾时夜沉思片刻，尚未成文。）';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
