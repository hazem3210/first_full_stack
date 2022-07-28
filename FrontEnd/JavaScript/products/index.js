	async function go(){
	let x= document.getElementById("products");
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

	function prodDelete(id){
        if(confirm("Are you Sure about Deleting this Product?"))
        {
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
				document.getElementById("items").innerHTML="";
                getProducts();          
                return true;
            }
        }
        xhttp.open("DELETE","https://localhost:44333/api/Categories/Delete/"+id);
        xhttp.send();
    }
    }
	

	onload=async function(){
		loadNav();
		getProducts();
	}

	function getProducts(){
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
		 xhttp.open("GET","https://localhost:44333/api/Products/GetAll");
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
		var prod=await JSON.parse(n);
		var body=document.getElementById("items");
		if(prod.length>0)
		{
			for(let i=0;i<prod.length;i++)
			{
				var row=document.createElement("tr");

				var name=document.createElement("td");
				name.innerText=prod[i].name;

				var price=document.createElement("td");
				price.innerText=prod[i].price;

				var qty=document.createElement("td");
				qty.innerText=prod[i].qty;

				var categoriesList=document.createElement("td");
				var list=document.createElement("ul");
				for(let j=0;j<prod[i].categories.length;j++)
				{
					var item=document.createElement("li");
					item.innerText=prod[i].categories[j].category.name;
					list.appendChild(item);
				}
				categoriesList.appendChild(list);
				

				var links=document.createElement("td");

				var edit=document.createElement("a");
				edit.setAttribute("href","update.html?id="+prod[i].id);
				edit.innerText="Edit";
				links.appendChild(edit);
				links.innerHTML+=" | ";

				var details=document.createElement("a");
				details.setAttribute("href","details.html?id="+prod[i].id);
				details.innerText="Details";
				links.appendChild(details);
				links.innerHTML+=" | ";

				var delet=document.createElement("a");
				delet.setAttribute("href","#"+prod[i].id);
				delet.setAttribute("onclick","prodDelete("+prod[i].id+");")
				delet.innerText="Delete";
				links.appendChild(delet);

				row.appendChild(name);
				row.appendChild(price);
				row.appendChild(qty);
				row.appendChild(categoriesList);
				row.appendChild(links);			
				body.appendChild(row);
			}
			return true;
	}
	nodata();
	return false;
	}