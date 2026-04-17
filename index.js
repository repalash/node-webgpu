import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
export const isMac = process.platform === 'darwin';

// Detect musl libc on Linux (e.g. Alpine). On glibc, process.report's
// glibcVersionRuntime is a version string like "2.31"; on musl it's empty.
function isMusl() {
  if (process.platform !== 'linux') return false;
  try {
    const report = process.report?.getReport();
    const glibc = report?.header?.glibcVersionRuntime;
    return glibc === '' || glibc == null;
  } catch {
    return false;
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const arch = isMac ? 'universal' : process.arch;
const libcSuffix = (!isMac && isMusl()) ? '-musl' : '';
const dawnNodePath = join(__dirname, 'dist', `${process.platform}-${arch}${libcSuffix}.dawn.node`);
const { create, globals } = require(dawnNodePath);
export { create, globals }
