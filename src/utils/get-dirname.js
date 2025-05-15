import path from 'path';
import { fileURLToPath } from 'url';
const userPath = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export {
  __dirname as dirname,
  path,
  userPath
}
