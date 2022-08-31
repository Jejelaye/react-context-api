import { useState } from "react"
import goalService from "../features/services/goalService"

function GoalItem({ goal, setGoals, token, handleDelete }) {

    // setGoals(prevGoals => {
    //   console.log(prevGoals)
    // })

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => handleDelete(goal._id)} className='close'>
      {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> */}
        X
      </button>
    </div>
  )
}

export default GoalItem
