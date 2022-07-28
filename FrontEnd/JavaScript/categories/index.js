	async function go(){
	let x= document.getElementById("categories");
	x.classList.add("active");
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
        xhttp.open("GET","../../HTML/nav.html",false);
        xhttp.send();
    }

	function catDelete(id){
        if(confirm("Are you Sure about Deleting this Category?"))
        {
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
				document.getElementById("items").innerHTML="";
                getCategories();          
                return true;
            }
        }
        xhttp.open("DELETE","https://localhost:44333/api/Categories/Delete/"+id);
        xhttp.send();
    }
    }
	

	onload=async function(){
		loadNav();
		getCategories();
	}

	function getCategories(){
		var xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange=function(){

			if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
			{
			var items=this.response;
			 loadItems(items);
			}
			else if(this.readyState == 4 && this.status >= 400 && this.status < 500 || this==null || this==undefined )
			{
				 nodata();
			}
		}
		xhttp.onerror=function(){
			 nodata();
		}
		xhttp.ontimeout=function(){
			nodata();
		}
		 xhttp.open("GET","https://localhost:44333/api/Categories/GetAll");
		 xhttp.timeout=1000;
		 xhttp.send();
	}

	async function nodata(){
		var div= document.createElement("div");
		div.classList.add("no_data");
		div.innerText="No data to display.";
		var body= document.getElementById("data");
		body.innerHTML="";
		body.appendChild(div);

	}
	

	async function loadItems(n){
		var cat=await JSON.parse(n);
		var body=document.getElementById("items");

		if(cat.length>0)
		{
			for(let i=0;i<cat.length;i++)
			{
				var row=document.createElement("tr");

				var name=document.createElement("td");
				name.innerText=cat[i].name;

				var links=document.createElement("td");

				var edit=document.createElement("a");
				edit.setAttribute("href","update.html?id="+cat[i].id);
				edit.innerText="Edit";
				links.appendChild(edit);
				links.innerHTML+=" | ";

				var details=document.createElement("a");
				details.setAttribute("href","details.html?id="+cat[i].id);
				details.innerText="Details";
				links.appendChild(details);
				links.innerHTML+=" | ";

				var delet=document.createElement("a");
				delet.setAttribute("href","#"+cat[i].id);
				delet.setAttribute("onclick","catDelete("+cat[i].id+");")
				delet.innerText="Delete";
				links.appendChild(delet);

				row.appendChild(name);
				row.appendChild(links);			
				body.appendChild(row);
			}
			return true;
	}
	nodata();
	return false;
	}