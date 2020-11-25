# quizizz-advisor

Minimalistic Chrome extension - shows correct answers on quizizz.com.

Quizizz advisor actually doesn't automatically solve your tasks, but shows you an answer before the task is solved. Automatic solving could be considered to add if requested by anyone in the future.

Works on tests whose creator doesn't have an account!
Works ONLY on live quizzes, that you join via code or link, e.g. https://quizizz.com/join?gc=679341&source=liveDashboard

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

Join our Discord! https://discord.gg/HPecVXeQrF

<details>
  <summary>Screenshots</summary>

###### \*click for larger size\*

##### Single choice
[<img width="400" src="https://i.imgur.com/mnKAkVl.png" alt="Single choice">](https://i.imgur.com/mnKAkVl.png)

##### Multiple choice
[<img width="400" src="https://i.imgur.com/Ok5021c.png" alt="Multiple choice">](https://i.imgur.com/Ok5021c.png)

##### Text input response
[<img width="400" src="https://i.imgur.com/xkviL2x.png" alt="Text input response">](https://i.imgur.com/xkviL2x.png)

</details>

## Installing

1. **Go to the Releases page** (`then download newest version (.zip)`).
2. **Unpack** ZIP file.
3. **Go to the extensions page** (`chrome://extensions or Chrome menu -> More tools -> Extensions`).
4. Enable **Developer mode** (`upper right corner`).
5. Click **Load unpacked** (`or drag the folder anywhere on the page`).
6. **Indicate the folder** you unpacked.

## Usage
1. Join to the quiz with joinmyquiz.com link or via game code.
2. In lobby, you should see an overlay with the answer:
[<img width="75" src="https://i.imgur.com/svLjTi5.png" alt="Answers overlay">](https://i.imgur.com/svLjTi5.png).

## Made using

- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

## Prerequisites to build

- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/)

## Dev build

```bash
# Clone repo
git clone https://github.com/Lumm1t/quizizz-advisor.git
cd quizizz-advisor/
yarn # or npm install
yarn build:dev # or npm run build:dev
```

## Production build

```bash
yarn build # or npm run build
```

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Motivation

There was no cheat that worked.

also I am surprised how bad it was done (messy code, stupid loops)
