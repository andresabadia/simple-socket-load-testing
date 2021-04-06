const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3011 });

console.log("starting server on port 3011");

wss.on("connection", (ws) => {
    // console.log("connection stablished", wss.clients);
    let clientLength = 0;
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
        console.log("delta: " + (date2 - date1));
    });
});
