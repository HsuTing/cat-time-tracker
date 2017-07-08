# Cat-time-tracker [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
This is the time tracker for the terminal.

## How to use
You must set a git username in your `.gitconfig`. It will make two json file as `.time-tracker/[username].json` and `.time-tracker/setting.json`. Those json files are used to store data and make a default setting. The setting which you can use:
- `timerColor(default: gray)`
- `format(default: "MMMM Do YYYY, h:mm:ss")`
- `tags(default: {"normal": "bgGreen", "bug": "bgRed"})`: Give a name as key and a color name as value.

Use `argv` as `--[argv name]=[argv value]`.



#### Start
Start a time tracker.

```js
yarn time-tracker [argv]
```

###### argv
- `note`: Add a not to your time tracker.
- `tag`: Choose a `tag` to your time tracker.

![start image](https://hsuting.github.io/cat-time-tracker/start.png)



#### Modify
Modify a record time.

```js
yarn time-tracker modify [argv]
```

###### argv
- `id`: This is the id of the record time.
- `note`: Add a new note to the record time.

![modify image](https://hsuting.github.io/cat-time-tracker/modify.png)



#### Show
Show those record time.

```js
yarn time-tracker show [argv]
```

###### argv
- `limit`: This is the limit of those record time which be shown.

![show image](https://hsuting.github.io/cat-time-tracker/show.png)



#### Count
Count those record time with `tags`.

```js
yarn time-tracker count
```

![count image](https://hsuting.github.io/cat-time-tracker/count.png)



## TODO
- [ ] output html
- [ ] add git branch and commit

## License
MIT © [HsuTing](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-time-tracker.svg
[npm-url]: https://npmjs.org/package/cat-time-tracker
[travis-image]: https://travis-ci.org/HsuTing/cat-time-tracker.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-time-tracker
