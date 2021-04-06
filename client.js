const WebSocket = require("ws");

const wsUrl = "ws:localhost:3011";
const maximalWsInstances = 300;
const timeInSec = 3;

const wss = [];

const sendUpdateLocation = (ws) => {
    setInterval(() => {
        ws.send("update location");
    }, 3000);
};

const startSocket = (ws) => {
    ws.ws.on("open", function open() {
        const date = new Date();
        ws.ws.send("client-" + ws.id + " delay: |" + date.getTime());
        sendUpdateLocation(ws.ws);
    });

    ws.ws.on("message", function incoming(data) {
        const date = new Date();
        const splittedData = data.split("|");
        if (splittedData.length > 1) {
            // console.log(parseInt(splittedData[1]));
            console.log(
                splittedData[0] + (date.getTime() - parseInt(splittedData[1]))
            );
        } else {
            // console.log(data);
        }
    });
};

const createWsInstance = () => {
    wss.push({ ws: new WebSocket(wsUrl), id: wss.length });
    // console.log(ws.length);
    startSocket(wss[wss.length - 1]);
};

createWsInstance();

const interval = setInterval(() => {
    createWsInstance();
    if (wss.length > maximalWsInstances) {
        clearInterval(interval);
    }
}, timeInSec * Math.random() * 1000);
