#!/usr/bin/env node

const { program } = require('commander')
const { createProject } = require('../lib')

program
  .arguments('[projectname]')
  .option('--core <type>', 'Specify the core type')
  .option('-c, --core <type>', 'Specify the core type (shorthand)')
  .option('-n, --nopkg', 'Do not install packages')
  .action((projectname, options) => {
    const name = projectname || 'Webpack project'
    const core = options.core || 'webpack'
    installPackages = !options.nopkg 
    createProject(name, core, installPackages)
  })

program.parse(process.argv)
