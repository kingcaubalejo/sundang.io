#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import figlet from 'figlet';
import { exec } from 'child_process';
console.log(
  chalk.yellow(figlet.textSync('SUNDANG.io', { horizontalLayout: 'full' })),
);
program.version('1.0.0').description('My Node CLI');
program.action(() => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Welcome to the serverlesslandia.:',
        choices: [
          'Typescript + Dynamodb',
          'Typescript + Postgresql (coming soon)',
          'GraphQL Rest API (coming soon)',
        ],
      },
    ])
    .then((result) => {
      const spinner = ora(
        `Processing your selection: ${result.choice}...`,
      ).start();
      if (result.choice === 'Typescript + Dynamodb') {
        const cmd =
          'sls install --url https://github.com/kingcaubalejo/template-serverless-todo.git --name serverless-typescript-dynamodb';
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
            return;
          }
          if (stderr) {
            spinner.warn(chalk.yellow(`Stderr: ${stderr}`));
            return;
          }
          spinner.succeed(chalk.green('Template installed successfully!'));
          console.log(chalk.blue(stdout));
        });
      } else {
        setTimeout(() => {
          spinner.info(chalk.yellow('This option is coming soon!'));
        }, 1000);
      }
    });
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map
