var Promise = require("bluebird");
var _ = require("lodash");


exports.register = function (server, options, next) {
  Promise.promisifyAll(server);
  
  server.bind({config: options.config, server: server});
  
  server.method("previews.fetchLegacyPlunk", require("./methods/fetchLegacyPlunk"));
  server.method("previews.fetchProject", require("./methods/fetchProject"));
  
  server.route({ method: "GET", path: "/plunk/{plunkId}/{path*}", config: require("./routes/handleLegacyPlunk") });
  server.route({ method: "GET", path: "/project/{plunkId}/{path*}", config: require("./routes/handleProject") });
  
  next();
};


exports.register.attributes = {
  "name": "plunker-api-plugin-trees",
  "version": "0.0.1",
};

