import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, // ✅ ИСПРАВЛЕНО
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATy7bbUMDpW_dhvMKSLbn55anC5vIyOPY",
  authDomain: "crwn-clothinh-db-87498.firebaseapp.com",
  projectId: "crwn-clothinh-db-87498",
  storageBucket: "crwn-clothinh-db-87498.firebasestorage.app",
  messagingSenderId: "225917072239",
  appId: "1:225917072239:web:b99534da1bcbf907ea6e9a"
};

// ✅ Инициализация Firebase
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Настройка Google провайдера
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

// ✅ Firestore
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = {};
  querySnapshot.forEach((docSnapshot) => {
    const { title, items } = docSnapshot.data();
    categoryMap[title.toLowerCase()] = items;
  });

  return categoryMap;
};

// ✅ Создание документа пользователя
export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot;
};

// ✅ Создание пользователя по email/паролю
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

// ✅ Вход пользователя по email/паролю (ИСПРАВЛЕНО)
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await firebaseSignInWithEmailAndPassword(auth, email, password);
};

// ✅ Выход пользователя
export const signOutUser = async () => await signOut(auth);

// ✅ Подписка на изменение состояния пользователя
export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};