import { useState, useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import authService from '../features/services/authService'
import AuthContext from '../features/context/AuthContext'

import React from 'react'

const Register = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
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

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== password2) {
      toast.error('Passwords do not match')
      setIsLoading(false)
    } else {
      const userData = {
        name,
        email,
        password,
      }

      try {
        let _userData = await authService.register(userData)
        setUser(_userData)
        // console.log("registerData: ", _userData)
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
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
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

export default Register