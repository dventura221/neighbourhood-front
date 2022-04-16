//import { useState } from 'react'
//import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const Comment = (props) => {
  return (
    <div>
      <h4>Comment</h4>
      <h5>Author: {props.authorId} </h5>
      <h5>Street: {props.streetId}</h5>
      <p>{props.content}</p>
    </div>
  )
}

export default Comment
