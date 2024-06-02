import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../features/user/userSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.userAuth)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const { username, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSignUp = (e) => {
    e.preventDefault()

    for (const value in formData) {
      if (formData[value].trim() === '') {
        return toast.error(`${value} Can not be empty`)
      }
    }

    if (password.trim() !== password2.trim()) {
      return toast.error('Passwords must match')
    }

    const signUpData = {
      username,
      email,
      password,
    }

    setFormData({
      username: '',
      email: '',
      password: '',
      password2: '',
    })

    dispatch(signUp(signUpData))
      .unwrap()
      .then((user) => {
        toast.success(`Welcome ${user.displayName}`)
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
      <p className='form-text'>إنشاء حساب</p>
      <form
        onSubmit={handleSignUp}
        className='register-form'
      >
        <div className='input-field'>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            autoComplete='off'
            placeholder=' '
            onChange={onChange}
          />
          <label htmlFor='email'>اسم المستخدم</label>
        </div>
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
        <div className='input-field'>
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            placeholder=' '
            onChange={onChange}
          />
          <label htmlFor='password'>تأكيد كلمة المرور</label>
        </div>
        <button
          type='submit'
          className='main-btn'
        >
          إنشاء حساب
        </button>
      </form>
    </div>
  )
}

export default SignUp
