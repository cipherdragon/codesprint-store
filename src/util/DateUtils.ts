export function getDayOfYear() {
    const now = new Date();
    const year_start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - year_start.getTime();

    const MS_IN_DAY = 1000 * 60 * 60 * 24;

    return Math.floor(diff / MS_IN_DAY);
}

export function getSecondsOfDay() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = now.getTime() - startOfDay.getTime();

    return Math.floor(diff / 1000);
}