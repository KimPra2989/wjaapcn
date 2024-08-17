#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import boxen from 'boxen'
import { CHINESE, JAPANESE, KOREAN } from './menu/index.js'
import randomPick from './utils/random-picker.js'

async function recommendMenu() {
  const { cuisine } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cuisine',
      message: chalk.bold.magenta('어떤 종류?'),
      choices: [
        { name: chalk.red('한식'), value: 'korean' },
        { name: chalk.green('중식'), value: 'chinese' },
        { name: chalk.blue('일식'), value: 'japanese' },
        { name: chalk.yellow('아무거나'), value: 'all' },
      ],
    },
  ])

  // 선택한 메뉴 객에를 가져옴
  const menu_map = {
    korean: KOREAN,
    chinese: CHINESE,
    japanese: JAPANESE,
    all: [...KOREAN, ...CHINESE, ...JAPANESE, '알아서 쳐먹어'],
  }

  const menu = menu_map[cuisine]

  const randomMenu = randomPick(menu)

  const message = chalk.yellow.bold(`${chalk.bold(randomMenu)}`)

  console.log(boxen(message, { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' }))

  // 피드백
  const feedBackLink = 'https://forms.gle/qgPCjDMQiNLEPQ9fA'
  console.log('Feedback here → ' + chalk.blueBright.underline(feedBackLink) + '\n')
}

recommendMenu()
