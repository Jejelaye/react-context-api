import { useState, useContext } from 'react'
import goalService from '../features/services/goalService'
import AuthContext from '../features/context/AuthContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function GoalForm({ setNewGoal }) {
  const [text, setText] = useState('')
  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)

  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (isError) toast.error(msg)
  }, [msg, isError])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      let _goalData = await goalService.createGoal({ text }, user.token)
      setNewGoal(_goalData)
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

    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
