#!/usr/bin/env node
/**
 * Created by Ouyang on 2018/3/29.
 * 项目入口
 * @author Ouyang
 */
const chalk = require('chalk');
const program = require('commander');

program
    .version(require('../package').version)
    .usage('<command> [options]');

program
    .command('component <name>')
    .description('create a new react component by ys-cli')
    .option('-m --mode, this is test option')
    .action((name, cmd) => {
        require('../lib/component')(name, cleanArgs(cmd));
    });

program
    .command('module <name>')
    .description('being development')
    .action(() => {
        console.log('feature unrealized ');
    });

program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp();
        console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    });

program
    .on('--help', () => {
        console.log('');
        console.log(` Run ${chalk.cyan(`yc <command> --help`)}`);
        console.log('');
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

function cleanArgs (cmd) {
    const args = {};
    cmd.options.forEach(o => {
        const key = o.long.replace(/^--/, '');
        if (typeof cmd[key] !== 'function') {
            args[key] = cmd[key];
        }
    });
    return args;
}
