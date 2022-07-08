let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

let logInBtn = document.querySelector(".bx-user-circle");
let homeBtn =  document.querySelector(" bx-home-circle");
let statisticBtn = document.querySelector("bx-line-chart");
// let simulatorBtn = doument.querySelector("bx-pie-chart-alt-2");
let infoBtn = document.querySelector("bx-help-circle");
let sidebarById = document.getElementById("#sidebars");

//Profile elements
let profileElement = document.getElementById("profile");
let welcomeElement = document.getElementById("welcome");
let nameElement = document.getElementById("nameOfUser");
let logOutBtn = document.getElementById('log_out');
logOutBtn.style.visibility = 'hidden';


//localStorage Data needed for creating profile
let name = localStorage.getItem('name');
let emailForLogIn = localStorage.getItem('email');






closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function
  
});


logInBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();


} )



//Profile Code
if(name != null && name != ''){
  welcomeElement.innerHTML = 'Welcome  : ';
  nameElement.innerHTML = name;
  logOutBtn.style.visibility = 'visible';
  $('#main-login-element').hide();
}


//LogOut of progile code
logOutBtn.addEventListener('click', function(){
  welcomeElement.innerHTML = '';
  nameElement.innerHTML = '';
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  let localStoragewalletLength = localStorage.getItem("cryptoWalletOfUser");
  let oneUserCryptoWallet =JSON.parse(localStorage.getItem("cryptoWalletOfUser"));
  console.log(oneUserCryptoWallet);
  // let cryptoWalletValueUsers = JSON.parse(localStorage.getItem("cryptoWalletsOfMultipleUsers")) || [];
  // cryptoWalletValueUsers.push({oneUserCryptoWallet});
  // localStorage.setItem('cryptoWalletsOfMultipleUsers"',JSON.stringify(cryptoWalletValueUsers));
  localStorage.removeItem("coinsDb");
  logOutBtn.style.visibility = 'hidden';
  $('#main-login-element').show();
})





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