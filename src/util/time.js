const timeHandle = time => {
    if (time >= 60) {
        let m = Math.floor(time / 60),
            s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        time = m + ':' + s;
    } else if (time >= 10 && time < 60) {
        time = '00' + ':' + time;
    } else {
        time = '00' + ':' + '0' + time;
    }
    return time;
};

const format = time => {
    let m = Math.floor(time / 60000),
        s = Math.floor((time % 60000) / 1000);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
};

const timeFormat = (paramTime, format) => {
    const date = new Date(paramTime);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const M = date.getMinutes();
    let result = day(paramTime);
    if (result) {
        if (result === 'today') {
            return `${addCharacter(h)}:${addCharacter(M)}`;
        }
        if (result === 'yesterday') {
            return `昨天 ${addCharacter(h)}:${addCharacter(M)}`;
        }
    }
    let list = {
        YYYY: y,
        MM: addCharacter(m),
        DD: addCharacter(d),
        hh: addCharacter(h),
        mm: addCharacter(M)
    };
    for (let key in list) {
        format = format.replace(key, list[key]);
    }
    return format;
};

function day(param) {
    const date = new Date(param);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const M = date.getMinutes();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const today = new Date().getDate();
    if (year === y && month === m && today === d) {
        return 'today';
    }
    if (year === y && month === m && today - d === 1) {
        return 'yesterday';
    }
    if (year === y && month - m === 1 && today === 1 && d === getDays(y, m)) {
        return 'yesterday';
    }
    if (year - y === 1 && m - month === 11 && d - today === 30) {
        return 'yesterday';
    }
    return '';
}

function addCharacter(v) {
    return (v + '').padStart(2, '0');
}

function getDays(year, month) {
    return new Date(year, month, 0).getDate();
}

module.exports = {
    timeHandle,
    format,
    timeFormat
};
