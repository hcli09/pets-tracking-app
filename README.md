# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Basic Setup

Under the project root folder, run the following command to install the dependencies:

`npm i` or `yarn install`

Use the following command to start the development environment

`npm run dev`

## Troubleshooting

### node-sass

You would be likely to run into the issue of installing `node-sass` if your node version is 15+. Because the project uses `node-sass` at 4.14.1 which is supported by node 14, you might want to do the following to get `node-sass` installed.

  1. Remove the line `"node-sass": "^4.14.1",` on `package.json`.
  2. On Terminal, run the command `npm i node-sass@6`.

You should be able to boot up the project.
