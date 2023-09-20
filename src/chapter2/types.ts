const list: number[] = [1, 2, 3];

const sayHello: (name: string) => string = (name: string) => { return `Hello, ${name}!!` }; // 型情報の引数名称は editor に表示する際などに用いられる。 コード中で必要なものではない

const person: { name: string, age: number } = { name: 'Michael Jackson', age: 20 }; // object 型はあるが、制約が弱すぎるので、各キー毎に型を定義する

const readonly_person: { readonly name: string, readonly age: number } = { name: 'Michael Jackson', age: 20 }

// readonly_person.name = 'Stevie Wonder'  // error する なぜなら readonly で縛っているから。 強力な機能であり、積極的に使っていくべき

let anyValue: any = 'Michael Jackson'  // any 型は何を入れることもできる。 最終手段

anyValue = 123
anyValue = undefined
anyValue = [1, 2, 3]
anyValue = () => { console.log('hello') }

interface Person { name: string, age: number }

interface Person { sayHello: (name: string) => void }  // オブジェクトのメソッドの定義

interface sayHello_ { (name: string): void }  // オブジェクトのメソッドと似ていて紛らわしいのであまり使わない

