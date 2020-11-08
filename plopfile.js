#!/usr/bin/env node
const isModule = !!process.argv[2]
const rootPath = isModule ? '..' : '.'
const projectPath = isModule ? process.argv[5] : '.'
const defaultConfig = require(`${rootPath}/default.config`)

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
    withTypescript,
    jsx,
    withStyles,
    withModels,
    utilsPath,
  } = config
  const extension = withTypescript ? 'ts' : 'js'
  const reactExtension = `${extension}${jsx ? 'x' : ''}`

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
      const actions = [
        {
          type: 'add',
          path: `${projectPath}/${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.${reactExtension}`,
          templateFile: `${rootPath}/templates/components/component.hbs`,
        },
        {
          type: 'add',
          path: `${projectPath}/${componentsPath}/{{ pascalCase name }}/index.${extension}`,
          templateFile: `${rootPath}/templates/components/index.hbs`,
        },
      ]
      if (withStyles) {
        actions.push({
          type: 'add',
          path: `${projectPath}/${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.styles.${extension}`,
          templateFile: `${rootPath}/templates/components/styles.hbs`,
        })
      }
      if (withModels) {
        actions.push({
          type: 'add',
          path: `${projectPath}/${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.models.ts`,
          templateFile: `${rootPath}/templates/components/models.hbs`,
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
      const actions = [
        {
          type: 'add',
          path: `${rootPath}/${path}/{{ camelCase name }}/{{ camelCase name }}.${extension}`,
          templateFile: `${rootPath}/templates/utils/util.hbs`,
          data: { withTypescript },
        },
        {
          type: 'add',
          path: `${rootPath}/${path}/{{ camelCase name }}/index.${extension}`,
          templateFile: `${rootPath}/templates/utils/index.hbs`,
        },
      ]

      return actions
    },
  })
}
