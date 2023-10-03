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

const nextActions = ['play again', 'exit', 'change game'] as const;
type NextAction = typeof nextActions[number];

const gameTitles = ['hit and blow', 'janken'] as const;
type GameTitle = typeof gameTitles[number];

type GameStore = {
    [key in GameTitle]: Game;
}

abstract class Game {
    abstract setting(): Promise<void>
    abstract play(): Promise<void>
    abstract end(): void
}

class GameProcedure {
    private currentGameTitle: GameTitle | '' = '';
    private currentGame: Game | null = null;

    constructor(private readonly gameStore: GameStore) { }

    async start() {
        await this.select();
        await this.play();
    }

    async select() {
        this.currentGameTitle = await promptSelect<GameTitle>('ゲームタイトルを入力してください', gameTitles);
        this.currentGame = this.gameStore[this.currentGameTitle];
    }

    private async play() {
        if (!this.currentGame) throw new Error('ゲームが選択されていません');
        printLine(`===\n${this.currentGameTitle} を開始します\n===`);
        await this.currentGame.setting();
        await this.currentGame.play();
        this.currentGame.end();
        const action = await promptSelect<NextAction>('ゲームを続けますか?', nextActions);
        if (action === 'play again') {
            this.play();
        } else if (action === 'exit') {
            this.end();
        } else if (action == 'change game') {
            await this.select();
            await this.play();
        }
        else {
            const neverValue: never = action;
            throw new Error(`${neverValue} is an invalid action`);
        }
    };
    private end() {
        printLine('ゲームを終了しました');
        process.exit();
    };


}


class HitAndBlow implements Game {
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

    reset() {
        this.answer = [];
        this.tryCount = 0;
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


const jankenOptions = ['rock', 'paper', 'scissors'] as const
type JankenOption = typeof jankenOptions[number]

class Janken implements Game {
    private rounds = 0
    private currentRound = 1
    private result = {
        win: 0,
        lose: 0,
        draw: 0,
    }

    async setting() {
        const rounds = Number(await promptInput('何本勝負にしますか？'))
        if (Number.isInteger(rounds) && 0 < rounds) {
            this.rounds = rounds
        } else {
            await this.setting()
        }
    }

    async play() {
        const userSelected = await promptSelect(`【${this.currentRound}回戦】選択肢を入力してください。`, jankenOptions)
        const randomSelected = jankenOptions[Math.floor(Math.random() * 3)]
        const result = Janken.judge(userSelected, randomSelected)
        let resultText: string

        switch (result) {
            case 'win':
                this.result.win += 1
                resultText = '勝ち'
                break
            case 'lose':
                this.result.lose += 1
                resultText = '負け'
                break
            case 'draw':
                this.result.draw += 1
                resultText = 'あいこ'
                break
        }
        printLine(`---\nあなた: ${userSelected}\n相手${randomSelected}\n${resultText}\n---`)

        if (this.currentRound < this.rounds) {
            this.currentRound += 1
            await this.play()
        }
    }

    end() {
        printLine(`\n${this.result.win}勝${this.result.lose}敗${this.result.draw}引き分けでした。`)
        this.reset()
    }

    private reset() {
        this.rounds = 0
        this.currentRound = 1
        this.result = {
            win: 0,
            lose: 0,
            draw: 0,
        }
    }

    static judge(userSelected: JankenOption, randomSelected: JankenOption) {
        if (userSelected === 'rock') {
            if (randomSelected === 'rock') return 'draw'
            if (randomSelected === 'paper') return 'lose'
            return 'win'
        } else if (userSelected === 'paper') {
            if (randomSelected === 'rock') return 'win'
            if (randomSelected === 'paper') return 'draw'
            return 'lose'
        } else {
            if (randomSelected === 'rock') return 'lose'
            if (randomSelected === 'paper') return 'win'
            return 'draw'
        }
    }
}


(async () => {
    new GameProcedure({
        'hit and blow': new HitAndBlow(),
        'janken': new Janken(),
    }).start();
})()
