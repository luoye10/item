function timeHandle(time) {
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
export default timeHandle;
