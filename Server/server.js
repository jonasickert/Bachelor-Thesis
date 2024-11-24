const fs = require("fs");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:2000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

http.listen(1234, () => {
    console.log("Port 1234")
});

io.on("connection", (socket) => {
    console.log(`connected with ${socket.id}`)
    updateData(socket)
});

const dataset = fs.readFileSync("datasetcpumodified.csv",{encoding:"utf-8"}).split("\n");


index = 1;
console.log(dataset.length)
console.log(index)

function updateData(socket){
    if ( index <= dataset.length){
        socket.emit("dataupdate", dataset[this.index])
        index++
        setTimeout(()=> {
            updateData(socket)
        }, 1000)
    }
    else console.log("finished")

}