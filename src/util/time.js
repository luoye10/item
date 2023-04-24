export function timeHandle(time) {
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
}

export function format(time) {
    let m = Math.floor(time / 60000),
        s = Math.floor((time % 60000) / 1000);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}

export function formatTime(paramTime) {
    let date = new Date().getDate();
    let time = new Date(paramTime),
        Y = time.getFullYear(),
        M = (time.getMonth() + 1).toString().padStart(2, '0'),
        D = time.getDate().toString().padStart(2, '0'),
        h = time.getHours().toString().padStart(2, '0'),
        m = time.getMinutes().toString().padStart(2, '0');
    let result;
    if (date == D) {
        result = h + ':' + m;
    } else if (date - D == 1) {
        result = '昨天 ' + ' ' + h + ':' + m;
    } else {
        result = Y + '/' + M + '/' + D + ' ' + h + ':' + m;
    }
    return result;
}
