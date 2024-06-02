import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getProductById } from '../features/product/productSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation } from 'swiper/modules'

const ProductPage = () => {
  const { product } = useSelector((state) => state.products)
  const { isLoading } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  const { productId } = useParams()

  useEffect(() => {
    dispatch(getProductById(productId)).unwrap().catch(toast.error())
  }, [dispatch, productId])


  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      {product ? (
        <>
          <div className='product-page-container'>
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
            </div>
          </div>
        </>
      ) : (
        <p>No products to view</p>
      )}
    </>
  )
}

export default ProductPage
