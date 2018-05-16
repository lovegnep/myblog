/**
 * Created by Administrator on 2017/11/5.
 */
var redis = require('redis');
var client = redis.createClient();
client.on("error", function (err) {
    console.log("statics Error " + err);
});
client.on('ready', function(){
    console.log('redis client connect to server success.');
});
module.exports = client;
