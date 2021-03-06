#!/usr/bin/env node
const program = require('commander');
const getCliOptions = require('../lib/utils/getCliOptions');
const Context = require('../lib/core/Context');
const log = require('../lib/utils/log');

program
  .option('--config <config>', 'use custom config')
  .option('--analyzer', '开启构建分析')
  .option('--analyzer-port', '设置分析端口号')
  .option('--skip-compile', 'skip webpack compile, excute hooks for component compile')
  .parse(process.argv);

(async () => {
  process.env.NODE_ENV = 'production';
  const cliOptions = getCliOptions(program);
  try {
    await new Context({
      command: 'build',
      args: cliOptions,
    }).run();
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
})();
