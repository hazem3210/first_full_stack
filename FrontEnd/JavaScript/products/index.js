$(document).ready(function(){
	$("#nav").load("../../HTML/nav.html",function(){
		$("#products").addClass("active");
	});
	
	});
	
	function go(){
	let x= document.getElementById("products");
	x.classList.add("active");
	}
	