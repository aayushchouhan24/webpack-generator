# Generate Webpack - _Your Webpack Wizard!_

![Generate-Webpack Logo](https://cdn.jsdelivr.net/gh/aayushchouhan24/webpack-generator@master/logo-banner.png)

## Installation

Global Install

```bash
npm install -g generate-webpack
```

With npx

```bash
npx generate-webpack
```

OR

```bash
npx gwp
```

## Usage

```bash
generate-webpack projectname -options
```

OR

```bash
gwp projectname -options
```

#### Options

| Key        | Short | Options                                                                                                                                                                   | Description                         |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `--core= ` | `-c`  | webpack, three, three-basic, three-shader/three-shaders, three-master. For info click <a style =" color:#008CFF;  padding: 2px ; " href="#core-templates" >here.</a> | Select Core Template.               |
| `--nopkg`  | `-n`  | none                                                                                                                                                                      | Stop npm package auto installation. |

## What's Included

Generate-Webpack sets up a comprehensive webpack project template that includes:

- A basic project structure with directories for source code, assets, and build output.
- An initial `index.html` file along with associated assets.
- Webpack configuration files for development and production environments.
- Babel configuration for modern JavaScript support.
- Loaders and plugins for handling CSS, images, and other assets.
- Dev server setup for easy development and testing.
- Sample entry and module files to help you get started.

## Different Core Template Generation

Generate-Webpack have different templates for different requirements to choose your core template.

### Core Templates

| Core           | Description                                                                             |
| -------------- | --------------------------------------------------------------------------------------- |
| `three`        | Full three.js template via webpack with all needed things.                              |
| `three-basic`  | Basic three.js template with only essential things.                                     |
| `three-shader` | Basic three.js template with custom shaders {vertex and fragment}.                      |
| `three-master` | Master three.js template with custom shaders ,model,glass material,postprocessing ,etc. |

## Customization

While Generate-Webpack provides a solid starting point for webpack projects, you're encouraged to customize it to fit your specific project requirements. You can modify the webpack configuration files, add or remove loaders and plugins, and organize your source code according to your preferences.

## Contributing

If you encounter any issues, have suggestions for improvements, or would like to contribute to the development of Generate-Webpack, feel free to open issues and pull requests on the [GitHub repository](https://github.com/aayushchouhan24/generate-webpack).

## Creator

Generate-Webpack was created by [Aayush Chouhan](https://github.com/aayushchouhan24).

## License

Generate-Webpack is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, you can reach us at <aayushchouhan24@gmail.com>.