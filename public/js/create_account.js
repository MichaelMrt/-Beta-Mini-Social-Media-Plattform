import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { collection, getDocs, doc, setDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { auth, db } from "../firebase.js";

// Create an account with email and password
document.getElementById('registerbutton').addEventListener("click", () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    username_available(username).then((available) =>{
      if(available==true){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateUserProfileName(user, username);
            console.log("Erfolgreich registriert");
          })
          .catch((error) => {
            console.log("Nutzer konnte nicht erstellt werden");
            console.log(error.code);
            console.log(error.message);
      });
      }else{
        console.log("Nutzername ist schon vergeben");
      } 
    } );      
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

async function username_available(username){
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where('username', '==', username));
  console.log
  const usersSnapshot = await getDocs(q);
  if (usersSnapshot.empty==true) {
    //username is available 
    return true; 
  }else{
    //username is not available
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