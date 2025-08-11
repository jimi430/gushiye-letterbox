// api/reply.js
// Vercel Edge Function：代理到 DeepSeek (OpenAI 兼容) 做“顾时夜回信”

export const config = { runtime: 'edge' };

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';           // 生产建议填你的域名
const API_KEY      = process.env.LLM_API_KEY;                    // DeepSeek 的 API Key
const BASE_URL     = process.env.LLM_BASE_URL || 'https://api.deepseek.com';
const MODEL        = process.env.LLM_MODEL    || 'deepseek-chat';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

export default async function handler(req) {
  // 预检
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: corsHeaders(),
    });
  }
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), {
      status: 500,
      headers: corsHeaders(),
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  const letter = (payload.letter || '').toString().slice(0, 1200); // 防滥用，截断
  const mood   = (payload.mood   || '').toString().slice(0, 20);

  if (!letter) {
    return new Response(JSON.stringify({ error: 'letter is required' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  // 顾时夜语气设定（系统提示）
  const systemPrompt = `
你是“顾时夜”，民国氛围的温柔寡言人设。写给对方的回信需：
- 口吻沉静内敛、体贴、少用现代词汇与网络语
- 字数 80~140 字为宜
- 可以微妙地回应对方的心情（若提供：${mood || '未知'}），但不要直接说“我在模拟你的心情”
- 使用第一人称，不要写出“系统提示/AI/模型”等字样
- 结尾自然，不要过度煽情
`;

  // 用户来信（作为模型的“用户消息”）
  const userPrompt = `对方给你的来信如下（请以“顾时夜”的身份写一段简短回信）：
---
${letter}
---`;

  try {
    const resp = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,                  // deepseek-chat
        messages: [
          { role: 'system', content: systemPrompt.trim() },
          { role: 'user',   content: userPrompt.trim()   },
        ],
        temperature: 0.8,
        max_tokens: 220,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(JSON.stringify({ error: 'LLM error', detail: errText }), {
        status: 502,
        headers: corsHeaders(),
      });
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || '……';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Upstream failure', detail: String(e) }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}
