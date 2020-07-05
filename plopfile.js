const config = require('./default.config')
const helpers = require('./templates/helpers')

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
        validate: helpers.isNotEmpty,
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
          path: `${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.${reactExtension}`,
          templateFile: 'templates/components/component.hbs',
        },
        {
          type: 'add',
          path: `${componentsPath}{{ pascalCase name }}/index.${extension}`,
          templateFile: 'templates/components/index.hbs',
        },
      ]
      if (withStyles) {
        actions.push({
          type: 'add',
          path: `${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.styles.${extension}`,
          templateFile: 'templates/components/styles.hbs',
        })
      }
      if (withModels) {
        actions.push({
          type: 'add',
          path: `${componentsPath}/{{ pascalCase name }}/{{ pascalCase name }}.models.ts`,
          templateFile: 'templates/components/models.hbs',
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
        validate: helpers.isNotEmpty,
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
          path: `${path}/{{ camelCase name }}/{{ camelCase name }}.${extension}`,
          templateFile: 'templates/utils/util.hbs',
          data: { withTypescript },
        },
        {
          type: 'add',
          path: `${path}/{{ camelCase name }}/index.${extension}`,
          templateFile: 'templates/utils/index.hbs',
        },
      ]

      return actions
    },
  })
}
