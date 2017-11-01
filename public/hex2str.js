/**
 * Created by Administrator on 2017/11/1.
 */
var text = '545678ah';
text = text.trim();
function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr =
        trimedStr.substr(0,2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    var len = rawStr.length;
    if(len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for(var i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

var strarr=text.split('\n');
var arrlen = strarr.length;
var i = 0;
var out=[];
for(;i<arrlen;i++){
    var arr = strarr[i].split(' ');
    var rawstr='';
    var rawst='';
    if(arr.length>0){
        if(arr[0].substr(0,2).toLowerCase() === '0x'){
            rawstr=arr[0];
            rawst = arr.join('');
        }else{
            rawst = arr.join('');
        }

    }
    rawst = hexCharCodeToStr(rawst);
    if(rawstr===''){
        out.push(rawst+'\n');
    }else{
        out.push(rawstr+' '+rawst+'\n');
    }
}
console.log(out.join(''));
