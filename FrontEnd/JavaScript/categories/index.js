$(document).ready(function(){
	$("#nav").load("../../HTML/nav.html",function(){
		 go();
	});
	
	});
	
	async function go(){
	let x= document.getElementById("categories");
	x.classList.add("active");
	}
	


	onload=async function(){
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

		for(let i=0;i<cat.length;i++)
		{
			var row=document.createElement("tr");
			var name=document.createElement("td");
			name.innerText=cat[i].name;
			row.appendChild(name);
			body.appendChild(row);
		}
	}