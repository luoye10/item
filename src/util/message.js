import prompt from 'prompt-msg';

export function success(text) {
    let obj = {
        text,
        deviation: 60,
        style: {
            color: '#fff',
            background: 'aqua',
            padding: '5px 10px',
            zIndex: 100
        }
    };
    prompt(obj);
}
