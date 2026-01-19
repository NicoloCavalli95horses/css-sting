//=================
// Import
//=================
import { fileTemplate, irTemplate } from './config.mjs';
import parser from "@babel/parser";
import traverse from "@babel/traverse";

//=================
// Class
//=================
class FileParser {
  constructor(sourceLoader) {
    this.sourceLoader = sourceLoader;
    this.filesToParse = this.sourceLoader.init();
  }

  ir = irTemplate;
  file = fileTemplate;

  setParseConfig(fileType) {
    // Default for .js and .mjs files
    const defaultConfig = { sourceType: 'module', plugins: [] };

    switch (fileType) {
      case 'ts':
        return { ...defaultConfig, plugins: ['jsx', 'flow', 'typescript'] };
      case 'vue':
        // specific case, @vue/compiler-dom required
        return {
          sourceType: 'module',
          plugins: [],
        }
      default:
        return defaultConfig;
    }
  }

  babelAST(code, config) {
    return parser.parse(code, config);
  }

  getFileImports(ast) {
    const imports = [];
    traverse.default(ast, {
      ImportDeclaration(path) {
        const source = path.node.source.value; // file name

        imports.push({
          // many more details may be needed @TODO
          source,
          specifiers: path.node.specifiers.map(s => s.local.name)
        });
      },
    });

    return imports;
  }

  parseFiles() {
    for (const [fileType, paths] of Object.entries(this.filesToParse)) {
      // Config parser
      const parseConfig = this.setParseConfig(fileType);

      if (['vue', '.vue'].includes(fileType)) {
        // @TODO handle vue files
        continue;
      }

      // The following will handle [.js, .mjs, .ts] files
      for (const [path, code] of Object.entries(paths)) {
        // Generate AST of current file
        const ast = this.babelAST(code, parseConfig);

        // Set properties of the analyzed file
        this.ir.files.set(path, {
          path: path,
          ast: ast,
          extension: fileType,
          meta: {
            isVueSetup: false
          },
          symbols: {
            imports: this.getFileImports(ast),
            exports: [], // export function foo (what is exported in this file)
            locals: [],  // function f(), const a (what is declared in this file)
          },
          // Sensitive APIs (array of objects describing the target functions)
          sinks: [],
          // Sensitive entry points (array of objects describing the target functions)
          sources: [],
          // Where the file does flow 
          bindings: new Map(),
        });
      }
    }


    // console.log("intermediate representation: ", this.ir)
  }

  init() {
    return this.parseFiles();
  }
}

export default FileParser;