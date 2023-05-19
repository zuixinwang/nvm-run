const mri = require('mri')
const { exec } = require('child_process')
const { readdir } = require('fs/promises')
const { resolve } = require('path')
const { createConsola } = require('consola')

const consola = createConsola()

const argv = mri(process.argv.slice(2))

const { version, _ } = argv

const command = _.join(' ')

const getNvmDir = () => {
    return new Promise(resolve => {
        exec('nvm root', (error, stdout) => {
            if (error) {
                consola.error(error.message)
                process.exit(0)
            } else {
                resolve(stdout)
            }
        })
    })
}

const run = async () => {
    if (!command) {
        consola.error('Command not exist!')
        process.exit(0)
    }
    let { Path } = process.env
    if (version) {
        const stdout = await getNvmDir()
        const nvmRootDir = stdout.replace(/current root:/i, '').trim()
        const dirs = await readdir(nvmRootDir, { withFileTypes: true })
        const re = /^v(\d{1,2}\.\d{1,2}\.\d{1,2})$/
        const dir = dirs.filter(item => item.isDirectory() && item.name.match(re)).find(item => item.name === `v${version}`)
        if (dir) {
            Path = `${resolve(nvmRootDir, dir.name)};${Path}`
        } else {
            consola.warn(`version ${version} not exist!`)
            consola.info(`Please execute \`nvm install ${version}\` first!`)
            process.exit(0)
        }
    }
    consola.success(`Start to run Nodejs on v${version}.`)
    const child = exec(command, {
        env: {
            ...process.env,
            Path,
        },
    })
    child.stderr.pipe(process.stderr)
    child.stdout.pipe(process.stdout)
}

run()