import ask from '../assets/images/ask.png'
import choice from '../assets/images/choice.png'
import clothes from '../assets/images/clothes.png'
import electronics from '../assets/images/electronics.png'
import furniture from '../assets/images/furniture.png'
import hero from '../assets/images/hero.png'
import vehicles from '../assets/images/vehicles.png'

import { Link } from 'react-router-dom'

/* import { useDispatch } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice' */

const Homepage = () => {
  return (
    <>
      {/* <section className='header-hero'>
        <div className='hero-img'>
          <img
            src={hero}
            alt='hero'
          />
        </div>
        <div className='header-slogan'>
          <h1>حاجات</h1>
          <div className='header-h2'>
            <h2 className='h2-eng'>7AGAT</h2>
            <h2 className='h2-ar'>
              <span className='h2-right'>بدلها</span>
              <br />
              <span className='h2-left'>ماترميهاش</span>
            </h2>
          </div>
        </div>
      </section> */}
      <section className='header-hero'>
        <div className='hero-img'>
          <img
            src={hero}
            alt='hero'
          />
        </div>
        <div className='hero-slogan'>
          <h1>حاجات</h1>
          <div className='hero-h2'>
            <h2 className='hero-h2-eng'>7AGAT</h2>
            <h2 className='hero-h2-ar'>
              <span className='hero-h2-ar-right'>بدلها</span>
              <br />
              <span className='hero-h2-ar-left'>ماترميهاش</span>
            </h2>
          </div>
        </div>
      </section>
      <section className='choices-section flex-row'>
        <div className='choice-container flex-row'>
          <div className='choice-box'>
            <p>على بركة الله</p>
            <div className='img-box'>
              <img
                src={choice}
                alt='choice'
              />

              <button className='main-btn'>يلا بينا</button>
            </div>
            <p>تتبرع؟</p>
          </div>
        </div>
        <div className='choice-container flex-row'>
          <div className='choice-box'>
            <p>نشوف الأول؟</p>
            <div className='img-box'>
              <img
                src={choice}
                alt='choice'
              />

              <button className='main-btn'>يلا نشوف</button>
            </div>
            <p>تبدل؟</p>
          </div>
        </div>
      </section>

      <section className='homepage-categories'>
        <div className='category-box'>
          <div className='category-box-img'>
            <img
              src={electronics}
              alt='electronics'
            />
          </div>
          <button className='main-btn'>إلكترونيات</button>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <img
              src={clothes}
              alt='clothes'
            />
          </div>
          <button className='main-btn'>ملابس</button>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <img
              src={furniture}
              alt='furniture'
            />
          </div>
          <button className='main-btn'>أثاث</button>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <img
              src={vehicles}
              alt='vehicles'
            />
          </div>
          <button className='main-btn'>مركبات</button>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <p>لسه محتار؟</p>
            <img
              src={ask}
              alt='ask'
            />
          </div>
          <button className='main-btn'>
            <Link to='/products'>عرض الكل</Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default Homepage
