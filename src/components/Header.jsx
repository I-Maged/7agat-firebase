import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../features/user/userSlice'

import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { FiLogIn } from 'react-icons/fi'
import { FaUserPlus } from 'react-icons/fa'
import { TbLogout2 } from 'react-icons/tb'

import '../assets/SideBar.css'

const Header = () => {
  const { user } = useSelector((state) => state.userAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // let user = JSON.parse(localStorage.getItem('user'))

  const [navIsOpen, setNavIsOpen] = useState(false)

  const handleSignOut = () => {
    dispatch(signOut())
    setNavIsOpen(false)
    // user = null
    navigate('/')
  }

  /*   useEffect(() => {
    if (signOutState) {
      setNavIsOpen(false)
      dispatch(signOut())
      navigate('/')
      setSignOutState(false)
    }
  }, [signOutState, user]) */

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
            {user ? (
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
