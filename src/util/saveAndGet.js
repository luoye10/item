export function getValue(key) {
    const v = localStorage.getItem(key);
    if (!v) {
        return '';
    }
    try {
        const obj = JSON.parse(v);
        return obj;
    } catch (error) {
        return {};
    }
}

export function saveValue(key, val) {
    val = JSON.stringify(val);
    localStorage.setItem(key, val);
}
