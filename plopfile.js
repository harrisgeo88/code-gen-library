#!/usr/bin/env node
const isModule = !!process.argv[2]
const rootPath = isModule ? '..' : '.'
const projectPath = isModule ? process.argv[5] : '.'
const defaultConfig = require(`${rootPath}/default.config`)
const printLogo = require('./logo')

let config
try {
  config = require(`${projectPath}/cgl.config`)
} catch(err) {
  console.log("no custom config... switching to default")
  config = defaultConfig
}

function isNotEmpty(input) {
  let res = true
  if (!input || input === '') {
    res = 'Please provide a name'
  }
  if (input.length < 2) {
    res = 'Please provide a longer name'
  }
  return res
}

module.exports = function (plop) {
  const {
    componentsPath,
    jsx,
    utilsPath,
    withModels,
    withStyles,
    withTests,
    withTypescript,
  } = config
  const extension = withTypescript ? 'ts' : 'js'
  const reactExtension = `${extension}${jsx ? 'x' : ''}`
  const type = 'add'

  printLogo()
  plop.setGenerator('Component', {
    description: 'Generate a React component ⚛️',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
        validate: isNotEmpty,
      },
      {
        when: withStyles,
        type: 'confirm',
        name: 'withStyles',
        message: 'Do you want a separate file for styles?',
      },
      {
        when: withTypescript && withModels,
        type: 'confirm',
        name: 'withModels',
        message: 'Do you want a separate file for models?',
      },
    ],
    actions: function ({ withStyles, withModels }) {
      const pathToFolder = `${projectPath}/${componentsPath}/{{ pascalCase name }}`
      const pathToTemplate = `${rootPath}/templates/components`

      const actions = [
        {
          type,
          path: `${pathToFolder}/{{ pascalCase name }}.${reactExtension}`,
          templateFile: `${pathToTemplate}/component.hbs`,
        },
        {
          type,
          path: `${pathToFolder}/index.${extension}`,
          templateFile: `${pathToTemplate}/index.hbs`,
        },
      ]
      if (withStyles) {
        actions.push({
          type,
          path: `${pathToFolder}/{{ pascalCase name }}.styles.${extension}`,
          templateFile: `${pathToTemplate}/styles.hbs`,
        })
      }
      if (withModels) {
        actions.push({
          type,
          path: `${pathToFolder}/{{ pascalCase name }}.models.ts`,
          templateFile: `${pathToTemplate}/models.hbs`,
        })
      }
      if (withTests) {
        actions.push({
          type,
          path: `${pathToFolder}/{{ pascalCase name }}.test.ts`,
          templateFile: `${pathToTemplate}/test.hbs`,
        })
      }

      return actions
    },
  })
  plop.setGenerator('Util', {
    description: 'Generate a util function 🛠',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Util name?',
        validate: isNotEmpty,
      },
      {
        type: 'input',
        name: 'path',
        message: 'What path shall we put it in?',
        default: utilsPath || 'src/utils',
      },
    ],
    actions: function ({ path }) {
      const pathToFolder = `${projectPath}/${path}/{{ camelCase name }}`
      const pathToTemplate = `${rootPath}/templates/utils`

      const actions = [
        {
          type,
          path: `${pathToFolder}/{{ camelCase name }}.${extension}`,
          templateFile: `${pathToTemplate}/util.hbs`,
          data: { withTypescript },
        },
        {
          type,
          path: `${pathToFolder}/index.${extension}`,
          templateFile: `${pathToTemplate}/index.hbs`,
        },
      ]

      if (withTests) {
        actions.push({
          type,
          path: `${pathToFolder}/{{ camelCase name }}.test.${extension}`,
          templateFile: `${pathToTemplate}/test.hbs`,
        })
      }

      return actions
    },
  })
}
