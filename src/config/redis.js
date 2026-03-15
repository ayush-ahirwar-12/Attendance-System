import config from "./environment.js"
import redis from "redis"

const {REDIS_HOST,REDIS_PORT,REDIS_PASSWORD} = config;

const cacheClient = redis.createClient({
    password:REDIS_PASSWORD,
    socket:{
        host:REDIS_HOST,
        port:REDIS_PORT
    }
})

cacheClient.on("error",(err)=>{
    console.error("Redis connection error:",err.message);

})

cacheClient.on("connect",()=>{
    console.log("Redis connected successfully");

})

export async function connectRedis(){
    try {
        await cacheClient.connect();
    } catch (error) {
            console.error("Redis connection error:",error.message);
            process.exit(1);

    };
};

export const redisClient = cacheClient;

