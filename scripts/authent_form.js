//Create an instance of the Google provider object:
var provider = new firebase.auth.GoogleAuthProvider();
// call addScope. For example:
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// update the language code on the Auth instance before starting the OAuth flow. For example:
firebase.auth().languageCode = 'pt';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
//Specify additional custom OAuth provider parameters that you want to send with the OAuth request. To add a custom parameter, call setCustomParameters on the initialized provider with an object containing the key as specified by the OAuth provider documentation and the corresponding value. For example:
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

signin.onclick = function(){
	//To sign in with a pop-up window, call signInWithPopup:
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  console.log(error.message);
	  // ...
	});
}


