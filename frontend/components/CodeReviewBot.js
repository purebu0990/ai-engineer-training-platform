// components/CodeReviewBot.js
import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Bot } from 'lucide-react';

export default function CodeReviewBot() {
  const [open, setOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const nodeRef = useRef(null); 

  const sendCodeToAI = async () => {
    if (!codeInput.trim()) return;

    // まずユーザーのメッセージをチャットログに追加
    setChatLog((prev) => [...prev, { role: "user", content: codeInput }]);

    try {
      // Next.js API にコードを送信
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await res.json();

      // AIの返信をチャットログに追加
      setChatLog((prev) => [
        ...prev,
        { role: "ai", content: data.review }
      ]);

      setCodeInput(""); // 入力欄をクリア
    } catch (err) {
      console.error(err);
      setChatLog((prev) => [
        ...prev,
        { role: "ai", content: "レビュー取得に失敗しました。" }
      ]);
    }
  };

  return (
  <Draggable nodeRef={nodeRef}>
    <div
      ref={nodeRef}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: open ? 600 : 80, // 閉じているときは丸ボタンサイズ
        zIndex: 1000,
        cursor: "move",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 上のラベル */}
      {open && (
        <div
          style={{
            marginBottom: 6,
            backgroundColor: "#0070f3",
            color: "white",
            padding: "4px 12px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          🧠AIコードレビュー
        </div>
      )}

      {/* 丸いボタン */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: open ? "100%" : 60,             // 開いたときは幅100%、閉じたときは60px
          height: open ? 30 : 60,                // 高さを開いたときだけ低く
          borderRadius: open ? 8 : "50%",        // 開いたときは少し角丸に
          backgroundColor: "#00c3ff",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 16,
          transition: "all 0.2s",
        }}
      >
        {open ? "閉じる" : <Bot size={30} color="white" />}
      </button>

      {/* チャットウィンドウ */}
      {open && (
        <div
          style={{
            marginTop: 10,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 12,
            padding: 10,
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <textarea
            rows={6}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="コードをここに貼り付けてください"
            style={{
              width: "100%",
              marginBottom: 6,
              padding: 6,
              borderRadius: 6,
              border: "1px solid #ccc",
              fontFamily: "monospace",
            }}
          />
          <button
            onClick={sendCodeToAI}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            送信
          </button>
          <div style={{ maxHeight: 400, overflowY: "auto", marginTop: 8 }}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <strong>{msg.role === "ai" ? "AI" : "あなた"}:</strong>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    background: msg.role === "ai" ? "#e0f7fa" : "#f5f5f5",
                    padding: 6,
                    borderRadius: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {msg.content}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </Draggable>
);
}
