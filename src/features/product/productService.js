import { db } from '../../firebase.config'

import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'

const getAllProducts = async () => {
  const accountsCol = collection(db, 'products')

  const q = query(accountsCol, orderBy('timestamp', 'asc'))

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

const productService = {
  getAllProducts,
}
export default productService
