//=================
// Import
//=================
import fs from 'node:fs';
import path from 'node:path';
import { IGNORE_DIRS, IGNORE_JS } from './config.mjs';

//=================
// Class
//=================
class LoadDirectory {
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

  // Return folder structure
  getProjectStructure() {
    const projectStructure = {
      js: [],
      vue: [],
    };

    const analyzeDir = (currentPath) => {
      const entries = this.readDirectory(currentPath);

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);

        // Exclude dependencies or other folders
        if (IGNORE_DIRS.includes(entry)) { continue; }

        if (this.isDirectory(fullPath)) {
          // Recursively check internal folder
          analyzeDir(fullPath);
        } else if (this.isFile(fullPath)) {
          // File is detected
          const ext = this.getFileExtension(fullPath);
          const basename = path.basename(fullPath);
          // Exclude config file, tests, etc
          if (IGNORE_JS.some(char => basename.endsWith(char))) { continue; }
          // Extract files to be studied
          if (['.js', '.ts'].includes(ext)) {
            projectStructure.js.push(fullPath);
          } else if (ext === '.vue') {
            projectStructure.vue.push(fullPath);
          }
        }
      }
    }

    analyzeDir(this.directoryFullPath);
    return projectStructure;
  }
}

export default LoadDirectory;