document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);

// SignUp and SignIn Reusable code
let username = document.getElementsByClassName("form_control")
let form = document.getElementById("form");
let usernameInput = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordCheck = document.getElementById("password-check");
let submitButton = document.getElementById('sub');
let signInEmail = document.getElementById('emailSignIn');
let signInPassword = document.getElementById('passwordSignIn');
let signInButton =  document.getElementById('signInButton');


//Labels and Messages
let labels = document.getElementsByClassName('form_control');
let small = document.getElementsByClassName('small');

//Sign up Form

function SignUp(name,emails,pass,confirmPass){

	let checkName = ValidateUsername(name);
	let checkEmail = validateEmail(emails);
	let checkPassword = validatePassword(pass);
	let checkIfPassMatching = checkIfPasswordAreMatching(pass,confirmPass);
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
	if(!formData.some(data => data.name === name)){
			
    if(checkIfPassMatching == true && checkName == true && checkEmail == true && checkPassword == true){
		formData.push({name,emails,pass})
		localStorage.setItem('formData',JSON.stringify(formData));
		document.querySelector('#form').reset();
		alert('Account created');
		location.reload();
}

}
	else{
		alert('There is already user with this username');
	    form.reset();
		resetClass(labels);
	    }

}

//SignIn Form

function SignIn(email,password){
	let formData = JSON.parse(localStorage.getItem('formData')) || [];
    
	if(formData.some(data => data.emails == email && data.pass == password)){
		let logInButtonDissapear = document.getElementById("main-login-element");
		console.log(logInButtonDissapear);
		// alert("Success");
		let current_user=formData.filter((v)=>{return v.emails==email && v.pass==password})[0];
		console.log(current_user);
		localStorage.setItem('name',current_user.name);
		localStorage.setItem('email',current_user.emails);
		window.location.href= "index.html";
		
	}
	else{
		alert('There is no such user');

	}
	
}

//Checking inputs 

//Check if username is valid
function ValidateUsername(username){
	let isValid = false;
 if(username == ''){
 setErrorFor(labels,small,0,'This can not be blank');
   isValid  = false;
}
else {
   setSuccessFor(labels,small,0);
   isValid = true;
}
 return isValid;
}
//Check if email is valid
function validateEmail(email){
	let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	let isValid = false;
	let indexForSmall = 1;
 if(email == ''){
		setErrorFor(labels,small,indexForSmall,'This can not be blank');
		isValid = false;
	}
 else if(!email.match(validRegex)){
       setErrorFor(labels,small,indexForSmall,'Invalid email adress ');
	   isValid = false;
 }
 else{
		setSuccessFor(labels,small,indexForSmall);
		isValid = true;
	}
  return isValid;
}

//Check if password is valid
function validatePassword(password){
	let lowerCaseLetters = /[a-z]/g;
	let upperCaseLetters = /[A-Z]/g;
	let numbers = /[0-9]/g;
	let isValid = false;
	let indexForSmall = 2;
   let passwordLength = password.length;
	if(password == '' ){
    setErrorFor(labels,small,indexForSmall,'This can not be blank');
	 isValid = false;
	 
	}
	

    else if(passwordLength < 6 || passwordLength > 20){
			setErrorFor(labels,small,indexForSmall,'Your password should be between 6-20 characters');
			isValid =  false;
	
		}
	else  if
	     (!password.match(lowerCaseLetters) || !password.match(upperCaseLetters) || !password.match(numbers)){	
			setErrorFor(labels,small,indexForSmall,'Your password should contain at least one uppercase ,lowercase and number');
			isValid = false;
		 }
	else{
			isValid = true;
			setSuccessFor(labels,small,indexForSmall);
			}
	   
	   return isValid; 
	}
  


function checkIfPasswordAreMatching (pass,confirmPass){
	let areMatching = false;
	let indexForSmallPass = 2;
	let indexForSmallCheck = 3;
	if(pass === confirmPass){
      areMatching = true;
	  setSuccessFor(labels,small,indexForSmallCheck);

	}
	else{
		setErrorFor(labels,small,indexForSmallPass,'Your passwords are not matching');
		setErrorFor(labels,small,indexForSmallCheck,'Your passwords are not matching');

		areMatching = false;
	}
	return areMatching;
}

function setErrorFor(parentElement,element,index,message){

	element[index].innerHTML = message;
    parentElement[index].classList = 'form_control error';

}
function setSuccessFor(parentElement,element,index){
    element[index].innerHTML = '';
	parentElement[index].classList = 'form_control success';
}
//Reset Class on Labels
function resetClass(labels){
	let i = 0; 
	for(i; i < labels.length; i++){
		console.log(labels[i]);
     labels[i].classList = 'form_control';
	}
}

//Events


submitButton.addEventListener('click', function() {
	let name  =  usernameInput.value;
	let emails = email.value;
	let pass = password.value;
	let confirmPass = passwordCheck.value;
	SignUp(name,emails,pass,confirmPass);
	
})

signInButton.addEventListener('click', function(){
	let signInEmailCheck = signInEmail.value;
	let signInPasswordCheck = signInPassword.value;
    SignIn(signInEmailCheck,signInPasswordCheck);

	
})

