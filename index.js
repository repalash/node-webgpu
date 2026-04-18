import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'module';
import { familySync, MUSL } from 'detect-libc';
const require = createRequire(import.meta.url);
export const isMac = process.platform === 'darwin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const arch = isMac ? 'universal' : process.arch;
const libcSuffix = (!isMac && familySync() === MUSL) ? '-musl' : '';
const dawnNodePath = join(__dirname, 'dist', `${process.platform}-${arch}${libcSuffix}.dawn.node`);
const { create, globals } = require(dawnNodePath);
export { create, globals }
