# 手を動かしながら学ぶ TypeScript

[手を動かしながら学ぶ TypeScript](https://amzn.to/3ZtNwUH) の学習記録

# 2 章

- `tsc --init` で `tsconfig.json` を作製する。 このファイルは ts ファイルのコンパイル時のオプションを記述する
- `tsconfig.json` の `strictNullChecks` は `true` がお勧めのよう
- typescript では `null` は用いずに `undefined` に統一するのがよい。 ただし、書籍内では紹介目的で `null` を用いることも

# 3 章

## 実行前の準備

### package.json

`npm init -y` で準備。  
`scripts` に `build`, `dev`, `start` を記述する。  
`start` に記述してあると、 `npm run start` でコードを実行できる

### tsconfig.json

`tsc --init` で準備。  
`outDir`, `rootDir` を記述。コンパイル対象と出力先を設定。

## メモ

`as const` は literal type widening の抑制

```typescript
const = person{name: 'name'};
const = person{name: 'name'} as const;
```

は異なる。

# 4 章

## 環境構築

```bash
npm init -y
npm install --save-dev webpack@5.50.0 webpack-cli@4.7.2 typescript@4.3.5 ts-loader@9.2.5 serve@12.0.0
export NODE_OPTIONS=--openssl-legacy-provider  # openssl の version が合わないから怒られるので対応
```

[openssl の環境変数設定](https://zenn.dev/yogarasu/articles/425732ff408d06)

### その他設定

1. tsconfig.json の compilerOptions sourceMap を true にする。 webpack がソースマップを読めるようにするため
2. package.json に build, serve, dev を追加する. 内容はコード参照
3. その他、 tsconfig の設定は page 156 参照
