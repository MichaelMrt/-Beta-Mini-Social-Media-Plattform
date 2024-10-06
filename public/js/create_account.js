import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { collection, getDocs, doc, setDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { auth, db } from "../firebase.js";

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
            updateUserProfileName(user, username);
            console.log("Erfolgreich registriert");
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
function updateUserProfileName(user, username){
     updateProfile(user, {
        displayName: username
    })
    .then(()=>{
      console.log("Profil erfolgreich aktualisiert:", user.displayName);
      addUserToFirestoreDb(db, user);
    }).catch((error) => {
        console.log("Profil konnte nicht aktualisiert werden");
        console.log(error.code);
        console.log(error.message); 
       }
  );               
} 

async function username_exists(username){
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where('username', '==', username));
  const usersSnapshot = await getDocs(q);
  if (usersSnapshot.empty==false) {
    console.log("Nutzername wird schon verwendet!");
    return true; 
  }else{
    return false;
  }
}

async function addUserToFirestoreDb(db, user) {

  const userData = {
    username: user.displayName,
    email: user.email,
  }

  try {
    const uid =user.uid;
    // Greife auf die 'users' Collection zu
    const usersCol = collection(db, 'users');
    const userDoc = doc(usersCol, uid);
    // Füge das neue Dokument hinzu
    await setDoc(userDoc, userData); 
    console.log('Benutzer zur Datenbank hinzugefügt mit ID:', uid);
    window.location.href = "/html/logged_in.html";
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Benutzers zur Datenbank:', error);
  }
}