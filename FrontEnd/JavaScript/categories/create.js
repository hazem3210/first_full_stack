$(document).ready(function(){
	$("#nav").load("../../HTML/nav.html",function(){
		 go();
	});
	
	});
	var done=0;
	async function go(){
	let x= document.getElementById("categories");
	x.classList.add("active");
	}

    function check(){
        var inputs=document.getElementsByTagName("input");
        for(let i=0;i<inputs.length;i++)
        {
            if(inputs[i].value.trim()==false)
            {
                inputs[i].classList.add("invaild");
                var span=inputs[i].nextElementSibling;
                span.classList.add("empty");
                span.textContent="*";
                return false;
            }
        }
        return true;
    }

    function submit(){
        if(check())
        {
            var cat={
                id:0,
                name:document.forms[0].name.value,
                desc:document.forms[0].desc.value,
                products:null
            }
            var post=JSON.stringify(cat);
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function(){

                if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
                {
                console.log("great");
                return true;
                }
                else if(this.readyState == 4 && this.status >= 400 && this.status < 500 || this==null || this==undefined )
                {
                    console.log(post);
                    return false;
                }
            }
            xhttp.onerror=function(){
                console.log("bad2");
                return false;

           }
           xhttp.ontimeout=function(){
            console.log("bad3");
            return false;

           }
            xhttp.open("POST","https://localhost:44333/api/Categories/Create");
            xhttp.timeout=1000;
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(post);
            
        }
    }