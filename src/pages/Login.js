import { useState, useEffect, useContext } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import authService from '../features/services/authService'
import AuthContext from '../features/context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    user, setUser,
    isLoading, setIsLoading,
  } = useContext(AuthContext)

  const navigate = useNavigate()

  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isError) {
      toast.error(msg)
    }
    if (user) {
      navigate('/')
    }
  }, [user, navigate, isError, msg])

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const userData = {
      email,
      password,
    }

    try {
      let _userData = await authService.login(userData)
      // setUser(_userData)
      setUser(_userData)
    } catch (error) {
      const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString() 
        
        setIsError(true)
        setMsg(message)
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login