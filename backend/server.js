const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=>{
    console.log(req.method, req.url);
    let filePath = "../frontend" + (req.url === "/" ? "/index.html" : req.url);

    const ext = path.extname(filePath);

    const types = {
        ".html":"text/html",
        ".css":"text/css",
        ".js":"application/javascript"
    };
    const contentType = types[ext] || "text/plain";

    fs.readFile(filePath, (err, data)=>{
        if(err){
            console.log(err);
            res.writeHead(404);
            res.end("Not Found!");
            return;
        }
        res.writeHead(200, {"Content-Type": contentType});
        res.end(data);
    });
});

let port = 5500;
server.listen(port, "localhost", ()=>{
    console.log("listening for requests on port 5500");
});