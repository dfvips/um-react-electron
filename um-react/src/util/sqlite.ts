import * as initSqlite from 'sql.js';

const urlWasm = new URL('@nm/sql.js/dist/sql-wasm.wasm', import.meta.url).toString();

export type SQLStatic = Awaited<ReturnType<(typeof initSqlite)['default']>>;
export type SQLDatabase = SQLStatic['Database']['prototype'];

let sqlLoaderPromise: Promise<SQLStatic> | void;

export async function loadSQL() {
  if (!sqlLoaderPromise) {
    sqlLoaderPromise = initSqlite.default({ locateFile: () => urlWasm });
  }
  return await sqlLoaderPromise;
}
