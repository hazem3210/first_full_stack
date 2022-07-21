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
        document.getElementById("name").innerText=Category.name;
        document.getElementById("desc").innerText=Category.desc;
        document.getElementsByClassName("edit")[0].setAttribute("href","update.html?id="+Category.id);
    }

    function noData(){
        var div= document.createElement("div");
		div.classList.add("no_data");
		div.innerText="This Category is Not Found";
        var form= document.getElementById("data");
        document.removeChild(form);
        var head=document.getElementById("header");
        head.innerHTML=div.innerHTML;
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
    


