var eventproxy = require('eventproxy');
function red(){
console.log("red");
}
function yellow(){
console.log('yellow');
}
function green(){
console.log('green');
}

function light(){
var proxy = new eventproxy();
proxy.all('red',function(){
red();
proxy.emit('yellow');
});


proxy.all('yellow',function(){
yellow();
proxy.emit('green');
});

proxy.all('green',function(){
green();
light();
});
proxy.emit('red');

}

light();
