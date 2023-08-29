import { getFileName } from './pathHelper';
import { SQLDatabase, SQLStatic, loadSQL } from './sqlite';

export interface QMAndroidKeyEntry {
  name: string;
  ekey: string;
}

export class DatabaseKeyExtractor {
  private static _instance: DatabaseKeyExtractor;

  static async getInstance() {
    if (!DatabaseKeyExtractor._instance) {
      DatabaseKeyExtractor._instance = new DatabaseKeyExtractor(await loadSQL());
    }
    return DatabaseKeyExtractor._instance;
  }

  constructor(private SQL: SQLStatic) {}

  private hasTable(db: SQLDatabase, name: string): boolean {
    const tables = db.exec('SELECT name FROM sqlite_master WHERE type="table"')[0].values.map((x) => x[0]);
    return tables.includes(name);
  }

  extractQmAndroidDbKeys(buffer: ArrayBuffer): null | QMAndroidKeyEntry[] {
    let db: SQLDatabase | null = null;

    try {
      db = new this.SQL.Database(new Uint8Array(buffer));
      if (!this.hasTable(db, 'audio_file_ekey_table')) {
        return null;
      }

      const result = db.exec('select file_path, ekey from audio_file_ekey_table');
      if (result.length === 0) {
        return [];
      }

      const keys = result[0].values;
      return keys.map(([path, ekey]) => ({
        // strip dir name
        name: getFileName(String(path)),
        ekey: String(ekey),
      }));
    } finally {
      db?.close();
    }
  }
}
