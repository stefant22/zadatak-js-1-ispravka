

var izabraniOdgovori = [];
var pogodjeniOdgovori = [];
var promaseniOdgovori = [];
var tacno = [];
var ponudjene = [];
var filter = [];
var vreme=5;
var mixNiz=[];
var posto;




var sacuvaniPogodjeni=localStorage.getItem("pogodjeniOdgovori").split(",");
var sacuvaniPromaseni=localStorage.getItem("promaseniOdgovori").split(",");
var sacuvaniIzabrani=localStorage.getItem("izabraniOdgovori").split(",");
var  sacuvaniTacno= JSON.parse(localStorage.getItem("tacno"));
console.log(sacuvaniTacno);
console.log(sacuvaniPogodjeni);
console.log(sacuvaniPromaseni);
console.log(sacuvaniIzabrani);






function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'podaci.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    console.log(izabraniOdgovori);
    
    loadJSON(function (response) {
    
       podaci = JSON.parse(response);
        tacno = podaci.tacno;
       localStorage.setItem("tacno",JSON.stringify(tacno));
        ponudjene = podaci.ponudjene;
        vreme = podaci.vreme;
        pogodjeni=podaci.pogodjeniOdgovori;

        console.log(podaci);
        console.log(tacno);
        console.log(ponudjene);
        var ul = document.getElementById("lista");
        var text =document.getElementById("grad");
        var unetText=document.getElementById("grad").value;
        console.log(unetText);
           
            for (var i = 0; i < ponudjene.length; i++) {

                var li = document.createElement("li");
                li.className = "list-group-item";

                li.appendChild(document.createTextNode(ponudjene[i]));
                ul.appendChild(li);
                li.style = "cursor:pointer;";
                
            }
           
        ul.style = " height:200px;overflow:hidden; overflow-y:scroll;";







    });

    var ul = document.getElementById('lista');
    ul.addEventListener("click", set_ua_value, false);

    function set_ua_value(e) {
        if (e.target.nodeName == "LI") {

            document.getElementById("grad").value = e.target.innerHTML;


        }

    }

    var interval= setInterval(odbrojavanje, 1000);
    
    function odbrojavanje() {
       
        if (vreme != 0) {

            document.getElementById("vreme").innerHTML = "Preostalo vreme: " + vreme;
            vreme--;
        } else {
            console.log("ok");
            clearInterval(interval);
          kraj();
         
          document.getElementById("vreme").innerHTML = "Vreme je isteklo";
          document.getElementById("grad").disabled=true;
          document.getElementById("kraj").disabled=true;
          document.getElementById("dodaj").disabled=true;
        }

    }
   
   



}

function dodaj() {
    
   
    var ul = document.getElementById("odgovori")

    var dodatGrad = document.getElementById("grad").value;
    var li = document.createElement("li");
    li.className = "odgovor list-group-item";

    li.onclick = obrisi;
    li.appendChild(document.createTextNode(dodatGrad));
    document.getElementById("odgovori").appendChild(li);
    izabraniOdgovori.push(li.innerHTML);
    console.log(izabraniOdgovori);
    document.getElementById("grad").value='';
    


}







function obrisi(e) {

    e.target.parentElement.removeChild(e.target);

}


function kraj() {

    for (var i = 0; i < tacno.length; i++) {
        for (var j = 0; j < izabraniOdgovori.length; j++) {
            if (izabraniOdgovori[j] === tacno[i]) {
                pogodjeniOdgovori.push(tacno[i]);
                mixNiz = izabraniOdgovori.concat(pogodjeniOdgovori);
                console.log(pogodjeniOdgovori);

            }




        }
        


    }if(pogodjeniOdgovori.length<1){
        promaseniOdgovori.push(izabraniOdgovori);
    }
  
    for (var i = 0; i < mixNiz.length; i++) {
        if (izabraniOdgovori.indexOf(mixNiz[i]) == -1 || pogodjeniOdgovori.indexOf(mixNiz[i]) == -1) {
          
            promaseniOdgovori.push(mixNiz[i]);
            console.log(promaseniOdgovori);
        }

    }
    podaci.pogodjeniOdgovori=pogodjeniOdgovori;
    podaci.promaseniOdgovori=promaseniOdgovori;
    podaci.izabraniOdgovori=izabraniOdgovori;
    
   vreme=-1;
   
    localStorage.setItem("pogodjeniOdgovori",pogodjeniOdgovori);
    localStorage.setItem("promaseniOdgovori",promaseniOdgovori);
    localStorage.setItem("izabraniOdgovori",izabraniOdgovori);

    

    //window.close("index.html");
    window.open("index2.html");
    document.getElementById("vreme").innerHTML = "Vreme je isteklo";
          document.getElementById("grad").disabled=true;
          document.getElementById("kraj").disabled=true;
          document.getElementById("dodaj").disabled=true;
          


}

function fitler(){
    
    var input=document.getElementById("grad");
    var filter=input.value.toUpperCase();
    var ul=document.getElementById("lista");
    var li=ul.getElementsByTagName("li");
    for(var i=0;i<li.length;i++){
       
        if(li[i].innerHTML.toUpperCase().indexOf(filter)>-1){
            li[i].style.display="";
        }else{
            li[i].style.display="none";
        }
    }
}



function stranaDva(){
    var ul = document.getElementById("tacno");
    
       
        for (var i = 0; i < sacuvaniTacno.length; i++) {

            var li = document.createElement("li");
            li.className = "list-group-item";

            li.appendChild(document.createTextNode(sacuvaniTacno[i]));
            ul.appendChild(li);
            li.style = "cursor:pointer;";
            
        }
        var ul=document.getElementById("pogodjeni");
        
        for (var i = 0; i < sacuvaniPogodjeni.length; i++) {
        

            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-success";

            li.appendChild(document.createTextNode(sacuvaniPogodjeni[i]));
            ul.appendChild(li);
            li.style = "cursor:pointer; margin=0;";
            
            
        }
   
        var ul=document.getElementById("promaseni");

        
        for (var i = 0; i < sacuvaniPromaseni.length; i++) {
           

            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-danger";

            li.appendChild(document.createTextNode(sacuvaniPromaseni[i]));
            ul.appendChild(li);
            li.style = "cursor:pointer;";
            
            
        }

        if(sacuvaniPogodjeni[0]!=""){
            posto=sacuvaniPogodjeni.length/sacuvaniIzabrani.length*100;
        }else{
            posto=0;
        }
      
    var progress=document.getElementById("progress");
    progress.value=posto;
    progress.innerHTML=posto;
    
    }











