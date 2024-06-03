import { useSelector, useDispatch } from 'react-redux'
import { getUserOffers } from '../features/offer/offerSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import ask from '../assets/images/ask.png'
import choice from '../assets/images/choice.png'
import clothes from '../assets/images/clothes.png'
import electronics from '../assets/images/electronics.png'
import furniture from '../assets/images/furniture.png'
import hero from '../assets/images/hero.png'

import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
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
            </div>
            <p>تبدل؟</p>
          </div>
        </div>
      </section>

      <section className='homepage-categories'>
        <div className='category-box'>
          <div className='category-box-img'>
            <p>إلكترونيات</p>
            <img
              src={electronics}
              alt='electronics'
            />
          </div>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <p>ملابس</p>
            <img
              src={clothes}
              alt='clothes'
            />
          </div>
        </div>

        <div className='category-box'>
          <div className='category-box-img'>
            <p>أثاث</p>
            <img
              src={furniture}
              alt='furniture'
            />
          </div>
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
            <Link to='/products/allProducts'>عرض الكل</Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default Homepage
