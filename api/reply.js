// api/reply.js
export default async function handler(req, res) {
  // --- CORS ---
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
    // --- 手动读取 Raw Body，并解析 JSON ---
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let body = {};
    try { body = JSON.parse(raw || '{}'); } catch (e) {
      console.error('[reply] JSON parse error:', e, 'raw=', raw);
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    console.log('[reply] incoming body =', body);
    const { text } = body;
    if (!text || typeof text !== 'string') {
      console.error('[reply] Missing text');
      return res.status(400).json({ error: 'Missing "text"' });
    }

    const base  = (process.env.LLM_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
    const model = process.env.LLM_MODEL || 'deepseek-chat';
    const key   = process.env.LLM_API_KEY;
    if (!key) {
      console.error('[reply] LLM_API_KEY missing');
      return res.status(500).json({ error: 'Server missing API key' });
    }

    const systemPrompt =
      '你是“顾时夜”，文风克制内敛、温柔体贴、带一点民国风。' +
      '用中文回复来信，长度100~180字，称呼不浮夸，不用表情符号。';

    const url = `${base}/v1/chat/completions`;
    console.log('[reply] calling LLM:', url, model);

    const r = await fetch(url, {
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

    const respText = await r.text();   // 先拿原文，方便日志
    let data; try { data = JSON.parse(respText); } catch { data = respText; }

    if (!r.ok) {
      console.error('[reply] LLM non-OK', r.status, data);
      return res.status(r.status).json({
        error: (data && data.error && data.error.message) || 'LLM request failed'
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim?.() ||
      '（顾时夜沉思片刻，尚未成文。）';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('[reply] server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
