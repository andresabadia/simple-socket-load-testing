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
        // console.log("received: %s", message);
        wss.clients.forEach((client) => {
            client.send(message);
        });
    });
});
