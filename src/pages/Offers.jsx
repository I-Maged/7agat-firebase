import { useSelector, useDispatch } from 'react-redux'
import { getUserOffers } from '../features/offer/offerSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Offers = () => {
  const { offers } = useSelector((state) => state.offers)
  const { isLoading } = useSelector((state) => state.offers)

  const { userId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOffers(userId)).unwrap().catch(toast.error())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='filter-products-bar'>
        <h3 className='form-title'>العروض</h3>
      </div>
      {offers && offers.length > 0 ? (
        <>
          {offers.map((offer) => (
            <div
              id={offer.id}
              key={offer.id}
              offer={offer.data}
              className='offers-container'
            >
              {offer.data.offerType == 'exchange' ? (
                <>
                  <h3 className='offer-title'>عرض تبديل</h3>
                  <div className='exchange-container'>
                    <div className='product-card'>
                      <img
                        src={offer.data.patronProductImage}
                        alt={offer.data.patronProductName}
                        className='product-card-img'
                      />
                      <p className='product-card-text'>{offer.data.patronProductName}</p>
                      <p className='product-card-text'>{offer.data.patronProductGategory}</p>
                    </div>
                    <div className='product-card'>
                      <img
                        src={offer.data.recepientProductImage}
                        alt={offer.data.recepientProductName}
                        className='product-card-img'
                      />
                      <p className='product-card-text'>{offer.data.recepientProductName}</p>
                      <p className='product-card-text'>{offer.data.recepientProductGategory}</p>
                    </div>
                  </div>
                  <div className='message-container'>
                    <h3>رسالة من </h3>
                    <h3> : {offer.data.recepientName}</h3>
                    <h3>{offer.data.offerMessage}</h3>
                  </div>
                </>
              ) : (
                <>
                  <div className='donation-container'>
                    <div className='product-card'>
                      <img
                        src={offer.data.patronProductImage}
                        alt={offer.data.patronProductName}
                        className='product-card-img'
                      />
                      <p className='product-card-text'>{offer.data.patronProductName}</p>
                      <p className='product-card-text'>{offer.data.patronProductGategory}</p>
                    </div>
                    <div className='donation-text'>
                      <h3 className='offer-title'>طلب تبرع</h3>
                      <div className='message-container'>
                        <h3>رسالة من </h3>
                        <h3> : {offer.data.recepientName}</h3>
                        <h3>{offer.data.offerMessage}</h3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>No products to view</p>
      )}
    </>
  )
}

export default Offers
