import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { addNewProductData } from '../features/product/productSlice'

import { serverTimestamp } from 'firebase/firestore'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const AddNewProduct = () => {
  const { user } = useSelector((state) => state.userAuth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    productName: '',
    categoryName: '',
    offerType: '',
    images: {},
  })

  const { productName, categoryName, offerType, images } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }
  }

  const handleNewProduct = async (e) => {
    e.preventDefault()

    if (!user || !user.uid) {
      toast.error('You must sign in first')
      navigate('/')
    }

    if (images.length > 6) {
      return toast.error('Max 6 images')
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${user.uid}-${image.name}-${uuidv4()}`
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
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(() => {
      return toast.error('could not upload images')
    })

    const productData = {
      productName,
      categoryName,
      offerType,
      imgUrls,
      userRef: user.uid,
      timestamp: serverTimestamp(),
    }

    dispatch(addNewProductData(productData))
      .unwrap()
      .then(() => {
        toast.success('Added new product successfully')
        navigate('/')
      })
      .catch(toast.error)
  }

  return (
    <div className='form-container'>
      <h3 className='form-title'>إضافه منتج جديد</h3>
      <form
        onSubmit={handleNewProduct}
        className='register-form'
      >
        <div className='input-field'>
          <input
            type='text'
            name='productName'
            id='productName'
            value={productName}
            autoComplete='off'
            onChange={onChange}
            placeholder=' '
          />
          <label htmlFor='productName'>اسم المنتج</label>
        </div>
        <div>
          <select
            name='categoryName'
            id='categoryName'
            onChange={onChange}
            defaultValue='default'
          >
            <option
              disabled
              value='default'
            >
              فئة المنتج
            </option>
            <option
              name='electronics'
              id='electronics'
              value='electronics'
            >
              إلكترونيات
            </option>
            <option
              name='clothes'
              id='clothes'
              value='clothes'
            >
              ملابس
            </option>
            <option
              name='furniture'
              id='furniture'
              value='furniture'
            >
              أثاث
            </option>
          </select>
        </div>

        <div>
          <select
            name='offerType'
            id='offerType'
            onChange={onChange}
            defaultValue='default'
          >
            <option
              disabled
              value='default'
            >
              نوع العرض
            </option>
            <option
              name='donation'
              id='donation'
              value='donation'
            >
              تبرع
            </option>
            <option
              name='exchange'
              id='exchange'
              value='exchange'
            >
              تبادل
            </option>
          </select>
        </div>
        <div className='input-field'>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onChange}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <label htmlFor='productName'>صور المنتج</label>
        </div>
        <button
          type='submit'
          className='main-btn'
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  )
}

export default AddNewProduct
