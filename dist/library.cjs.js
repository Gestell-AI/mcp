'use strict';

var terminal = require('@client/terminal');
var tool = require('@client/tool');
var mcp = require('@server/mcp');
var remote = require('@server/remote');
var terminal$1 = require('@server/terminal');
var types = require('@client/types');



exports.startTerminalClient = terminal;
exports.runTool = tool;
exports.buildMcpServer = mcp;
exports.startRemoteServer = remote;
exports.startTerminalSession = terminal$1;
Object.keys(types).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return types[k]; }
  });
});
//# sourceMappingURL=library.cjs.js.map
