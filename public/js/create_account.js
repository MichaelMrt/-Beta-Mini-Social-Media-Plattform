import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { auth } from "../firebase.js";

// Create an account with email and password
document.getElementById('registerbutton').addEventListener("click", () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!username_exists(username)){
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateUserProfileName(user);
           
            console.log("Erfolgreich registriert");
            console.log(user);
            console.log(user.displayName);
            window.location.href = "/html/logged_in.html";
          })
          .catch((error) => {
            console.log("Nutzer konnte nicht erstellt werden");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
      });
    }        
    });

// Benutzerprofil aktualisieren
function updateUserProfileName(user){
     updateProfile(user, {
        displayName: username
    })
    .then(()=>{
      console.log("Profil erfolgreich aktualisiert:", user.displayName);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Profil konnte nicht aktualisiert werden");
        console.log(errorCode);
        console.log(errorMessage); 
       }
  );               
} 

function username_exists(username){
  return false;
}