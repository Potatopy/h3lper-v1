// Credits: faint#1337

const chalk = require("chalk");

module.exports = {
  name: "connecting",
  async execute() {
    console.log(chalk.cyan("[Database Status]: Connecting..."));
  },
};
