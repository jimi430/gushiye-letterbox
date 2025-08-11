// /api/reply.js
export default async function handler(req, res) {
  // CORS（允许从你的网站调用）
  const allowList = (process.env.ALLOW_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
  const origin = req.headers.origin || "";
  const allow = allowList.length === 0 || allowList.includes(origin);
  if (allow) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { userText } = req.body || {};
    if (!userText || typeof userText !== "string") {
      return res.status(400).json({ error: "Missing userText" });
    }

    const base = process.env.LLM_BASE_URL || "https://api.deepseek.com";
    const model = process.env.LLM_MODEL || "deepseek-chat";
    const key = process.env.LLM_API_KEY;sk-fc684331b53742bcb556b12c53655a3e
    if (!key) return res.status(500).json({ error: "Server not configured" });

    // 角色设定：顾时夜
    const system = `你是“顾时夜”，民国背景，性格寡言克制、温柔体贴。
用中文回信，语气内敛含蓄、意象细腻（桂花、雨、留声机、马场等）。
每次回复 50~120 字，像写短笺，不要跑题，不要重复用户原话。`;

    // DeepSeek 的 chat completions
    const r = await fetch(`${base.replace(/\/+$/,'')}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `她（他）写给你的信：${userText}\n请回一段短笺。` }
        ],
        temperature: 0.8,
        max_tokens: 180
      })
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      return res.status(r.status).json({ error: "LLM error", detail: txt });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "嗯。";
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
