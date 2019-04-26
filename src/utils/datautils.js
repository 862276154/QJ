
//时间格式化
export function format(fmt, data) { //author: meizz
    var o = {
        "Y+": data.getFullYear(),
        "M+": data.getMonth() + 1, //月份 
        "d+": data.getDate(), //日 
        "h+": data.getHours(), //小时 
        "m+": data.getMinutes(), //分 
        "s+": data.getSeconds(), //秒 
        "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
        "S": data.getMilliseconds(),//毫秒 ,
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//年月日
export function datePaseNYR(text) {
    var d = new Date(text);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

export function store(text) {
    var d = new Date(text);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}


//带天数的倒计时
export function countDown(times) {
    var timer = null;
    timer = setInterval(function () {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0;//时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //
    
        times--;
        return (day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒");
    }, 1000);
    if (times <= 0) {
        clearInterval(timer);
    }
}
//时分秒
export function datePaseSS(text) {
    var d = new Date(text);
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}


export function floot(num) {
    return num.div(Math.floor(num.mul(Number(num), 100)), 100) + "";
}

export function times(a,b) {
    var date1 = a;  //开始时间
    var date2 =b;    //结束时间
    var date3 = date1 - date2  //时间差的毫秒数
    // var config= console.log(date3)


    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))


    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)


   return(days + "天" + hours + "时" + minutes + "分" + seconds + "秒")
}
export function daojishi(a) {
 
    var date3 = a  //时间差的毫秒数
    // var config= console.log(date3)


    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))


    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)


   return     (days + "天" + hours + "时" + minutes + "分" + seconds + "秒")
}


//用法：
//let xxx= dataUtils.format("MM-dd hh:mm",new Date(this.data.dynamic_time))









