var Product=null;
var notValid=[];
var Categories=[];


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
	let x= document.getElementById("products");
	x.classList.add("active");
	}

    onload=function(){
        loadNav();
        getCategories();
        var query=this.location.search.substring(1);
        var id=query.split('=')[1];
        Get(id);
    }

    async function getCategories(){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
                addCategories(this.response);
            }
        }
        xhttp.open("GET","https://localhost:44333/api/Categories/GetAll");
        xhttp.timeout=1000;
        xhttp.send();
    }

    async function addCategories(obj){
        var cats=await JSON.parse(obj);
        var select=document.forms[0].categories;
        for(let i=0;i<cats.length;i++)
        {
            var cat=document.createElement("option");
            cat.innerText=cats[i].name;
            cat.value=cats[i].id;
            select.appendChild(cat);
        }
    }

    function ProdDelete(){
        if(confirm("Are you Sure about Deleting this Product?"))
        {
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
            {
                location.assign("index.html");                
                return true;
            }
        }
        xhttp.open("DELETE","https://localhost:44333/api/Products/Delete/"+Product.id);
        xhttp.send();
    }
    }

    function setData(){
        
        var form=document.forms[0];
        form.id.value=Product.id;
        form.name.value=Product.name;
        form.price.value=Product.price;
        form.qty.value=Product.qty;
        form.desc.value=Product.desc;
        for(let i=0;i<form.categories.options.length;i++)
        {
            if(Categories.findIndex(item=>item==form.categories.options[i].value)!=-1)
            {
                form.categories.options[i].selected=true;
            }
        }
    }

    function noData(){
        var div= document.createElement("div");
		div.classList.add("no_data");
		div.innerText="This Product is Not Found";
        var form= document.getElementById("my_form");
        form.innerHTML="";
        var head=document.getElementById("header");
        head.innerHTML=div.innerHTML;
        head.outerHTML=div.outerHTML;
    }

     function Get(id){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState == 4 && this.status >= 200 && this.status < 300 )
                {
                    Product= JSON.parse(this.response);
                    for(let i=0;i<Product.categories.length;i++)
                    Categories.push(Product.categories[i].categoryID);
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

       xhttp.open("GET","https://localhost:44333/api/Products/Get/"+id);
       xhttp.timeout=1000;
       xhttp.send();

    }
    

    function change(x){
        if(x.value.trim()!="" && x)
        {
        x.classList.remove("invaild");
        var span=x.nextElementSibling;
        span.classList.remove("empty");
        span.textContent="";
        
        return true;
        }
    }

    function check(x){
       
        var input=x;
        let y=notValid.findIndex(inp => inp == input);
            if(input.value.trim()=="" && input.name!="categories")
            {
                input.classList.add("invaild");
                var span=input.nextElementSibling;
                span.classList.add("empty");
                span.textContent="*";
                
                if(y<0)
                {
                    notValid.push(input);
                }
                return false;
            }
            else if(!checkName(input))
            {
                if(y<0)
                {
                    notValid.push(input);
                }
                return false;
            }
        change(x);
        notValid=notValid.filter(item=>item!==x);
        return true;
    }

    function checkName(x){
        var name=x.getAttribute("name");
        if(name=="price")
        {
            if(x.value<500)
            {
                x.classList.add("invaild");
                var span=x.nextElementSibling;
                span.classList.add("empty");
                span.textContent="The Price must be higher than 500";
                return false;
            }
        }
        else if(name=="qty")
        {
            if(x.value<0)
            {
                x.classList.add("invaild");
                var span=x.nextElementSibling;
                span.classList.add("empty");
                span.textContent="The Quntaty must be higher than 0";
                return false;
            } 
        }
        else if(name=="categories")
        {
            if(Categories.length==0)
            {
                var span=x.nextElementSibling;
                span.classList.add("empty");
                span.textContent="You must choose at least 1 Category";
                return false;   
            }
        }
        return true;
    }

    function checkAll(){
        var inputs=document.getElementsByTagName("input");
        for(let i=0;i<inputs.length-1;i++)
        {
            check(inputs[i]);
        }
        var select=document.getElementsByTagName("select")[0];
        check(select);
    }

    function validate(){
        checkAll();
        if(notValid.length==0 && Categories.length>0)
        {
            var product={
                product:{
                id:document.forms[0].id.value,
                name:document.forms[0].name.value,
                price:document.forms[0].price.value,
                qty:document.forms[0].qty.value,
                desc:document.forms[0].desc.value,
                categories:null
            },
            categories:Categories
            }
            var post=JSON.stringify(product);
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
            xhttp.open("PUT","https://localhost:44333/api/Products/Edit/"+product.product.id);
            xhttp.timeout=1000;
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(post);
            
        }
        return false;

    }

    function addArray(){
        Categories=[];
        var select=document.getElementsByName("categories")[0];
        for(let i=0;i<select.options.length;i++)
        {
            if(select.options[i].selected)
            {
                Categories.push(select.options[i].value);
            }
        }
    }