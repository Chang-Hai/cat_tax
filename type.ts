// types.ts

export type CatFeatures = {
    breed: string;          // 猫咪品种，如 "橘猫"、"布偶"
    color: string;          // 猫咪颜色，如 "orange"、"black"
    weightLevel: 'light' | 'normal' | 'heavy'; // 体重等级
    cutenessScore: number;  // 萌力值，范围 1-5
    // 其他可选特征
    isFat?: boolean;        // 是否超重
    eyeColor?: string;      // 眼睛颜色
    pattern?: string;       // 花纹，如 "条纹"、"斑点"
    hasCat?: boolean;       //
};

export type TaxTemplate = {
    condition?: (features: CatFeatures) => boolean; // 触发条件
    templates: string[];    // 候选模板
    bonus?: string[];       // 附加条款
};