# Use Specific Node Version On Windows

> It's troublesome when I want to run an app in another nodejs version, so I did this just to simplify.

This depends on [`windows nvm`](https://github.com/coreybutler/nvm-windows), please install it before use this package.

## Usage

1. Install this package

    ``` bash
    npm install nvm_run -D
    ```

2. Update `package.json` `scripts`

    For example in the `vue2` `cli` project.
    ``` bash
    # before
    "dev": "vue-cli-service serve"
    # after
    "dev": "nvmr --version=16.13.0 vue-cli-service serve"
    ```