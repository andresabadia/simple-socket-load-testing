const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3011 });

console.log("starting server on port 3011");

function noop() {}

function heartbeat() {
    // console.log("is getting pong in here");
    this.isAlive = true;
}

wss.on("connection", (ws) => {
    // console.log("connection stablished", wss.clients);
    let clientLength = 0;
    ws.isAlive = true;
    ws.on("pong", heartbeat);
    wss.clients.forEach(() => {
        clientLength++;
    });
    ws.send("clients: " + clientLength);

    ws.on("message", (message) => {
        const date1 = new Date();
        wss.clients.forEach((client) => {
            client.send(message);
        });
        const date2 = new Date();
        // console.log("delta: " + (date2 - date1));
    });
});

const interval = setInterval(function ping() {
    console.log("ping them all");
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            console.log("Terminate that MFCK");
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 30000);

wss.on("close", function close() {
    console.log("close");
    clearInterval(interval);
});
