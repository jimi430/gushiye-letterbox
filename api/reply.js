// api/reply.js
export default async function handler(req, res) {
  // CORS
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

    const base = process.env.LLM_BASE_URL || 'https://api.deepseek.com';
    const model = process.env.LLM_MODEL || 'deepseek-chat';
    const key   = process.env.LLM_API_KEY;

    if (!key) return res.status(500).json({ error: 'Server missing API key' });

    // 顾时夜语气的系统提示
    const systemPrompt =
      '你是“顾时夜”，文风克制内敛、温柔体贴、带一点民国风。' +
      '用中文回复来信，长度100~180字，称呼不浮夸，不用表情符号。';

    const r = await fetch(`${base.replace(/\/+$/,'')}/v1/chat/completions`, {
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
        temperature: 0.7
      })
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('LLM error:', data);
      return res.status(r.status).json({ error: data.error?.message || 'LLM request failed' });
    }

    const reply =
      data.choices?.[0]?.message?.content?.trim?.() ||
      '（顾时夜沉思片刻，尚未成文。）';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
