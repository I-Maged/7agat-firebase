import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'

const signOutFromBrowser = () => localStorage.removeItem('user')

const signInToBrowser = (userData) => {
  signOutFromBrowser()
  localStorage.setItem('user', userData)
}

const signIn = async (signInData) => {
  const auth = getAuth()

  const response = await signInWithEmailAndPassword(auth, signInData.email, signInData.password)

  if (response.user) {
    const userData = {
      uid: response.user.uid,
      displayName: response.user.displayName,
      email: response.user.email,
    }

    signInToBrowser(JSON.stringify(userData))

    return userData
  }

  return response
}
const signUp = async (signUpData) => {
  const auth = getAuth()

  const userCredential = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)

  const user = userCredential.user

  updateProfile(auth.currentUser, {
    displayName: signUpData.username,
  })

  const signUpDataCopy = { ...signUpData }
  delete signUpDataCopy.password
  signUpDataCopy.timestamp = serverTimestamp()

  await setDoc(doc(db, 'users', user.uid), signUpDataCopy)

  delete signUpDataCopy.timestamp

  signInToBrowser(JSON.stringify(signUpDataCopy))

  return signUpData
}

const userService = {
  signIn,
  signUp,
  signInToBrowser,
  signOutFromBrowser,
}
export default userService
