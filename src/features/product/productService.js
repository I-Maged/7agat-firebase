import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { db } from '../../firebase.config'

import { v4 as uuidv4 } from 'uuid'

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

// Store image in firebase
const storeImage = async (image) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage()
    const fileName = `${image.name}-${uuidv4()}`
    console.log(fileName)
    const storageRef = ref(storage, 'images/' + fileName)

    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            break
        }
      },
      (error) => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
}

const addNewProductData = async (productData) => {
  console.log(productData)
  return await addDoc(collection(db, 'products'), productData)
}

const productService = {
  getAllProducts,
  storeImage,
  addNewProductData,
}
export default productService
