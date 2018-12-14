'use strict'
const exec = require('child_process').exec
const co = require('co')
const chalk = require('chalk')
const glob = require('glob')
const program = require('commander')
const path = require('path')
const fs = require('fs')

const gitUrl = 'https://github.com/minteliuwm/react-demo.git';

module.exports = () => {
	co(() => {
		const projectName = program.args[0]

		const list = glob.sync('*')
		if (!projectName) {
			if(list.length) {
				console.log('当前目录不为空，不能创建新项目')
				return
			} else {
				const cmdStr = `git clone ${gitUrl} .`
				create(cmdStr)
			}
		} else {
			if (list.length && list.filter(name => {
					const fileName = path.resolve(process.cwd(), path.join('.', name))
					const isDir = fs.statSync(fileName).isDirectory()
					return name.indexOf(projectName) !== -1 && isDir
				}).length !== 0) {
				console.log(`项目${projectName}已经存在`)
				return
			} else {
				console.log(projectName)
				const cmdStr = `git clone ${gitUrl} ${projectName}`
				create(cmdStr)
			}
		}

		function create(cmdStr) {
			console.log(cmdStr)
			console.log(chalk.white('\n Start generating...'))

			exec(cmdStr, (error, stdout, stderr) => {
				if (error) {
					console.log(error)
					process.exit()
				}
				console.log(chalk.green('\n √ Generation completed!'))
				console.log(`\n cd ${projectName} && npm install \n`)
				process.exit()
			})
		}
	})
}
