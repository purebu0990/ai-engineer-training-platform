// pages/api/code-review.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  try {
    // Python AIサーバーにリクエスト
    const response = await fetch("http://localhost:8000/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    res.status(200).json({ review: data.review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ review: "AIサーバーへの接続に失敗しました。" });
  }
}
