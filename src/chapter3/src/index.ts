const printLine = (text: string, breakline: boolean = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''))
};

const promptInput = async (text: string) => {
    printLine(`\n${text}\n> `, false)
    return readline();
};

const readline = async () => {
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())));
    return input.trim();
}

const promptSelect = async <T extends string>(text: string, values: readonly T[]): Promise<T> => {
    printLine(`\n${text}`);
    values.forEach((value) => {
        printLine(`- ${value}`);
    })
    printLine(`> `, false);

    const input = (await readline()) as T;
    if (values.includes(input)) {
        return Promise.resolve(input);
    } else {
        return promptSelect<T>(text, values);
    }
}


const modes = ['normal', 'hard'] as const;
type Mode = typeof modes[number];

class HitAndBlow {
    private readonly answerSource: string[];
    private answer: string[];
    private tryCount: number;
    private mode: Mode = modes[0];

    constructor() {
        this.answerSource = Array.from({ length: 10 }, (_, index) => String(index));
        this.answer = [];
        this.tryCount = 0;
    };

    async setting() {
        this.mode = await promptSelect<Mode>('モードを選択してください', modes);

        const answerLength = this.getAnswerLength();

        while (this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * answerLength);
            const selectedItem = this.answerSource[randNum];
            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem);
            }
        }
    }

    async play() {
        const AnswerLenth = this.getAnswerLength();
        const inputArr = (await promptInput(`${AnswerLenth} 個の数字を入力してください`)).split(' ')

        if (!this.validate(inputArr)) {
            printLine('無効な入力です');
            await this.play();
            return
        }

        const result = this.check(inputArr);

        if (result.hit === this.answer.length) {
            this.tryCount += 1;
            return;
        }

        printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
        this.tryCount += 1;
        await this.play();
    }

    private check(input: string[]) {
        let hitCount = 0;
        let blowCount = 0;

        input.forEach((val, index) => {
            if (val === this.answer[index]) {
                hitCount += 1;
            } else {
                blowCount += 1;
            }
        })
        return { hit: hitCount, blow: blowCount };
    }

    end() {
        printLine(`正解です\n試行回数: ${this.tryCount}`);
        process.exit()
    }

    private validate(inputArr: string[]) {
        if (inputArr.length !== this.answer.length) { return false; }
        if (!inputArr.every((val) => this.answerSource.includes(val))) { return false; }
        if (inputArr.every((val, i) => inputArr.indexOf(val) !== i)) { return false; }
        return true;
    }

    private getAnswerLength() {
        switch (this.mode) {
            case 'normal': return 3
            case 'hard': return 4
        }
    }


};

(async () => {
    const hitAndBlow = new HitAndBlow();
    await hitAndBlow.setting();
    await hitAndBlow.play();
    hitAndBlow.end();
})()
