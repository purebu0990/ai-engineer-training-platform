from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# .env を読み込む
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")

app = FastAPI()

class CodeReviewRequest(BaseModel):
    code: str

@app.post("/review")
async def review_code(req: CodeReviewRequest):
    prompt = f"""
あなたは優秀なソフトウェアエンジニア兼メンターです。
ユーザーから送られたコードをレビューし、以下の順で応答してください。

1. 良い点を褒める
2. 改善点と理由を簡潔に説明
3. 改善したコードを提示（修正後の完全なコード）
さらにユーザーからの追加指示（コンパイルエラー修正、効率化など）に応じて柔軟に対応を行ってください。

ユーザーのコード:
{req.code}

改善点と理由をマークダウン形式で出力してください。
"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        review_text = response.choices[0].message.content
        return {"review": review_text}
    except Exception as e:
        return {"review": f"エラー: {str(e)}"}
