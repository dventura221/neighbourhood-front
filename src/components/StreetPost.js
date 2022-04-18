import { useState, useEffect } from 'react'
//import axios from 'axios'
//import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Client from '../services/api'

const StreetPost = (props) => {
  //let { id } = useParams()
  const [allComments, setAllComments] = useState([])

  const getComments = async () => {
    const results = await Client.get(
      `http://localhost:3001/comment/${props.id}`
    )
    setAllComments(results.data)
  }
  useEffect(() => {
    getComments()
  }, [props.id])

  return (
    <div>
      <div>
        {/* <p>Street {props.id}</p> */}
        <p>Author: {props.authorId}</p>
        <p>Content: {props.content}</p>
      </div>
      <div>
        <CommentForm getComments={getComments} />
        <div className="allCommentsGrid">
          {allComments.map((comment) => (
            <Comment
              key={comment.id}
              streetId={comment.streetId}
              authorId={comment.authorId}
              content={comment.content}
            />
          ))}
        </div>
        {/* Add conditional render the multiple
        comments. */}
      </div>
    </div>
  )
}

export default StreetPost
