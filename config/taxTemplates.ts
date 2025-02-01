import { TaxTemplate } from "../type";

// config/taxTemplates.ts
export const TAX_TEMPLATES: TaxTemplate[] = [
    // 品种差异策略
    {
        condition: (f) => f.breed === '橘猫',
        templates: [
            '橘猫基因税：需缴纳{{random 15|20|25}}kg猫粮！',
            '检测到橘色能量！税款增加{{random 3|5}}倍小鱼干',
            '《橘猫特别法》第{{random 1|2|3}}条：每日罐头+{{random 1|2}}'
        ]
    },
    {
        condition: (f) => f.breed === '布偶',
        templates: [
            '贵族美容税：{{random 3|5}}罐进口罐头',
            '布偶猫特权：需支付{{random 2|4}}小时梳毛服务'
        ]
    },

    // 颜色触发策略

    {
        condition: (f) => f.color === 'orange',
        bonus: [
            '（附加橘色基因检测费）',
            '（含橘猫专属医疗保险）'
        ]
    },

    // 时间因素策略
    {
        condition: () => new Date().getHours() > 22,
        templates: ['深夜撸猫附加税：小鱼干+{{random 1|2}}'],
        bonus: ['（23点后税额自动加倍）']
    },

    // 默认策略
    {
        templates: [
            '通用猫咪税：小鱼干{{random 5|10}}条',
            '根据《喵星法典》缴纳{{random 3|7}}小时陪伴时间'
        ]
    }
];

// 彩蛋配置
export const EASTER_EGG_TEMPLATE = {
    noCat: {
        title: '🪙 云养猫许可证',
        content: '检测到潜在猫奴，请先缴纳{{random 5|10}}包猫条申请养猫资格'
    }
};