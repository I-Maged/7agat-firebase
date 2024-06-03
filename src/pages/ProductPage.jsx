import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { getProductById } from '../features/product/productSlice'
import { addNewOffer, offerCheck } from '../features/offer/offerSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'

const ProductPage = () => {
  const { product } = useSelector((state) => state.products)
  const { checkOffer } = useSelector((state) => state.offers)
  const { user } = useSelector((state) => state.userAuth)
  const { isLoading } = useSelector((state) => state.products)

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productId } = useParams()

  useEffect(() => {
    dispatch(getProductById(productId)).unwrap().catch(toast.error())
  }, [dispatch, productId])

  const handleDonation = () => {
    if (!user) {
      toast.error('You must sign in first')
      return navigate('/')
    }

    const offerCheckData = {
      productId,
      userId: user.uid,
    }
    useEffect(() => {
      dispatch(offerCheck(offerCheckData)).unwrap().catch(toast.error())
    }, [dispatch, productId, user.uid])

    if (checkOffer.length > 0) {
      toast.error('لقد قدمت طلب لهذا المنتج من قبل')
      return navigate('/')
    }

    if (message.trim().length < 6) {
      return toast.error('message is too short')
    }

    const offerData = {
      offerType: 'donation',
      patronId: product.userRef,
      patronProductId: productId,
      patronProductImage: product.imgUrls[0],
      patronProductName: product.productName,
      patronProductGategory: product.categoryName,
      recepientId: user.uid,
      recepientName: user.displayName,
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
    <div className='product-page-container'>
      {product ? (
        <>
          <Swiper
            pagination={{
              type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='swiperSlideDiv'
          >
            {product.imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${product.imgUrls[index]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='swiperSlideDiv'
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='product-page-info-container'>
            <p className='product-info-text'>{product.productName}</p>
            {product.categoryName == 'electronics' ? (
              <p className='product-info-text'>إلكترونيات</p>
            ) : product.categoryName == 'clothes' ? (
              <p className='product-info-text'>ملابس</p>
            ) : product.categoryName == 'furniture' ? (
              <p className='product-info-text'>أثاث</p>
            ) : (
              <p className='product-info-text'>أخرى</p>
            )}
            {product.offerType == 'exchange' ? (
              <p className='product-info-text'>تبادل</p>
            ) : product.offerType == 'donation' ? (
              <p className='product-info-text'>تبرع</p>
            ) : (
              <p className='product-info-text'>أخرى</p>
            )}
            {!user ? (
              <button className='main-btn'>
                <Link to='/signIn'>تسجيل الدخول</Link>
              </button>
            ) : user.uid == product.userRef ? (
              <button className='main-btn'>
                <Link to='/products/allProducts'>عرض الكل</Link>
              </button>
            ) : product.offerType == 'donation' ? (
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
                  onClick={handleDonation}
                >
                  طلب تبرع
                </button>
              </>
            ) : (
              <button className='main-btn'>
                <Link to={`/exchange/${productId}/${user.uid}`}>تقديم طلب</Link>
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No products to view</p>
      )}
    </div>
  )
}

export default ProductPage
