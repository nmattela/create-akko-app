#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');


const appName = process.argv[2];
const path = `${process.cwd()}/${appName}`;

execSync(`mkdir ${appName}`);
execSync(`npm init -y`, {cwd: path});
execSync(`npm install --save-dev @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/preset-env babel-loader babel-plugin-include babel-plugin-transform-jsx webpack webpack-cli webpack-dev-server css-loader html-loader html-webpack-plugin style-loader akko-js`, {cwd: path});

const pkg = JSON.parse(fs.readFileSync(`${path}/package.json`));
pkg.scripts = {
    "build": "webpack",
    "test": "webpack-dev-server"
};
fs.writeFileSync(`${path}/package.json`, JSON.stringify(pkg, undefined, 2));

function writeFiles(rootPath, extension) {
    const contents = fs.readdirSync(`${rootPath}${extension}`);
    contents.forEach(content => {
        if(fs.lstatSync(`${rootPath}${extension}${content}`).isDirectory()) {
            fs.mkdirSync(`${path}/${extension}${content}`);
            writeFiles(rootPath, `${extension}${content}/`);
        } else {
            fs.writeFileSync(`${path}/${extension}${content}`, fs.readFileSync(`${rootPath}${extension}${content}`, 'utf8'))
        }
    })
}

writeFiles(`./files/`, '');
