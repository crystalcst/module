const fs = require('fs');

function req(modulName) {
  const content = fs.readFileSync(modulName, 'utf8');
  let fn = new Function('module.exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
  let module = {
    exports: {}
  };
  return fn(module.exports, module, req, __dirname, __filename);
}

const b = req('./a.js');

console.log(b);