//===================
// Import
//===================
import LoadDirectory from "./fileDiscovery/FileDiscovery.mjs";
import FileParser from "./fileParser/FileParser.mjs";
import SourceLoader from "./sourceLoader/SourceLoader.mjs";

//===================
// Consts
//===================
const TARGET_PROJECT_PATH = '../tests/importTest';
// const TARGET_PROJECT_PATH = '../../vue-css-target';
// const TARGET_PROJECT_PATH = '../../misskey';



//===================
// Pipeline
//===================
const filePaths = new LoadDirectory(TARGET_PROJECT_PATH);
const src = new SourceLoader(filePaths);
const parser = new FileParser(src);
parser.init()