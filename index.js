const app = require(".app"); //express
const http = require("http");
const config = require("./utils/config").default;

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
