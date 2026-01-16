//=================
// Import
//=================
import fs from 'node:fs';
import path from 'node:path';
import LoadDirectory from '../fileLoader/LoadDirectory.mjs';

//=================
// Class
//=================
class FileParser {
  constructor(loadDirectory) {
    this.loadDirectory = loadDirectory;
  }

  printDirStructure() {
    const dirStructure = this.loadDirectory.getProjectStructure();
    console.log(dirStructure)
  }
}

export default FileParser;