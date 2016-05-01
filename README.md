# Reactist

## What is Reactist?

Reactist is a Command Line Interface tool that automate workflow when your working with React.js project. This project is composed of the following things:

React

- React: [A JavaScript library for building user interfaces](https://facebook.github.io/react/)

Trnaspiler & bundler

- Webpack: [Module Bundler](https://webpack.github.io/)
- Babel: [The compiler for writing next generation JavaScript](https://babeljs.io/)

Flux Implements

- Redux: [Predictable state container for JavaScript apps](http://redux.js.org)
- flux-utils: coming soon

Test Framework

- Mocha: [Simple, flexible, fun javascript test framework for node.js](http://mochajs.org)
- Karma: [Spectacular Test Runner for Javascript](https://karma-runner.github.io/)

Test Utilities

- Enzyme: [JavaScript Testing utilities for React](http://airbnb.io/enzyme/)

## Getting Started

### Installing

It is highly recommended that you install npm package globally.

```
npm install reactist -g
```

### Initializing

Just enter ```react init [app-name]``` in a console, then Reactist create react project *[app-name]* directory and set up react + redux + babel + webpack. If you answer *"Will you write unit tests?"* with Y(default is Y), mocha + karma + enzyme is also being installed automatically.


```
$ react init my-app
? Will you write unit tests? (Y/n) Y
.
.
.
Let's be a reactist...!
Please wait for a second.
.
.
.
Wrote to /Users/KimCoding/Workspace/my-app/package.json:
.
.
.
```
npm install is too slow, so it may be a long time before npm dependenceis is downloaded. When download process is completed, you can see that a project has been created.

```
npm WARN my-app@1.0.0 No description
npm WARN my-app@1.0.0 No repository field.
.
.
.
It has been finished, enjoy your react...!!

$~/> cd mya-pp
$~/my-app> ls
dev-server        node_modules      src               webpack.config.js
karma.conf.js     package.json      test-helper

$~/myapp>
```

## npm task

A project created by Reactist uses npm scripts to manage tasks. The following are descriptions about each task.

#### start

Run webpack-dev-server with the following npm command:

```shell
$ npm run start
$ open http://localhost:8080/webpack-dev-server/
```

You can see a sample react app like this.

![a sample redux app](https://raw.githubusercontent.com/CoderK/reactist/master/resources/images/screenshots/sample-app-screenshot.png)

#### build

You can build bundle.js into '/dist' directory.

```shell
$ npm run build  			# build development
$ npm run build:watch		# build in watch mode
```

#### test

Run unit tests powered by Mocha and Karma with the following npm command:

```shell
$ npm test
```

When you execute above, Karma run all unit tests with phantomjs as default. 
If you want to test on browser(chrome default) environment, you can use this command.

```shell
$ npm run test-debug
```

#### coverage

Get coverage report at '/coverage' with the following npm command:

```shell
$ npm run coverage
```

#### deploy

Get coverage and build to product code at once with the following npm command:

```shell
$ npm run deploy
```

## Contributing

comming soon...

## Authors

* **[KimCoding](https://github.com/CoderK)** - *Initial work*

## Todo

- add flux-utils
- add jest, jasmine
- add some npm task to reastist command(run, build, deploy, test, coverage)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
