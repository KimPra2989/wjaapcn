#!/usr/bin/env node

import boxen from 'boxen'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { CHINESE, ETC, JAPANESE, KOREAN, SPECIAL, WESTERN, XY } from './menu/index.js'
import { Menu } from './types'
import randomPick from './utils/random-picker.js'

// 메뉴 객체와 확률을 정의하는 인터페이스
interface MenuItem {
  name: string
  probability: number
}

interface MenuMap {
  [key: string]: Menu[]
}

// 프롬프트 실행 함수
async function recommendMenu() {
  const questions = [
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
  ]

  const { cuisine } = await inquirer.prompt(questions as any)

  // 선택한 메뉴 객체를 가져옴
  const menu_map: MenuMap = {
    korean: KOREAN,
    chinese: CHINESE,
    western: WESTERN,
    japanese: JAPANESE,
    xy: XY,
    all: [...KOREAN, ...CHINESE, ...JAPANESE, ...WESTERN, ...SPECIAL, ...ETC],
  }

  const menu = menu_map[cuisine]
  const { name: randomMenu, probability } = randomPick(menu)

  // 메뉴 출력
  const message = chalk.yellow.bold(`${chalk.bold(randomMenu)}`)
  console.log(boxen(message, { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' }))

  // 확률 출력
  console.log(chalk.magenta('확률 : ' + probability + ' %'))

  // 피드백 링크 출력
  const feedBackLink = 'https://forms.gle/qgPCjDMQiNLEPQ9fA'
  console.log('Feedback here → ' + chalk.blueBright.underline(feedBackLink) + '\n')
}

// 실행
recommendMenu()
