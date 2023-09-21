const sayHello: (name: string) => string = (name) => {
    return `Hello ${name}`;
}

// console.log(sayHello('jack'))
process.stdout.write(sayHello('jack'))