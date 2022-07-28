
onload=function(){
    loadNav();
}

function loadNav(){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
                document.getElementById("nav").innerHTML=this.responseText;
                go();
            }
        }
        xhttp.open("GET","../HTML/nav.html",false);
        xhttp.send();
    }


function go(){
let x= document.getElementById("home");
x.classList.add("active");
}

