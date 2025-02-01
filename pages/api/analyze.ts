// 调用示例：pages/api/analyze.ts
//  猫咪特征识别流程
export async function POST(req: Request) {
    const { imageUrl } = await req.json();

    // 使用Next.js代理调用大模型API（避免暴露API Key）
    const result = await fetch('https://api.xxx.com/v1/vision', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: imageUrl,
            features: ['breed', 'color', 'weight_level', 'cuteness_score']
        })
    });

    return new Response(await result.json());
}