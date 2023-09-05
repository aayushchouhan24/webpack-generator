# Generate-Webpack Readme

Generate-Webpack is an npm package that allows you to quickly create a fully-fledged webpack project template with ease. This tool streamlines the process of setting up a webpack-based project by automating the configuration and setup steps. Whether you're starting a new web development project or want to prototype an idea, Generate-Webpack gets you up and running with a functional webpack setup in no time.

## Installation

To use Generate-Webpack, you need to have Node.js and npm (Node Package Manager) installed on your system. If you don't have them, you can download and install them from the [official Node.js website](https://nodejs.org/).

Once you have Node.js and npm installed, you can install Generate-Webpack globally using the following command:

```bash
npm install -g generate-webpack
```

## Usage

Generating a webpack project using Generate-Webpack is simple. After installing the package globally, you can use the following command to create a new webpack project:

```bash
generate-webpack projectname
```

Replace `projectname` with the desired name of your project. This command will create a directory named `projectname` in the current location and set up a complete webpack project structure inside it.

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

### Core Templates List

- three : Full three.js template via webpack with all needed things.
- three-basic : Basic three.js template with only essential things.
- three-shader : Basic three.js template with custom shaders {vertex and fragment}.

You can use the following command to generate with core template.

```bash
generate-webpack projectname --core=yourcoretemplate
```

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

---

Start your webpack-powered project quickly and efficiently with Generate-Webpack. Say goodbye to manual setup and hello to streamlined development!

---
