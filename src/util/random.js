export default function randomStr() {
    let name = '';
    let str = 'abcdefghijklmn';
    for (let i = 0; i < 8; i++) {
        let s = Math.floor(Math.random() * (str.length - 0) + 0);
        name += str[s];
    }
    return name;
}
