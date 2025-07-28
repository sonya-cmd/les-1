import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
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
  DocumentSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyATy7bbUMDpW_dhvMKSLbn55anC5vIyOPY",
  authDomain: "crwn-clothinh-db-87498.firebaseapp.com",
  projectId: "crwn-clothinh-db-87498",
  storageBucket: "crwn-clothinh-db-87498.appspot.com",
  messagingSenderId: "225917072239",
  appId: "1:225917072239:web:b99534da1bcbf907ea6e9a"
};

// ✅ Инициализация Firebase
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Настройка Google-провайдера
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// ✅ Firestore
export const db = getFirestore();

// ✅ Типы
export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
};

export type ObjectToAdd = {
  title: string;
};

// 🔁 Импорт данных в коллекцию
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// 📦 Получение категорий из Firestore как массив
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

// ✅ Создание/чтение документа пользователя
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {}
): Promise<DocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  let userSnapshot = await getDoc(userDocRef);

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
    } catch (error: any) {
      console.log('Error creating the user:', error.message);
    }

    userSnapshot = await getDoc(userDocRef);
  }

  return userSnapshot as DocumentSnapshot<UserData>;
};

// ✅ Регистрация по email/паролю
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

// ✅ Вход по email/паролю
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await firebaseSignInWithEmailAndPassword(auth, email, password);
};

// ✅ Выход
export const signOutUser = async () => await signOut(auth);

// ✅ Слушатель авторизации
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// ✅ Получение текущего пользователя
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
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