'use strict'

var arr = [];
function register() {
    getUsers();
}

function getUsers() {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5a5e1a1facbc7b5460be4301/latest',
		type: 'GET',
		headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2a$10$q231f/RUMlF1tCymDx3.wOBXsx1TmyTTrZbW/SeuEMN1Nxnqf9rIG",
         //   private : true
        },
        success: (data) => {
          arr = data;
          console.log(data);
          console.log(arr);
          reg();
        },
        error: (err) => {
		  console.log(err.responseJSON);
		  alert("Cannot get registered users.");
		  window.location.replace("register.html");
        }
	  });
}

function reg() {
    
	var userName = $("#username")[0].value;
    var password = $("#password")[0].value;
    var email = $("#email")[0].value;
    
    var registerUser = {
        user: userName,
        password: password,
        email: email
    }
    
    arr.push(registerUser);
    console.log(arr);
    $.ajax({
        url: 'https://api.jsonbin.io/b/5a5e1a1facbc7b5460be4301',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2a$10$q231f/RUMlF1tCymDx3.wOBXsx1TmyTTrZbW/SeuEMN1Nxnqf9rIG",
            private : true
        },
        contentType: 'application/json',
        data: JSON.stringify(arr),
        success: (data) => {
          window.location.replace("index.html");
        },
        error: (err) => {
          console.log(err.responseJSON);
          window.location.replace("index.html");
        }
      });
    return true;   
}