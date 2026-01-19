//=================
// Import
//=================
import fs from 'node:fs';
import { sourceTemplate } from './config.mjs';


//=================
// Class
//=================
class SourceLoader {
  constructor(fileDiscovery) {
    this.fileDiscovery = fileDiscovery;
    this.filePaths = this.fileDiscovery.init();
  }

  readFile(filePath, format = 'utf8') {
    try {
      return fs.readFileSync(filePath, format);
    } catch (error) {
      console.log(`Error reading file at: ${filePath}. Error: ${error}`)
    }
  }

  loadSource() {
    const source = sourceTemplate;

    for (const [fileType, paths] of Object.entries(this.filePaths)) {
      source[fileType] ??= {};

      for (const path of paths) {
        const code = this.readFile(path);
        source[fileType][path] = code;
      }
    }

    return source;
  }

  init() {
    return this.loadSource();
  }
}


export default SourceLoader;