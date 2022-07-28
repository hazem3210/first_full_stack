    var changeitem=document;
    var Category;


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
        var query=this.location.search.substring(1);
        var id=query.split('=')[1];
        Get(id);
    }

    function catDelete(){
        if(confirm("Are you Sure about Deleting this Category?"))
        {
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
                location.assign("index.html");                
                return true;
            }
        }
        xhttp.open("DELETE","https://localhost:44333/api/Categories/Delete/"+Category.id);
        xhttp.send();
    }
    }

    function setData(){
        
        var form=document.forms[0];
        form.id.value=Category.id;
        form.name.value=Category.name;
        form.desc.value=Category.desc;
    }

    function noData(){
        var div= document.createElement("div");
		div.classList.add("no_data");
		div.innerText="This Category is Not Found";
        var form= document.getElementById("my_form");
        document.removeChild(form);
        var head=document.getElementById("header");
        head.innerHTML=div.innerHTML;
        head.outerHTML=div.outerHTML;
    }

    function Get(id){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
                {
                    Category=JSON.parse(this.response);
                    setData();
                    return true;
                }
                if(this.readyState == 4 && this.status >= 400 && this.status < 500 || this==null || this==undefined)
                {
                    noData();
                    return false;
                }
        }

        xhttp.onerror=function(){
            noData();
            return false;
       }

       xhttp.ontimeout=function(){
            noData();
            return false;
       }

       xhttp.open("GET","https://localhost:44333/api/Categories/Get/"+id);
       xhttp.timeout=1000;
       xhttp.send();

    }
    
    changeitem.onchange=function(){
        if(changeitem.value.trim()!="")
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
                id:document.forms[0].id.value,
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
               if(this.readyState == 4 && this.status >= 400 && this.status < 500 || this==null || this==undefined )
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
            xhttp.open("PUT","https://localhost:44333/api/Categories/Edit/"+cat.id);
            xhttp.timeout=1000;
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(post);
            
        }
        return false;

    }