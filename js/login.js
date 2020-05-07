firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log("Successfully logged in!"); 
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  
  } else {
    // No user is signed in
    console.log("No user signed in.");
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "block";
  }
});
  
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