//import { useState } from 'react'
//import axios from 'axios'
//import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'

const StreetPost = (props) => {
  return (
    <div>
      <div>
        <h3>Street {props.id}</h3>
        <h4>Author: {props.authorId}</h4>
        <p>Content: {props.content}</p>
      </div>
      <div>
        <CommentForm />
        <Comment streetId={props.id} authorId={props.authorId} />
        {/* Add .map to show multiple comments, conditional render the multiple
        comments. */}
      </div>
    </div>
  )
}

export default StreetPost
