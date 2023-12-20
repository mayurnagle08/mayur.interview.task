require("./mongoDB");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;

class Server {
  constructor() {
    this.app = express();
    this.setup();
  }

  setup = () => {
    this.app.use(express.json({ limit: "10mb" }));
    this.app.options("*", cors());
    this.app.use(cors());
    const routes = require("../routes/mainroute");
    this.app.use("/", routes);
    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist.' });
    });
    
  };

  run = () => {
    this.server = this.app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  };
}

module.exports = Server;
