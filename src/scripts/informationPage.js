var x = $(".content");
var y = $(".information-text");
$(document).ready(function(){
  $(".bi").click(function(){
    x.slideToggle();
    
  });
  

});
let btnToTop = document.getElementById("back-to-the-top-btn");

btnToTop.addEventListener("click", function(){
 document.body.scrollIntoView();
});