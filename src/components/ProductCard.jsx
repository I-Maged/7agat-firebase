import { Link } from 'react-router-dom'

const ProductCard = ({ product, id }) => {
  return (
    <div className='product-card'>
      <img
        src={product.imageUrls[0]}
        alt={product.productName}
        className='product-card-img'
      />
      <p className='product-card-text'>{product.productName}</p>
      <p className='product-card-text'>{product.productName}</p>

      <button className='main-btn'>عرض المنتج</button>
    </div>
  )
}

export default ProductCard
