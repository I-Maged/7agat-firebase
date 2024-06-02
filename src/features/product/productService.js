import { collection, getDocs, query, orderBy, where, getDoc, doc } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'

import { db } from '../../firebase.config'

const getAllProducts = async () => {
  const productsCol = collection(db, 'products')

  const q = query(productsCol, orderBy('timestamp', 'desc'))

  const productsSnap = await getDocs(q)

  const productsList = []

  productsSnap.forEach((doc) => {
    return productsList.push({
      id: doc.id,
      data: doc.data(),
    })
  })

  return productsList
}

const addNewProductData = async (productData) => {
  return await addDoc(collection(db, 'products'), productData)
}

const getUserProducts = async (userId) => {
  const productsRef = collection(db, 'products')

  const q = query(productsRef, where('userRef', '==', userId), orderBy('timestamp', 'desc'))

  const querySnap = await getDocs(q)

  let products = []

  querySnap.forEach((doc) => {
    return products.push({
      id: doc.id,
      data: doc.data(),
    })
  })

  return products
}

const getProductById = async (productId) => {
  const snap = await getDoc(doc(db, 'products', productId))
  return snap.data()
}

const productService = {
  getAllProducts,
  addNewProductData,
  getUserProducts,
  getProductById,
}
export default productService
