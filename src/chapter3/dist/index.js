"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLine = (text, breakline = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''));
};
const promptInput = (text) => __awaiter(void 0, void 0, void 0, function* () {
    printLine(`\n${text}\n> `, false);
    const input = yield new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())));
    return input.trim();
});
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
class HitAndBlow {
    constructor(mode) {
        this.answerSource = Array.from({ length: 10 }, (_, index) => String(index));
        this.answer = [];
        this.tryCount = 0;
        this.mode = mode;
    }
    ;
    setting() {
        const answerLength = this.getAnswerLength();
        while (this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * answerLength);
            const selectedItem = this.answerSource[randNum];
            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem);
            }
        }
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            const AnswerLenth = this.getAnswerLength();
            const inputArr = (yield promptInput(`${AnswerLenth} 個の数字を入力してください`)).split(' ');
            if (!this.validate(inputArr)) {
                printLine('無効な入力です');
                yield this.play();
                return;
            }
            const result = this.check(inputArr);
            if (result.hit === this.answer.length) {
                this.tryCount += 1;
                return;
            }
            printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
            this.tryCount += 1;
            yield this.play();
        });
    }
    check(input) {
        let hitCount = 0;
        let blowCount = 0;
        input.forEach((val, index) => {
            if (val === this.answer[index]) {
                hitCount += 1;
            }
            else {
                blowCount += 1;
            }
        });
        return { hit: hitCount, blow: blowCount };
    }
    end() {
        printLine(`正解です\n試行回数: ${this.tryCount}`);
        process.exit();
    }
    validate(inputArr) {
        if (inputArr.length !== this.answer.length) {
            return false;
        }
        if (!inputArr.every((val) => this.answerSource.includes(val))) {
            return false;
        }
        if (inputArr.every((val, i) => inputArr.indexOf(val) !== i)) {
            return false;
        }
        return true;
    }
    getAnswerLength() {
        switch (this.mode) {
            case 'normal': return 3;
            case 'hard': return 4;
        }
    }
}
;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const hitAndBlow = new HitAndBlow('normal');
    hitAndBlow.setting();
    yield hitAndBlow.play();
    hitAndBlow.end();
}))();
