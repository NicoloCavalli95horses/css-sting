//=================
// Import
//=================
import fs from 'node:fs';
import path from 'node:path';
import { IGNORE_DIRS, IGNORE_JS } from './config.mjs';

//=================
// Class
//=================
class FileDiscovery {
  constructor(directoryFullPath) {
    this.directoryFullPath = directoryFullPath;
  }

  isFile(fileName) {
    return fs.lstatSync(fileName).isFile();
  }

  isDirectory(fullPath) {
    return fs.statSync(fullPath).isDirectory();
  }

  getFileExtension(filePath) {
    return path.extname(filePath);
  }

  readDirectory(path) {
    try {
      return fs.readdirSync(path);
    } catch (error) {
      if (error.code === 'EACCES') {
        console.warn('Ignored directory due to permissions:', path);
        return [];
      } else {
        throw err;
      }
    }
  }

  // Return paths of eligible files
  getFilePaths() {
    const filePaths = {};

    const analyzeDir = (currentPath) => {
      const entries = this.readDirectory(currentPath);

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);

        if (IGNORE_DIRS.includes(entry)) {
          // Exclude dependencies or other folders
          continue;
        }

        if (this.isDirectory(fullPath)) {
          // Recursively check internal folder
          analyzeDir(fullPath);
        } else if (this.isFile(fullPath)) {
          // File is detected
          const ext = this.getFileExtension(fullPath);
          const basename = path.basename(fullPath);

          if (IGNORE_JS.some(char => basename.endsWith(char))) {
            // Exclude config file, tests, etc
            continue;
          }

          // Extract files to be studied
          switch (ext) {
            case '.mjs':
              filePaths.mjs ??= [];
              filePaths.mjs.push(fullPath);
              break;
            case '.js':
              filePaths.js ??= [];
              filePaths.js.push(fullPath);
              break;
            case '.ts':
              filePaths.ts ??= [];
              filePaths.ts.push(fullPath);
            case '.vue':
              filePaths.vue ??= [];
              filePaths.vue.push(fullPath);
            default:
              break;
          }
        }
      }
    }

    analyzeDir(this.directoryFullPath);
    return filePaths;
  }

  init() {
    return this.getFilePaths();
  }
}


export default FileDiscovery;