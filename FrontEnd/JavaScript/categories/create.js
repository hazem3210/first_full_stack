

    var change=false;
    var changeitem=document;

    function loadNav(){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
                document.getElementById("nav").innerHTML=this.responseText;
                go();
            }
        }
        xhttp.open("GET","../../HTML/nav.html",false);
        xhttp.send();
    }

	function go(){
	let x= document.getElementById("categories");
	x.classList.add("active");
	}

    onload=function(){

        loadNav();
    }
    
    changeitem.onchange=function(){
        if(changeitem.value.trim()!="" && change)
        {
        changeitem.classList.remove("invaild");
        var span=changeitem.nextElementSibling;
        span.classList.remove("empty");
        span.textContent="";
        return true;
        }
        return check();
    }

    function check(){
       change=true;
        var inputs=document.getElementsByTagName("input");
        for(let i=0;i<inputs.length;i++)
        {
            if(inputs[i].value.trim()==false)
            {
                changeitem=inputs[i];
                inputs[i].classList.add("invaild");
                var span=inputs[i].nextElementSibling;
                span.classList.add("empty");
                span.textContent="*";
                return false;
            }
        }
        return true;
    }

    function validate(){
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
                location.assign("index.html");                
                return true;
                }
                else if(this.readyState == 4 && this.status >= 400 && this.status < 500 || this==null || this==undefined )
                {
                    return false;
                }
            }
            xhttp.onerror=function(){
                return false;

           }
           xhttp.ontimeout=function(){
            return false;

           }
            xhttp.open("POST","https://localhost:44333/api/Categories/Create");
            xhttp.timeout=1000;
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(post);
            
        }
        return false;

    }