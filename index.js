#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import boxen from 'boxen'
import { ETC, CHINESE, JAPANESE, KOREAN, SPECIAL, XY, WESTERN } from './menu/index.js'
import randomPick from './utils/random-picker.js'

async function recommendMenu() {
  const { cuisine } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cuisine',
      message: chalk.bold.gray('어떤 종류?'),
      choices: [
        { name: chalk.redBright('한식'), value: 'korean' },
        { name: chalk.cyanBright('중식'), value: 'chinese' },
        { name: chalk.blue('일식'), value: 'japanese' },
        { name: chalk.greenBright('양식'), value: 'western' },
        { name: chalk.yellow('상남자'), value: 'xy' },
        { name: chalk.magenta('아무거나'), value: 'all' },
      ],
    },
  ])

  // 선택한 메뉴 객에를 가져옴
  const menu_map = {
    korean: KOREAN,
    chinese: CHINESE,
    western: WESTERN,
    japanese: JAPANESE,
    xy: XY,
    all: [...KOREAN, ...CHINESE, ...JAPANESE, ...WESTERN, ...SPECIAL, ...ETC],
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
