// components/ShareButton.tsx
import { Button } from '@/components/ui/button' // Shadcn UI 的 Button
import { Share2 } from 'lucide-react'
type CatFeatures = {
    breed: string;          // 猫咪品种，如 "橘猫"、"布偶"
    color: string;          // 猫咪颜色，如 "orange"、"black"
    weightLevel: 'light' | 'normal' | 'heavy'; // 体重等级
    cutenessScore: number;  // 萌力值，范围 1-5
    // 其他可选特征
    isFat?: boolean;        // 是否超重
    eyeColor?: string;      // 眼睛颜色
    pattern?: string;       // 花纹，如 "条纹"、"斑点"
};

export default function ShareButton({ report }: { report: CatFeatures }) {
    const handleShare = async () => {
        // 生成分享图
        const cardElement = document.getElementById('tax-card');
        const canvas = await html2canvas(cardElement!);
        const image = canvas.toDataURL('image/png');

        // 调用微信JS-SDK（需注入配置）
        wx.updateAppMessageShareData({
            title: '我的猫咪被征税了！',
            desc: `快来看看${report.breed}要交多少猫猫税`,
            imgUrl: image
        });
    };

    return (
        <Button onClick={handleShare} className="bg-green-500 hover:bg-green-600">
            <ShareIcon className="mr-2" />
            生成炫耀卡片
        </Button>
    );
}