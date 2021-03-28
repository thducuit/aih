# AihApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Run On Production
- Make sure `pm2` has install on global scope. Try `pm2 -h` to check if `pm2` is works. If not run `npm install -g pm2` to install `pm2`.
- Run following command to start the server (make sure current dir on terminal is in the same directory with file `pm2.config.js`)
```sh
pm2 start pm2.config.js
```
---
Alternative method: For the case we can not install `pm2` on global scope. We can install `pm2` in local scope.
```sh
npm install --save pm2
```
Then run command.
```sh
npx pm2 pm2.config.js
```
---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
