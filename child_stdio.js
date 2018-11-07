const cp = require("child_process");

const childProcess = cp.spawn("Node", ["./child.js"]);
childProcess.stdout.on("data", data => console.log(data.toString()));
