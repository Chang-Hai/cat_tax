// utils/taxGenerator.ts

import { EASTER_EGG_TEMPLATE, TAX_TEMPLATES } from "../config/taxTemplates";
import { CatFeatures } from "../type";

const parseTemplate = (template: string) => {
    // 处理 {{random a|b|c}} 语法
    return template.replace(/{{random (.*?)}}/g, (_, values) => {
        const options = values.split('|');
        return options[Math.floor(Math.random() * options.length)];
    });
};

export const generateTax = (features: CatFeatures) => {
    if (!features.hasCat) {
        return parseTemplate(EASTER_EGG_TEMPLATE.noCat.content);
    }

    let result = '';

    // 匹配符合条件的模板
    const matchedTemplates = TAX_TEMPLATES.filter(t =>
        !t.condition || t.condition(features)
    );

    // 随机选择主模板
    const mainTemplate = matchedTemplates.find(t => t.templates) || TAX_TEMPLATES[TAX_TEMPLATES.length - 1];
    result += parseTemplate(
        mainTemplate.templates[Math.floor(Math.random() * mainTemplate.templates.length)]
    );

    // 添加附加条款
    const bonusTemplates = matchedTemplates.filter(t => t.bonus);
    bonusTemplates.forEach(t => {
        result += t.bonus![Math.floor(Math.random() * t.bonus!.length)];
    });

    return result;
};