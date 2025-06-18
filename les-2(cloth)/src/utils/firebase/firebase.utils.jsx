import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyATy7bbUMDpW_dhvMKSLbn55anC5vIyOPY",
    authDomain: "crwn-clothinh-db-87498.firebaseapp.com",
    projectId: "crwn-clothinh-db-87498",
    storageBucket: "crwn-clothinh-db-87498.firebasestorage.app",
    messagingSenderId: "225917072239",
    appId: "1:225917072239:web:b99534da1bcbf907ea6e9a"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);