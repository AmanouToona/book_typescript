# 手を動かしながら学ぶ TypeScript

[手を動かしながら学ぶ TypeScript](https://amzn.to/3ZtNwUH) の学習記録


# 2章

- `tsc --init` で `tsconfig.json` を作製する。 このファイルは ts ファイルのコンパイル時のオプションを記述する
- `tsconfig.json` の `strictNullChecks` は `true` がお勧めのよう
- typescript では `null` は用いずに `undefined` に統一するのがよい。 ただし、書籍内では紹介目的で `null` を用いることも

# 3章

## 実行前の準備

### package.json

`scripts` に `build`, `dev`, `start` を記述する。  
`start` に記述してあると、 ```npm run start``` でコードを実行できる

### tsconfig.json

`outDir`, `rootDir` を記述。コンパイル対象と出力先を設定。
