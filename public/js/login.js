import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { auth } from "../firebase.js";

// Login in with email and password
document.getElementById('loginbutton').addEventListener("click", () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Eingeloggt als: "+user.email);
    window.location.href = "/html/logged_in.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

});