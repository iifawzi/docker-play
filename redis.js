import redis from "redis"
const redisPort = 6379
const client = redis.createClient(redisPort, "redis");

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
});


export default client;