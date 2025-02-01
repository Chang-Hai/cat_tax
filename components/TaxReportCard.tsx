// components/TaxReportCard.tsx
import { Star, Cat, PawPrint, Sparkles } from 'lucide-react';
import RadarChart from './RadarChart'; // 假设RadarChart组件路径正确
import ShareButton from './ShareButton'; // 假设ShareButton组件路径正确
import { CatFeatures } from '../type';
import { motion } from 'framer-motion';

// 高亮关键词的函数
const highlightKeywords = (text: string) => {
    return text.split('（').map((part, index) => {
        if (index === 0) {
            // 高亮主条款
            return (
                <span key={index} className="text-orange-600 font-semibold">
                    {part}
                </span>
            );
        } else {
            // 灰色显示附加条款
            return (
                <span key={index} className="text-gray-500">
                    （{part}
                </span>
            );
        }
    });
};


export default function TaxReportCard({ features }: { features: CatFeatures }) {


    // 修改数据格式
    const radarData = [
        { label: '萌力值', value: features.cutenessScore },
        { label: '活跃度', value: 4 }, // 示例数据
        { label: '贪吃指数', value: features.weightLevel === 'heavy' ? 5 : 2 }
    ];

    // 萌力值星级显示
    const renderStars = () =>
        Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                fill={i < features.cutenessScore ? '#fbbf24' : 'transparent'}
                className={`w-5 h-5 ${i < features.cutenessScore ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));

    // 动态生成税款信息（假设generateTax函数已定义）
    const generateTax = (features: CatFeatures) => {
        // 这里可以实现具体的税款计算逻辑
        return '根据萌力值和体重指数计算的税款信息';
    };

    const taxResult = generateTax(features);

    // 彩蛋内容（无猫用户）
    if (!features.hasCat) {
        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-50 p-6 rounded-lg text-center"
            >
                <Sparkles className="mx-auto mb-4 w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold mb-2">
                    🪙 云养猫许可证
                </h3>
                <p className="text-gray-600">
                    {generateTax(features)} {/* 调用彩蛋文本生成 */}
                </p>
            </motion.div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-pink-100 to-orange-50 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cat className="mr-2 w-8 h-8 text-orange-600" />
                喵星税务报告
                <PawPrint className="ml-2 w-6 h-6 text-pink-400" />
            </h2>

            {/* 特征雷达图 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <RadarChart data={radarData} />
            </div>

            {/* 萌力值星级显示 */}
            <div className="flex items-center mb-6">
                <span className="text-lg font-semibold mr-2">萌力值：</span>
                {renderStars()}
            </div>

            {/* 动态生成税款 */}
            <div className="border-l-4 border-orange-500 pl-4 mb-4">
                <p className="text-lg font-semibold">📜 判决结果</p>
                <p>{highlightKeywords(generateTax(features))}</p>
            </div>

            {/* 分享按钮 */}
            <ShareButton report={features} />
        </div>
    );
}