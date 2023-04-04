function format(time) {
    let m = Math.floor(time / 60000),
        s = Math.floor((time % 60000) / 1000);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}
export default format;
