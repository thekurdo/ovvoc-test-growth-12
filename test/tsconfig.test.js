const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

test('typescript is installed at v4', () => {
  const pkg = require('typescript/package.json');
  assert(pkg.version.startsWith('5.'));
});

test('tsconfig.json exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'tsconfig.json')));
});

test('tsconfig is valid JSON', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions);
});

test('tsconfig target is ES2020', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions.target === 'ES2020');
});

test('tsconfig has strict mode', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions.strict === true);
});

test('tsconfig has paths', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions.paths);
  assert(tsconfig.compilerOptions.paths['@/*']);
});

test('tsconfig has declaration', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions.declaration === true);
});

test('tsconfig has sourceMap', () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf8'));
  assert(tsconfig.compilerOptions.sourceMap === true);
});

test('source files exist', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'types.ts')));
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'utils.ts')));
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'index.ts')));
});

test('typescript compiles without errors', () => {
  const ts = require('typescript');
  const configPath = path.join(__dirname, '..', 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.join(__dirname, '..'));
  const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert(diagnostics.length === 0, `TypeScript errors: ${diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join(', ')}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
