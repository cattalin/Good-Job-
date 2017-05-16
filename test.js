function foreach(arr,callback)
{
    for(int i =0;i<arr.length;i++)
    {
        callback(arr[i],i);
        }
 }

var x = "String test";
x = x.split(" ");
foreach(x,(e,i)=>{
    alert(e + ":" + i);
    });
