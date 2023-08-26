#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Presets, SingleBar } from "cli-progress";
import colors from 'ansi-colors';


const appName = process.argv[2] || "webpack-app";

const createApp = async () => {
  const appRoot = path.join(process.cwd(), appName);

  if (!fs.existsSync(appRoot)) {
    fs.mkdirSync(appRoot);
  }

  const packageJson = {
    name: appName,
    version: "1.0.0",
    description: "A Webpack App",
    main: "src/index.js",
    scripts: {
      start: "webpack-dev-server --open --mode development",
      build: "webpack --mode production",
    },
    devDependencies: {
      webpack: "^5.0.0",
      "webpack-cli": "^4.0.0",
      "webpack-dev-server": "^4.0.0",
    },
  };

  const packageJsonPath = path.join(appRoot, "package.json");
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

  const srcPath = path.join(appRoot, "src");
  fs.mkdirSync(srcPath);

  const indexContent = `import './styles.css'`;

  const indexFilePath = path.join(srcPath, "index.js");
  fs.writeFileSync(indexFilePath, indexContent);

  const publicPath = path.join(appRoot, "public");
  fs.mkdirSync(publicPath);

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Webpack App</title>
</head>
<body>
    <h1>Hello, Webpack</h1>
</body>
</html>
`;

  const htmlFilePath = path.join(srcPath, "index.html");
  fs.writeFileSync(htmlFilePath, htmlContent);

  const cssContent = `
* {box-sizing: border-box;}
html,
body {
    min-height: 100%;
    background: #fff;
    color: #000;
}

body {
    font-size: 1.4rem;
    text-rendering: optimizeLegibility;
}

body,ul,ol,dl {margin: 0;}

h1 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    margin: 0;
    padding: 0;
}
`;
  const cssFilePath = path.join(srcPath, "styles.css");
  fs.writeFileSync(cssFilePath, cssContent);

  const webpackConfig = `
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const TerserPlugin = require('terser-webpack-plugin');
    
    module.exports = {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
      },
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
      module: {
        rules: [
          {
            test: /\.(html)$/,
            use: ['html-loader'],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/images/[hash][ext]',
            },
          },
          {
            test: /\.(glsl|frag|vert)$/,
            use: ['raw-loader', 'glslify-loader'],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
      ],
      devServer: {
        static: path.resolve(__dirname, 'dist'), 
        port: 3000,
      },
    };`;

  const webpackConfigPath = path.join(appRoot, "webpack.config.js");
  fs.writeFileSync(webpackConfigPath, webpackConfig);

  const packagesToInstall = [
    "@babel/core",
    "@babel/preset-env",
    "babel-loader",
    "css-loader",
    "glslify-loader@",
    "html-loader",
    "html-webpack-plugin",
    "mini-css-extract-plugin",
    "raw-loader",
    "terser-webpack-plugin",
    "webpack",
    "webpack-cli",
    "webpack-dev-server",
  ];

  const progressBar = new SingleBar({
    format: colors.blueBright('Generating ') + colors.whiteBright('[') + colors.greenBright('{bar}') + colors.whiteBright('] ') + colors.greenBright('{percentage}%') + colors.whiteBright(' |') + colors.magentaBright(' Time Remaining: ') + colors.yellowBright('{eta}s'),
    hideCursor: true,
    clearOnComplete: true
  }, Presets.rect);

  try {
    let i = 0
    progressBar.start(packagesToInstall.length, 0, { eta: "N/A" });
    console.clear()
    for (const packageName of packagesToInstall) {
      if (i == 0) console.log(`${colors.blueBright('Generating')} ${colors.whiteBright('[                                        ]')} ${colors.greenBright('0%')} ${colors.whiteBright('|')} ${colors.magentaBright('Time Remaining:')} ${colors.yellowBright('N/A')}`)
      const command = `npm install ${packageName} --save-dev`;
      execSync(command, { cwd: appRoot });
      if (i == 0) console.clear()
      progressBar.increment();
      i++
    }
    progressBar.stop();
    console.clear()
    console.log(`${colors.blueBright(`

    ██╗    ██╗███████╗██████╗ ██████╗  █████╗  ██████╗██╗  ██╗ 
    ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝ 
    ██║ █╗ ██║█████╗  ██████╔╝██████╔╝███████║██║     █████╔╝  
    ██║███╗██║██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║     ██╔═██╗  
    ╚███╔███╔╝███████╗██████╔╝██║     ██║  ██║╚██████╗██║  ██╗ 
     ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 
`)}
Created "${colors.greenBright(appName)}" ${colors.blueBright('Webpack')} app.\n`);
  } catch (error) {
    progressBar.stop();
    console.error("An error occurred:", error);
  }
};
createApp();
