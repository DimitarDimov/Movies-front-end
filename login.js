'use strict'


function logIn() {
	var username = $("#username")[0].value;
	var password = $("#password")[0].value;

	 $.ajax({
        url: 'https://api.jsonbin.io/b/5a5e1a1facbc7b5460be4301/latest',
		type: 'GET',
		headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2a$10$q231f/RUMlF1tCymDx3.wOBXsx1TmyTTrZbW/SeuEMN1Nxnqf9rIG",
            private : true
        },
        success: (data) => {
		  data.forEach(element => {
			if(username === element.user && password === element.password){
				window.location.replace("genres.html");
			}
		  });
        },
        error: (err) => {
		  console.log(err.responseJSON);
		  alert("Username or Password incorrect.");
		  window.location.replace("index.html");
        }
	  });
}