export const setItemWithExpiry = (key: string, value: any, hours: number) => {
    const now = new Date();
    const item = {
        value,
        expiry: now.getTime() + hours * 60 * 60 * 1000, // jam → ms
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
        }

        return item.value;
    } catch {
        return null;
    }
};
