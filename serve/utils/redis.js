const resdis = require("redis");

client = resdis.createClient({
    host: "127.0.0.1",
    port: 6379
})

client.connect();

client.on("error", err => {
    console.log(err);
})

module.exports = client;