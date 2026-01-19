//===================
// Import
//===================

//===================
// Const
//===================
export const irTemplate = {
  // Contains each file of the project, with AST and dependency graph
  files: new Map(),

  // Map of dependencies between files. Where is this file used?
  importGraph: new Map(),
  // {
  //  '/a.js' → ['/b.js'], // 'a.js' import 'b.js'
  //  '/b.js' → []         // 'b.js' does not import anything
  // }
};

// IR (Intermediate Representation) of the project (AST + dependence tree)
// Each file is normalized into an uniform representation
export const fileTemplate = {
  // Absolute path
  path: '', // '/abs/path/to/file.ts',

  // File extension
  extension: '', // 'js' | 'vue' | 'ts',

  // Full AST of the file
  ast: '', // BabelAST | VueAST,

  // Meta information
  meta: {
    sourceType: '', // 'module' | 'script',
    isVueSetup: false, //boolean, // <script setup> syntax
  },

  // What does exist in [this] file
  symbols: {
    imports: [], // import foo from ./utils' (what is imported in this file)
    exports: [], // export function foo (what is exported in this file)
    locals: [],  // function f(), const a (what is declared in this file)
  },

  // Sensitive APIs (array of objects describing the target functions)
  sinks: [],

  // Sensitive entry points (array of objects describing the target functions)
  sources: [],

  // Where the file does flow 
  bindings: new Map(), // identifier → nodes
}

