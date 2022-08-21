#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import gradient from "gradient-string"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"
import { createSpinner } from "nanospinner"


let playerName;
console.log(playerName);


const sleep = (ms =2000) => new Promise((r)=> setTimeout(r,ms));

async function welcome(){
    const rainTitle = chalkAnimation.rainbow(
        'who wants to be billionare? \n'
    );
    await sleep();
    rainTitle.stop();
    console.log(
        `
        ${chalk.blue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any questions wrong you will be ${chalk.red('killed')}
        
        `
    )
}

async function askName() {
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name',
        default() {
            return 'Player'
        }
    });

    playerName = answer.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'JavaScript was created in 10 days then released on\n',
      choices: [
        'May 23rd, 1995',
        'Nov 24th, 1995',
        'Dec 4th, 1995',
        'Dec 17, 1996',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
  }

async function question2() {
    const answer = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'what is x? var x = 1_1 + "1" + Number(1)\n',
        choices: ['4','"4"','"1111"','69420'],
    });
    return handleAnswer(answer.question_2 === '"1111"');
}

async function question3(){
    const answer = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'which of the following is NOT a primitive type?\n',
        choices: [
            'boolean',
            'number',
            'null',
            'object',
        ]
    })
    return handleAnswer(answer.question_3 === 'object')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('checking answer...').start();
    await sleep();

    if(isCorrect){
        spinner.success({ text: `Nice work ${playerName}.`})
    }else{
        spinner.error({text:`Game over, you lose ${playerName}!`});
        process.exit(1);
    }
}

function winner(){
    console.clear();
    const msg = `congrats, ${playerName} !\n $ 1 , 0 0 0,0 0 0`;
    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data));
    })
}

// console.clear();
// await welcome();
// await askName();
// await question1();
// await question2();
// await question3();
// winner();