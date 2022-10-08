// Credits: faint#1337

const chalk = require("chalk");

module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.green("[Database Status]: Connected."));
  },
};
