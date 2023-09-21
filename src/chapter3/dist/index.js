"use strict";
// const sayHello: (name: string) => string = (name) => {
//     return `Hello ${name}`;
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// // console.log(sayHello('jack'))
// process.stdout.write(sayHello('jack'))
const printLine = (text, breakline = true) => {
    process.stdout.write(text + (breakline ? '\n' : ''));
};
const promptInput = (text) => __awaiter(void 0, void 0, void 0, function* () {
    printLine(`\n${text}\n> `, false);
    const input = yield new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())));
    return input.trim();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield promptInput('名前を入力してください');
    console.log(name);
    const age = yield promptInput('年令を入力してください');
    console.log(age);
    process.exit();
}))();
