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
