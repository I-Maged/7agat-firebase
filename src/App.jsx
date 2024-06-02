import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Products from './pages/Products'
import AddNewProduct from './pages/AddNewProduct'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'

// Keep for first run to initialize firebase App
import { db } from './firebase.config'

const App = () => {
  return (
    <>
      <Router>
        <div className='body'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Homepage />}
            />
            <Route
              path='/signIn'
              element={<SignIn />}
            />
            <Route
              path='/signUp'
              element={<SignUp />}
            />
            <Route
              path='/addNewProduct'
              element={<AddNewProduct />}
            />
            <Route
              path='/products/allProducts'
              element={<Products />}
            />
            <Route
              path='/user/:userId'
              element={<Profile />}
            />
            <Route
              path='/product/:productId'
              element={<ProductPage />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
