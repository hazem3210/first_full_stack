$(document).ready(function(){
$("#nav").load("../HTML/nav.html",function(){
    go();
});

});

function go(){
let x= document.getElementById("home");
x.classList.add("active");
}

