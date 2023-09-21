const printLine = (text: string, breakline: boolean = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''))
};

const promptInput = async (text: string) => {
    printLine(`\n${text}\n> `, false)
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
    return input.trim()
};


(async () => {
    const name = await promptInput('名前を入力してください');
    console.log(name);
    const age = await promptInput('年令を入力してください');
    console.log(age);
    process.exit();
})()

//  こちらでも動作する
// const promptInput = (text: string) => {
//     return new Promise((resolve, reject) => {
//         printLine(`\n${text}\n >`, false);

//         process.stdin.once('data', (data) => {
//             const input = data.toString().trim();
//             resolve(input);
//         });

//         process.stdin.once('error', (err) => {
//             reject(err);
//         });
//     });
// };

// promptInput('名前を入力してください').then((input) => console.log(input)).catch((error) => { console.log(`error: ${error}`) })

