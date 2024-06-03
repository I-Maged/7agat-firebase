import { collection, getDocs, query, orderBy, where, getDoc, doc } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'

import { db } from '../../firebase.config'

const addNewOffer = async (offerData) => {
  return await addDoc(collection(db, 'offers'), offerData)
}

const offerCheck = async (productId, userId) => {
  const offerRef = collection(db, 'offers')

  const q = query(offerRef, where('patronProductId', '==', productId), where('recepientId', '==', userId))

  const querySnap = await getDocs(q)
  return querySnap.docs
}

const getUserOffers = async (userId) => {
  const offersRef = collection(db, 'offers')

  const q = query(offersRef, where('patronId', '==', userId), orderBy('timestamp', 'desc'))

  const querySnap = await getDocs(q)

  let offers = []

  querySnap.forEach((doc) => {
    return offers.push({
      id: doc.id,
      data: doc.data(),
    })
  })

  return offers
}

const offerService = {
  addNewOffer,
  offerCheck,
  getUserOffers,
}
export default offerService
