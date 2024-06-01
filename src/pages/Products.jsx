import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'
const Products = () => {
  const { products } = useSelector((state) => state.products)
  const { isLoading } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  console.log(products)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='products-section'>
      {products && products.length > 0 ? (
        products.map((product) => (
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
  )
}

export default Products
