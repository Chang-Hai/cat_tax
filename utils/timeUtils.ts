// utils/timeUtils.ts
export const getTimePeriod = () => {
    const hour = new Date().getHours();
    if (hour > 22 || hour < 5) return 'night';
    if (hour >= 5 && hour < 12) return 'morning';
    return 'day';
};