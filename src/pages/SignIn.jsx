import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signIn } from '../features/user/userSlice'
import Spinner from '../components/Spinner'

import { toast } from 'react-toastify'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.userAuth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignIn = async (e) => {
    e.preventDefault()

    for (const value in formData) {
      if (formData[value].trim().length < 6) {
        return toast.error(`${value} Can not be less than 6 characters`)
      }
    }

    const signInData = {
      email,
      password,
    }

    setFormData({
      email: '',
      password: '',
    })

    dispatch(signIn(signInData))
      .unwrap()
      .then((user) => {
        toast.success(`Welcome - ${user.displayName}`)
        navigate('/')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='form-container'>
      <h3 className='form-title'>أهلًا بك في حاجات</h3>
      <p className='form-text'>نتمنى لك تجربة ممتعة</p>
      <p className='form-text'>تسجيل الدخول</p>
      <form
        onSubmit={handleSignIn}
        className='register-form'
      >
        <div className='input-field'>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            autoComplete='off'
            placeholder=' '
            onChange={onChange}
          />
          <label htmlFor='email'>البريد الإلكتروني</label>
        </div>
        <div className='input-field'>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            placeholder=' '
            onChange={onChange}
          />
          <label htmlFor='password'>كلمة المرور</label>
        </div>

        <button
          type='submit'
          className='main-btn'
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  )
}

export default SignIn
