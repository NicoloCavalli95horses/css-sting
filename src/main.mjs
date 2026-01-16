//===================
// Import
//===================
import LoadDirectory from "./fileLoader/LoadDirectory.mjs";
import FileParser from "./fileParser/FileParser.mjs";

//===================
// Consts
//===================
const TARGET_PROJECT_PATH = '../../vue-css-target';
// const TARGET_PROJECT_PATH = '../../misskey';



//===================
// Pipeline
//===================
const project = new LoadDirectory(TARGET_PROJECT_PATH);
const parser = new FileParser(project);
parser.printDirStructure()
