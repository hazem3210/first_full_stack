
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

    onload=async function(){
        getCategories();
        loadNav();
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
                id:0,
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
            xhttp.open("POST","https://localhost:44333/api/Products/Create");
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