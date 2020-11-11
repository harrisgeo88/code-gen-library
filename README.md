# Code Gen Library

Stop worrying about the small things. A quick and opinionated way of generating code for your React projects 🏗

<img src="./demo.gif" />

---

## Installation

```
npm install --save-dev code-gen-library
```


## Usage

```
npx generate
```

or if installed globabally

```
generate
```



Once executed, The following message should appear

```
? [PLOP] Please choose a generator. (Use arrow keys)
❯ Component - Generate a React component ⚛️
  Util - Generate a util function 🛠
```

## Default Options

### 1. React Components ⚛️

The CLI will ask you for the following information

Command | Description | Default value
-- | -- | -- | --
Component name? | The name of your React component |  
Do you want a separate file for styles? | If you want your styles to live outside the main component | ✅
Do you want a separate file for models | If you want your models to live outside the component of the folder | ✅


#### Example

If we choose the component name to be `input text` and everything else goes to default we end up with.
```
✔  ++ /path/to/your/repo/src/components/InputText/InputText.tsx
✔  ++ /path/to/your/repo/src/components/InputText/index.ts
✔  ++ /path/to/your/repo/src/components/InputText/InputText.styles.ts
✔  ++ /path/to/your/repo/src/components/InputText/InputText.models.ts
```

### 2. Utils 🛠

Command | Description | Default value
-- | -- | -- | --
Util name? | The name of your util function |  
What path shall we put it in? (src/utils) | The path in which the new folder is going to be added in | src/utils

If we choose the component name to be `date format` and everything else goes to default we end up with.


```
✔  ++ /path/to/your/repo/src/utils/dateFormat/dateFormat.ts
✔  ++ /path/to/your/repo/src/utils/dateFormat/index.ts
```

### Customising

Right now you might be wondering.

> What if I don't use TypeScript? What if I don't want to be asked every time if styles should be separate files? ...

All of these are very valid concerns and part of the reason why I decided to make this library. For those of you who want more customisation, a config file can be added with your preferences.

Create a `cgl.config.js` file on the root of your repo.

Here is some more information about what can be customised



### Customisation Options

Rule | Description | Default value
-- | -- | --
componentsPath | The path where the components will be put | src/components/
jsx | If the main component will be `.jsx` / `.tsx` or `.js` / `.ts` | true
withTypescript | All files will be generated with TypeScript `.ts` / `.tsx` format | true
withModels | Models to be separated from the main component. Models files will suffix with `.models.*`  | true
withStyles | Styles to be separated from the main component. Styles files will suffix with `.styles.*` | true
utilsPath | The default path for the utils | src/utils/

### More to come soon