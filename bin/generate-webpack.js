#!/usr/bin/env node

const { Command } = require('commander')
const { createProject } = require('../lib')
const program = new Command()

program
  .version('2.0.1')
  .option('-c, --core <type>', 'specify core type')
  .option('-n, --nopkg', 'Do not install packages')
  .arguments('[projectname]') // Make projectname optional
  .action((projectname, options) => {
    const name = projectname || 'webpack-project'; // Default to 'webpack-project'
    const core = options.core || 'webpack';
    const installPackages = !options.nopkg;
    createProject(name, core, installPackages);
  });

program.parse(process.argv)
