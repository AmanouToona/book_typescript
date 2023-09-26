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
const printLine = (text, breakline = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''));
};
const promptInput = (text) => __awaiter(void 0, void 0, void 0, function* () {
    printLine(`\n${text}\n> `, false);
    return readline();
});
const readline = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = yield new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())));
    return input.trim();
});
const promptSelect = (text, values) => __awaiter(void 0, void 0, void 0, function* () {
    printLine(`\n${text}`);
    values.forEach((value) => {
        printLine(`- ${value}`);
    });
    printLine(`> `, false);
    const input = yield readline();
    if (values.includes(input)) {
        return Promise.resolve(input);
    }
    else {
        return promptSelect(text, values);
    }
});
class HitAndBlow {
    constructor() {
        this.mode = 'normal';
        this.answerSource = Array.from({ length: 10 }, (_, index) => String(index));
        this.answer = [];
        this.tryCount = 0;
    }
    ;
    setting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mode = (yield promptSelect('モードを選択してください', ['normal', 'hard']));
            const answerLength = this.getAnswerLength();
            while (this.answer.length < answerLength) {
                const randNum = Math.floor(Math.random() * answerLength);
                const selectedItem = this.answerSource[randNum];
                if (!this.answer.includes(selectedItem)) {
                    this.answer.push(selectedItem);
                }
            }
        });
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
    const hitAndBlow = new HitAndBlow();
    yield hitAndBlow.setting();
    yield hitAndBlow.play();
    hitAndBlow.end();
}))();
