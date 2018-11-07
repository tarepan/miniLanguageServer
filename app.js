const cp = require("child_process");
const rpc = require("vscode-jsonrpc");

// const childProcess = cp.spawn("Node");
const childProcess = cp.spawn("Node", ["./server.js"]);

let connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(childProcess.stdout),
    new rpc.StreamMessageWriter(childProcess.stdin));

let notification = new rpc.NotificationType('babel');

connection.onNotification(notification, (param) => {
  console.log("-----------");
  console.log("After transform:");
  console.log(param);
});

connection.listen();


const code = `
console.log("hello");
const x = 1 + 2;
console.log(x);
`;
console.log("Before transform:");
console.log(code);
connection.sendNotification(notification, code);
