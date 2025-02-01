// app/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import TaxReportCard from '../components/TaxReportCard';
import { CatFeatures } from '../type'


export default function Home() {
    const [features, setFeatures] = useState<CatFeatures | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const compressImage = async (file: File) => {
        const image = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        // ...压缩逻辑...
        return canvas.toDataURL('image/jpeg', 0.8);
    };

    const handleUpload = async (file: File) => {
        setLoading(true);
        setError('');

        try {
            // 步骤1：转换为Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const base64Image = await new Promise<string>((resolve) => {
                reader.onload = () => resolve(reader.result as string);
            });

            // 步骤2：调用分析API
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: JSON.stringify({ image: base64Image }),
            });

            if (!response.ok) throw new Error('猫猫识别失败，请换张照片试试~');

            const data = await response.json();
            setFeatures(data);

        } catch (err) {
            setError(err instanceof Error ? err.message : '未知错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* 标题 */}
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-8 text-orange-600"
                >
                    🐱 猫猫税计算器
                </motion.h1>

                {/* 上传区域 */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <label className="flex flex-col items-center justify-center cursor-pointer group">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                            disabled={loading}
                        />

                        <div className="p-6 bg-pink-50 rounded-full mb-4 transition-all group-hover:bg-pink-100">
                            {loading ? (
                                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                            ) : (
                                <Upload className="w-12 h-12 text-orange-500" />
                            )}
                        </div>

                        <p className="text-gray-600 text-center">
                            {loading ? '正在分析喵星人...' : '点击上传猫猫照片'}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">支持 JPG/PNG 格式</p>
                    </label>

                    {/* 错误提示 */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg"
                        >
                            ⚠️ {error}
                        </motion.div>
                    )}
                </div>

                {/* 结果展示 */}
                {features && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <TaxReportCard features={features} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}