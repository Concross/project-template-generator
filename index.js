#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to use generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project Name',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
  });

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const ogFilePath = `${templatePath}/${file}`;

    // get stats about the current file i.e. is it a file or directory
    const stats = fs.statSync(ogFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(ogFilePath, 'utf8');

      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call for all subdirectories within your template
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}