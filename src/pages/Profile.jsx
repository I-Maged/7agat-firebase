import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserProducts } from '../features/product/productSlice'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Profile = () => {
  const { userProducts } = useSelector((state) => state.products)
  const { isLoading } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  const { userId } = useParams()

  useEffect(() => {
    dispatch(getUserProducts(userId)).unwrap().catch(toast.error())
  }, [dispatch, userId])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='filter-products-bar'>
        <h3 className='form-title'>منتجاتي</h3>
      </div>
      <section className='products-section'>
        {userProducts && userProducts.length > 0 ? (
          userProducts.map((product) => (
            <ProductCard
              product={product.data}
              id={product.id}
              key={product.id}
            />
          ))
        ) : (
          <p>No products to view</p>
        )}
      </section>
    </>
  )
}

export default Profile
