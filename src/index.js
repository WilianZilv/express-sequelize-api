const http = require("http");
const express = require("express");

const app = express();
app.use(
    require("cors")({
        origin: "*",
    })
);
app.use(express.json());
require("./routes")(app);

const server = http.createServer(app);

const PORT = process.env.PORT || 80;
server.listen(PORT, () => console.log("Listening on port:", PORT));
