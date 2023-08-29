#!/usr/bin/env node
/* eslint-env node */

import fs from 'fs';

const data = JSON.parse(fs.readFileSync(0, 'utf-8').trim());

let value = data;
for (let i = 2; i < process.argv.length; i++) {
  value = value[process.argv[i]] ?? null;
}
process.stdout.write(String(value), 'utf-8');
