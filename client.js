const WebSocket = require("ws");

// const wsUrl = "ws:ec2-54-227-213-250.compute-1.amazonaws.com:3011";
const wsUrl = "ws:localhost:3011";
const maximalWsInstances = 10;
const timeInSec = 0.01;

const wss = [];

createWsInstance();

const interval = setInterval(() => {
    createWsInstance();
    if (wss.length > maximalWsInstances) {
        clearInterval(interval);
    }
}, timeInSec * Math.random() * 1000);

function sendUpdateLocation(ws) {
    setInterval(() => {
        ws.send("update location");
    }, 3000);
}

function startSocket(ws) {
    ws.ws.on("open", function open() {
        const date = new Date();
        ws.ws.send("client-" + ws.id + " delay: |" + date.getTime());
        sendUpdateLocation(ws.ws);
    });

    ws.ws.on("message", function incoming(data) {
        const date = new Date();
        const splittedData = data.split("|");
        if (splittedData.length > 1) {
            // console.log(
            //     splittedData[0] + (date.getTime() - parseInt(splittedData[1]))
            // );
        } else {
            // console.log(data);
        }
    });
}

function createWsInstance() {
    wss.push({ ws: new WebSocket(wsUrl), id: wss.length });
    startSocket(wss[wss.length - 1]);
}
