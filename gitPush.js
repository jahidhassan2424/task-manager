const inquirer = require('inquirer');
const { exec } = require("child_process");


const questions = [
    {
        type: 'input',
        name: 'name',
        message: "Input commit message",
    },
];

inquirer.prompt(questions).then(answers => {
    console.log(`git commit -m"${answers.name}"`);
    exec(`git commit -m"${answers.name}"`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
});