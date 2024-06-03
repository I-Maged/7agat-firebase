import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsToExchange } from '../features/product/productSlice'
import { serverTimestamp } from 'firebase/firestore'
import { addNewOffer, offerCheck } from '../features/offer/offerSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Exchange = () => {
  const { userProductsToExchange, product } = useSelector((state) => state.products)
  const { isLoading } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.userAuth)
  const { checkOffer } = useSelector((state) => state.offers)

  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [sendOffer, setSendOffer] = useState(false)
  const dispatch = useDispatch()
  const { productId, userId } = useParams()

  const offerCheckData = {
    productId,
    userId,
  }

  useEffect(() => {
    dispatch(offerCheck(offerCheckData)).unwrap().catch(toast.error())
    dispatch(getProductsToExchange(userId)).unwrap().catch(toast.error())
  }, [dispatch, productId, userId])

  const handleExchange = (userproduct) => {
    if (!product || !userproduct || !user) {
      toast.error('Could not add offer')
      navigate('/')
    }
    if (checkOffer.length > 0) {
      toast.error('لقد قدمت طلب لهذا المنتج من قبل')
      return navigate('/')
    }
    if (message.trim().length < 6) {
      return toast.error('message is too short')
    }

    const offerData = {
      offerType: 'exchange',
      patronId: product.userRef,
      patronProductId: productId,
      patronProductImage: product.imgUrls[0],
      patronProductName: product.productName,
      patronProductGategory: product.categoryName,
      recepientId: user.uid,
      recepientProductId: userproduct.id,
      recepientProductImage: userproduct.data.imgUrls[0],
      recepientName: user.displayName,
      recepientProductName: userproduct.data.productName,
      recepientProductGategory: userproduct.data.categoryName,
      offerMessage: message,
      timestamp: serverTimestamp(),
    }

    setMessage('')

    dispatch(addNewOffer(offerData))
      .unwrap()
      .then(() => {
        toast.success('تم إضافة الطلب بنجاح')
        navigate('/')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className='filter-products-bar'>
        <h3 className='form-title'>اختر منتج للتبديل</h3>
      </div>
      <section className='products-section'>
        {userProductsToExchange && userProductsToExchange.length > 0 ? (
          userProductsToExchange.map((userproduct) => (
            <div
              id={userproduct.id}
              key={userproduct.id}
              userproduct={userproduct.data}
              className={sendOffer ? 'product-card offer-card' : 'product-card'}
            >
              <img
                src={userproduct.data.imgUrls[0]}
                alt={userproduct.data.productName}
                className='product-card-img'
              />
              <p className='product-card-text'>{userproduct.data.productName}</p>
              {userproduct.data.offerType == 'donation' ? (
                <p className='product-card-text'>تبرع</p>
              ) : (
                <p className='product-card-text'>تبديل</p>
              )}
              {sendOffer ? (
                <>
                  <div className='input-field'>
                    <textarea
                      name='message'
                      id='message'
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=' '
                    ></textarea>
                    <label htmlFor='message'>رسالة لصاحب المنتج</label>
                  </div>
                  <button
                    className='main-btn'
                    onClick={() => handleExchange(userproduct)}
                  >
                    طلب تبديل
                  </button>
                </>
              ) : (
                <button
                  className='main-btn'
                  onClick={() => {
                    setSendOffer(true)
                  }}
                >
                  تبديل؟
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products to view</p>
        )}
      </section>
    </>
  )
}

export default Exchange
