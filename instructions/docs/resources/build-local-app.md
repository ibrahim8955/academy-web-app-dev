---
title: Building a local app
sidebar_position: 30
---

# Building a local app

Make sure that you have set up your environment with the environment setup instructions from the before academy section.

## Initialize a new DHIS2 app

**Note:** Before you initialize your app, please make sure that you do the following:

1. Check out the correct directory 

On your terminal, navigate to the directory where you'll be working, for example:

```
cd academy
```

Now that you're in the correct directory, you're ready to create a new DHIS2 app! ✨

### Create `my-app`

We'll use the [d2-app-scripts init command](https://platform.dhis2.nu/#/scripts/init) to **create a new DHIS2 app**:

```sh
d2 app scripts init my-app
cd my-app
ls
```

> **NOTE** If you call `d2 app scripts init my-app`, a new directory will be created at `./my-app` with a pre-populated `package.json`.  You can also run `d2 app scripts init .` to upgrade an existing app in the current directory.

Once you've created `my-app`, your directory structure should look like this:

```
 ── root
    ├── README.md
    ├── my-app
    └── my-app-solution
```

## Set up code-style with DHIS2 style

D2-style[d2-style](https://cli-style.dhis2.nu/) is a tool that runs [`prettier`](https://prettier.io/) and [`eslint`](https://eslint.org) under the hood with [a standardized configuration](https://github.com/dhis2/cli-style/tree/master/config/js).  It also installs git hooks with [husky](https://github.com/typicode/husky) which will automatically check your code style before making a `git` commit!

Following the DHIS2 styleguide isn't strictly required, but it can be very helpful in ensuring you write clean, readable, and functional code for your DHIS2 apps!

```sh
yarn add @dhis2/cli-style --dev
yarn d2-style add eslint react
yarn d2-style add prettier
yarn d2-style install
```

This will set up the project to automatically follow the DHIS2 style guidelines

## Add lint and format scripts

Then, add the following scripts to `package.json`:

```js
// package.json
{
    // ...
    "scripts": {
        // ...
        "lint": "yarn d2-style check",
        "lint:staged": "yarn lint --staged",
        "format": "yarn d2-style apply",
        "format:staged": "yarn format --staged"
    }
}
```

And try out your new scripts!

```sh
yarn lint
yarn format
```
## Start your DHIS2 application locally

Please follow [these steps](../resources/GET_STARTED.md#start-your-dhis2-application-locally) to start your application on your browser.

