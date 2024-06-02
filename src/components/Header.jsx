import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../features/user/userSlice'

import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { FiLogIn } from 'react-icons/fi'
import { FaUserPlus } from 'react-icons/fa'
import { TbLogout2 } from 'react-icons/tb'
import { MdAddCircleOutline, MdProductionQuantityLimits } from 'react-icons/md'
import { GiClothes } from 'react-icons/gi'

import '../assets/SideBar.css'

const Header = () => {
  const { user } = useSelector((state) => state.userAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [navIsOpen, setNavIsOpen] = useState(false)

  const handleSignOut = () => {
    dispatch(signOut())
    setNavIsOpen(false)
    navigate('/')
  }

  return (
    <section className='header-menu'>
      <div className='sidebar-container'>
        <div className='sidebar'>
          <div
            className='hamburger-menu__container'
            onClick={() => setNavIsOpen(!navIsOpen)}
          >
            <div className={'hamburger-menu' && navIsOpen ? 'hamburger-menu--open' : null}>
              {navIsOpen ? (
                <IoMdClose
                  color='white'
                  size={40}
                />
              ) : (
                <IoMdMenu
                  color='white'
                  size={40}
                />
              )}
            </div>
          </div>
          <nav className={'nav' && navIsOpen ? 'nav--open' : null}>
            <nav
              className='nav__item'
              onClick={() => setNavIsOpen(false)}
            >
              <Link to='/products/allProducts'>
                <MdProductionQuantityLimits
                  color='white'
                  size={40}
                />
              </Link>
              <span className='nav__item-text'>جميع المنتجات</span>
            </nav>
            {user ? (
              <>
                <nav
                  className='nav__item'
                  onClick={() => setNavIsOpen(false)}
                >
                  <Link to='/addNewProduct'>
                    <MdAddCircleOutline
                      color='white'
                      size={40}
                    />
                  </Link>
                  <span className='nav__item-text'>إضافة منتج</span>
                </nav>
                <nav
                  className='nav__item'
                  onClick={() => setNavIsOpen(false)}
                >
                  <Link to={`/user/${user.uid}`}>
                    <GiClothes
                      color='white'
                      size={40}
                    />
                  </Link>
                  <span className='nav__item-text'>منتجاتي</span>
                </nav>
                <nav
                  className='nav__item'
                  onClick={() => handleSignOut()}
                >
                  <TbLogout2
                    color='white'
                    size={40}
                  />
                  <span className='nav__item-text'>الخروج</span>
                </nav>
              </>
            ) : (
              <>
                <nav
                  className='nav__item'
                  onClick={() => setNavIsOpen(false)}
                >
                  <Link to='/signIn'>
                    <FiLogIn
                      color='white'
                      size={40}
                    />
                  </Link>
                  <span className='nav__item-text'>تسجيل الدخول</span>
                </nav>

                <nav
                  className='nav__item'
                  onClick={() => setNavIsOpen(false)}
                >
                  <Link to='/signUp'>
                    <FaUserPlus
                      color='white'
                      size={40}
                    />
                  </Link>
                  <span className='nav__item-text'>إنشاء حساب</span>
                </nav>
              </>
            )}
          </nav>
        </div>
      </div>
      <div>
        <Link
          to='/'
          className='link header-menu-link'
        >
          <div>حـــــاجــــات</div>
          <div>7AGAT</div>
        </Link>
      </div>
    </section>
  )
}

export default Header
