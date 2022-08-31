import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import AuthContext from '../features/context/AuthContext'
import GoalContext from '../features/context/GoalContext'
import goalService from '../features/services/goalService'

const Dashboard = () => {
  const {goals, setGoals} = useContext(GoalContext)
  const [newGoal, setNewGoal] = useState({})

  const {
    user,
    isLoading, 
  } = useContext(AuthContext)
  const { token } = user

  const navigate = useNavigate()

  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)

  useEffect(() => {
      try {
        (async () => {
          const goals = await goalService.getGoals(token)
          setGoals(goals)
        })()
      } catch (error) {

        const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString() 
          
        setIsError(true)
        setMsg(message)
      }
    console.log("useEffect onLoad")
  }, [])

  useEffect(() => {
    if (!user) navigate('/login')

    if (isError) toast.error(msg)
  }, [user, navigate, isError, msg])

  useEffect(() => {
    setGoals([...goals, newGoal])
  }, [newGoal])


  
  if (isLoading) {
    return <Spinner />
  }
  const handleDelete = async (id) => {

    try {
      let deletedObj = await goalService.deleteGoal(id, token)
      setGoals(prevGoals => prevGoals.filter(goal => goal._id.toString() !== deletedObj.id.toString()))
      // setGoals(prevGoals => prevGoals.filter(goal => goal._id.toString() !== id.toString()))
    } catch(error) {
      const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      setIsError(true)
      setMsg(message)
    }
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm 
        // newGoal={newGoal}
        setNewGoal={setNewGoal}
      />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem 
                setNewGoal={setNewGoal}
                setGoals={setGoals}
                key={goal._id} 
                goal={goal} 
                token={token}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard