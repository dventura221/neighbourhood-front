//import { useState } from 'react'
//import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const StreetPost = (props) => {
  return (
    <div>
      <h3>A Street</h3>
      <h4>Author {props.authorId}</h4>
      <p>Content {props.content}</p>
    </div>
  )
}

export default StreetPost
