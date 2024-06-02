import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../features/product/productSlice'

import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'

const Products = () => {
  const { products } = useSelector((state) => state.products)
  const { isLoading } = useSelector((state) => state.products)

  const params = useParams()
  const dispatch = useDispatch()

  const [categoryName, setCategoryName] = useState(params.categoryName)
  const [offerType, setOfferType] = useState(params.offerType)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    dispatch(getAllProducts())
    setFilteredProducts(products)
  }, [dispatch])

  useEffect(() => {
    if (products) {
      if (categoryName == 'all' && offerType == 'all') {
        setFilteredProducts(products)
      } else if (categoryName == 'all') {
        setFilteredProducts(products.filter((product) => product.data.offerType == offerType))
      } else if (offerType == 'all') {
        console.log(products[0].data.categoryName)
        // console.log(products.filter((product) => product.data.categoryName == categoryName))
        setFilteredProducts(products.filter((product) => product.data.categoryName == categoryName))
      } else {
        console.log('first')
        setFilteredProducts(
          products.filter((product) => product.data.categoryName == categoryName && product.data.offerType == offerType)
        )
      }
    }
  }, [dispatch, categoryName, offerType])
  console.log(filteredProducts)

  // console.log(offerType)

  /*  if (products) {
    if (categoryName == 'all' && offerType == 'all') {
      setFilteredProducts(products)
    } else if (categoryName == 'all') {
      setFilteredProducts(products.filter((product) => product.offerType == offerType))
    } else if (offerType == 'all') {
      setFilteredProducts(products.filter((product) => product.categoryName == categoryName))
    } else {
      setFilteredProducts(
        products.filter((product) => product.categoryName == categoryName && product.offerType == offerType)
      )
    }
  } */

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='filter-products-bar'>
        <select
          name='categoryName'
          id='categoryName'
          onChange={(e) => setCategoryName(e.target.value)}
          defaultValue='all'
        >
          <option
            disabled
            value='default'
          >
            فئة المنتج
          </option>
          <option
            name='all'
            id='all'
            value='all'
          >
            الكل
          </option>
          <option
            name='electronics'
            id='electronics'
            value='electronics'
          >
            أدوات كهربائية
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
        <select
          name='offerType'
          id='offerType'
          onChange={(e) => setOfferType(e.target.value)}
          defaultValue='all'
        >
          <option
            disabled
            value='default'
          >
            نوع العرض
          </option>
          <option
            name='all'
            id='all'
            value='all'
          >
            الكل
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
      <section className='products-section'>
        {categoryName == 'all' && offerType == 'all' ? (
          products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                product={product.data}
                id={product.id}
                key={product.id}
              />
            ))
          ) : (
            <p>No products to view</p>
          )
        ) : filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              product={product.data}
              id={product.id}
              key={product.id}
            />
          ))
        ) : (
          <p>No products to view</p>
        )}
        {/* {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              product={product.data}
              id={product.id}
              key={product.id}
            />
          ))
        ) : (
          <p>No products to view</p>
        )} */}
        {/* {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              product={product.data}
              id={product.id}
              key={product.id}
            />
          ))
        ) : (
          <p>No products to view</p>
        )} */}
      </section>
    </>
  )
}

export default Products
