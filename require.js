// define 声明模块 通过require使用一个模块
let factories = {};
function define(moduleName, dependencies, factory) {
  factories[moduleName] = factory;
  factories[moduleName].dependencies = dependencies;
}

function require(mods, callback) {
  let result = mods.map(function(mod) {
    let factory = factories[mod];
    let exports;
    let dependencies = factory.dependencies;
    if (dependencies) { // 依赖存在的情况
      require(dependencies, function() {
        exports = factory.apply(null, arguments);
      })
    } else {
      exports = factory();
    }
    return exports;
  });
  callback.call(null, ...result);
}


define('name', [], function() {
  return 'hello js';
})

define('age', ['name'], function(name) {
  return name + 9;
});

require(['age'], function(age) {
  console.log(age);
})
