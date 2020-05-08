firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log("Successfully logged in!"); 
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  
  } else {
    // No user is signed in
    console.log("No user signed in.");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function create() {
  var email = document.getElementById('newUserEmail').value;
  var password = document.getElementById('newUserPass').value;
  console.log(email + " " + password)
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}
  
function login() {

  var userEmail = document.getElementById("user_email").value;
  var userPass = document.getElementById("user_pass").value;

  console.log(userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
      
    window.alert("Error: " + errorMessage);
  });
}

function logout() {
  console.log("Signed out.");
  firebase.auth().signOut();
}