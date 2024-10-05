import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { auth } from "./firebase.js";

document.getElementById('registerbutton').addEventListener("click", () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        try {
            // Benutzerprofil aktualisieren
             updateProfile(user, {
                displayName: username
            });
            console.log("Profil erfolgreich aktualisiert:", user.displayName);
            console.log(username);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Profils:", error);
        }

        console.log("Erfolgreich registriert");
        console.log(user);
        console.log(user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorMessage);
        // ..
      });
});


