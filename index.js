#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

const appName = process.argv[2];
const path = `${process.cwd()}/${appName}`;

console.log(`Fetching latest template...`);
execSync(`git clone https://github.com/nmattela/akko-js-framework.git ${appName}`);
console.log(`Modifying package.json...`);
const pkg = JSON.parse(fs.readFileSync(`${path}/package.json`));
pkg.name = appName;
fs.writeFileSync(`${path}/package.json`, JSON.stringify(pkg, undefined, 2));
console.log(`Installing modules...`);
execSync(`npm install`, {cwd: path});
console.log(`Done! Your app is available in ${path}/${appName}. Use npm run test to start up a development server.`);
