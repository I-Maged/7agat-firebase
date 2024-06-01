import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCR6IVacmW5oCQQtj6wH2K0OyN92-kfJqw',
  authDomain: 'hagat-app-7dec0.firebaseapp.com',
  projectId: 'hagat-app-7dec0',
  storageBucket: 'hagat-app-7dec0.appspot.com',
  messagingSenderId: '82538697949',
  appId: '1:82538697949:web:151e3272124f10db4b3734',
}

initializeApp(firebaseConfig)
export const db = getFirestore()
