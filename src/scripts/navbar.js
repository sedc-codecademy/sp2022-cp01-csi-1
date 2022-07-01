let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let logInBtn = document.querySelector(".bx-user-circle");
let homeBtn =  document.querySelector(" bx-home-circle");
let statisticBtn = document.querySelector("bx-line-chart");
// let simulatorBtn = doument.querySelector("bx-pie-chart-alt-2");
let infoBtn = document.querySelector("bx-help-circle");
let sidebarById = document.getElementById("#sidebars");




closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function
  
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function
});
logInBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();


} )


// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

$('#login-page').hide();
$('#statistics-page').hide();
$('#simulator-page').hide();
$('#info-page').hide();

$(document).on('click', '#view_homepage', function() {
  $('#login-page').hide();
  $('#statistics-page').hide();
  $('#simulator-page').hide();
  $('#info-page').hide();

  $('#home-page').show();
});
$(document).on('click', '#view_statistic', function() {
  $('#login-page').hide();
  $('#simulator-page').hide();
  $('#info-page').hide();
  $('#home-page').hide();

  $('#statistics-page').show();
});
$(document).on('click', '#view_simulator', function() {
  $('#login-page').hide();
  $('#statistics-page').hide();
  $('#info-page').hide();
  $('#home-page').hide();

  $('#simulator-page').show();
});
$(document).on('click', '#view_info', function() {
  $('#login-page').hide();
  $('#statistics-page').hide();
  $('#simulator-page').hide();
  $('#home-page').hide();

  $('#info-page').show();
});

$(document).on('click', '#view_login', function() {
  $('#login-page').show();
  $('#statistics-page').hide();
  $('#simulator-page').hide();
  $('#info-page').hide();
  $('#home-page').hide();
});