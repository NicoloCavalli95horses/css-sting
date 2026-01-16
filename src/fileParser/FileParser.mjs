//=================
// Import
//=================
import fs from 'node:fs';
import path from 'node:path';
import LoadDirectory from '../fileLoader/LoadDirectory.mjs';
import { parse } from '@vue/compiler-dom';
import parser from '@babel/parser';
import { fileTemplate, projectTemplate } from './config.mjs';


//=================
// Class
//=================
class FileParser {
  constructor(LoadDirectory) {
    this.loadDirectory = LoadDirectory;
    this.filesToParse = this.loadDirectory.init();
  }

  project = projectTemplate;
  file = fileTemplate;

  parseJS(input) {
    try {
      return parser.parse(input, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx']
      });
    } catch (err) {
      if (['import', 'export'].includes(err.message)) {
        throw err;
      }

      return parser.parse(input, {
        sourceType: 'script',
        plugins: ['typescript', 'jsx']
      });
    }
  }

  init() {

    for (const filePath of this.filesToParse?.js) {
      // Generate AST of current file
      const ast = this.parseJS(filePath);

      // Set properties of the analyzed file
      project.files.set(filePath, {
        path: filePath,
        ast: ast,
        // ...
        // to complete with info from config.mjs
      });
    }
  }
}

export default FileParser;