'use strict';  // always start with this 

var valid1=true;
var valid2=true;

document.getElementById("option1").style.display = "none";
document.getElementById("option2").style.display = "none";
document.getElementById('log1').style.display='none';
document.getElementById('log2').style.display='none';
document.getElementById('unit').readOnly=true;


var ActOpt = document.getElementById("Act");
var ActOpt2 =document.getElementById('Act2');
ActOpt.addEventListener("change", UnitChange);

//var va=document.getElementById('value').value;
 //=document.getElementById('unit').value;


var n=new Date();
var m = ("0" + (n.getMonth() + 1)).slice(-2);
var d = ("0" + n.getDate()).slice(-2);
var t=n.getFullYear()+"-"+m+"-"+d;
document.getElementById('datePicker2').value = t;
document.getElementById('datePicker').value = t; 


/* code that will run after DOM is built */
const PassBtn = document.getElementById("PassBtn");
PassBtn.addEventListener("click", buttonAction);

const NewBtn = document.getElementById("NewBtn");
NewBtn.addEventListener("click", buttonAction2);

const SubmitBtn=document.getElementById("submit");
SubmitBtn.addEventListener('click', check1);
SubmitBtn.addEventListener('click', SubmitLog);

const SubmitBtn2=document.getElementById("submit2");
SubmitBtn2.addEventListener('click', check2);
SubmitBtn2.addEventListener('click', SubmitLog2);

//const act = document.getElementById("Act");
//act.addEventListener('mousemove',changeColor);

//document.getElementById('bd').style.display='none';

function UnitChange() {
  var unit = document.getElementById("unit");
  switch (ActOpt.value) {
    case 'yoga':
    case 'soccer':
    case 'basketball':
      unit.value = 'minutes';
      break;
    case 'bike':
    case 'run':
    case 'walk':
      unit.value = 'kilometers';
      break;
    case 'swim':
      unit.value = 'laps';
      break;

  }
}
function buttonAction() {
  PassBtn.style.display = "none";
  let textAreaVar = document.getElementById("option1");
  textAreaVar.style.display = "";
  let logGone=document.getElementById('log1');
  logGone.style.display='none';
}

function buttonAction2() {
  NewBtn.style.display = "none";
  let textAreaVar = document.getElementById("option2");
  textAreaVar.style.display = "";
  let logGone=document.getElementById('log2');
  logGone.style.display='none';
}

function SubmitLog(){
  if(valid1==true){
    var va=document.getElementById('value').value;
    var Ut=document.getElementById('unit').value;
    var Dt=document.getElementById('datePicker').value;
   
    var acti1=ActOpt.options[ActOpt.selectedIndex].text;
    
    let textAreaVar = document.getElementById("option1");
    textAreaVar.style.display = "none";
    PassBtn.style.display = "";
    let logInfo=document.getElementById('log1');
    logInfo.style.display='';
    let bold=document.getElementById('bd');
    bold.textContent=' '+ActOpt.options[ActOpt.selectedIndex].text+' '+'for'+' '+va+' '+Ut+'.\xa0';
    //logInfo.textContent+=bold;
    document.getElementById('up').textContent='Keep it up!';

    let data={date:String(Dt),activity:String(acti1),scalar:String(va),units:String(Ut)};
     
    console.log("starting up");
   console.log(data);
    console.log("doing something");
    postData('/pass',data)
    .then(function (data) {
      console.log("got back the following string");
      //console.log(data); 
       
  })
    .catch(function (error) {
      console.error('Error:', error);
  });
  }
 
}

function SubmitLog2(){
  if(valid2==true){
    let textAreaVar = document.getElementById("option2");
    var Dt=document.getElementById('datePicker2').value;
    
    var DT=new Date((new Date(Dt).valueOf()+1000*3600*24));
    
    var tM = ("0" + (DT.getMonth() + 1)).slice(-2);
    var tD = ("0" +( DT.getDate())).slice(-2);
    
    var total=tM+'/'+tD+'/'+DT.getFullYear();
    textAreaVar.style.display = "none";
    NewBtn.style.display = "";
    let logInfo=document.getElementById('log2');
    logInfo.style.display='';
    let bold2=document.getElementById('bd2');

    var acti =ActOpt2.options[ActOpt2.selectedIndex].text;
    bold2.textContent=ActOpt2.options[ActOpt2.selectedIndex].text+' '+'on'+' '+total+'!';
  
    //let data= [String(Dt), String(acti)];
    let data={ date:String(Dt),activity:String(acti)};
   console.log("starting up");
   console.log(data);
    console.log("doing something");
    postData('/future',data)
    .then(function (data) {
      console.log("got back the following string");
      console.log(data); 
       
  })
  
    .catch(function (error) {
      console.error('Error:', error);
  });

  /*var httpRequest=new XMLHttpRequest();
  httpRequest.open("POST", '/Futureplan',true);
  httpRequest.setRequestHeader("Content-type", "application/json");
  httpRequest.send(JSON.stringify(obj));
    
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var json = httpRequest.responseText;
        console.log(json);
    }
  };*/
    
      
  }
}


function check1(){
  var dateValid=true;
  var va=document.getElementById('value').value;
  var Ut=document.getElementById('unit').value;
  var dat=document.getElementById('datePicker').value;
  var dat1=new Date((new Date(dat).valueOf()+1000*3600*24));
  var current=new Date();
  if(dat1>current){
    dateValid=false;
  }
 

  
  var ActOpt=document.getElementById('Act');
  if(ActOpt.value==''||va==''||Ut==''||dateValid==false){
    valid1=false;
    alert("invalid Pass Activity, please fill in entire form");
  }
  else{
    valid1=true;
  }
}

function check2(){
  var Dt2=document.getElementById('datePicker2').value;
  var dt22=new Date((new Date(Dt2).valueOf()+1000*3600*24));
  var com2=new Date();
  dt22.setHours(0,0,0);
  com2.setHours(0,0,0);
  var dateValid2=true;
  console.log('dt22'+dt22);
  console.log('com2'+com2);
  if(+dt22>+com2){
    console.log('larger');
    dateValid2=true;
  }
  else{
    console.log('<=');
    dateValid2=false;
    if(dt22.getDate()==com2.getDate()& dt22.getMonth()==com2.getMonth()&dt22.getFullYear()==com2.getFullYear()){
      console.log('equal');
      dateValid2=true;
    }
  }
  var ActOpt2 =document.getElementById('Act2');
  if(ActOpt2.value==''||dateValid2==false){
    valid2=false;
    alert("invalid Future Plans, please fill in entire form");
  }
  else{
    valid2=true;
  }

}




//console.log("hello, world!");

async function postData(url,data) {
  console.log("about to send post request");
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data });
  return response.text();
}

// takes a url and data to send as inputs
// returns a promise


