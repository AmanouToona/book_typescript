"use strict";
const sayHello = (name) => {
    return `Hello ${name}`;
};
// console.log(sayHello('jack'))
process.stdout.write(sayHello('jack'));
