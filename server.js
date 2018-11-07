const rpc = require("vscode-jsonrpc");
const babel = require("@babel/core");

let connection = rpc.createMessageConnection(
  new rpc.StreamMessageReader(process.stdin),
  new rpc.StreamMessageWriter(process.stdout));

const plugin = ({types: t}) => ({
  visitor: {
    BinaryExpression: nodePath => {
      if(nodePath.node.operator === "+"){
        const newAST = t.binaryExpression("*", nodePath.node.left, nodePath.node.right);
        nodePath.replaceWith(newAST);
      }
    }
  }
});
let notification = new rpc.NotificationType('babel');
connection.onNotification(notification, (param) => {
  const modified = babel.transformSync(param, {plugins: [plugin]}).code;
  connection.sendNotification(notification, modified);
});

connection.listen();
