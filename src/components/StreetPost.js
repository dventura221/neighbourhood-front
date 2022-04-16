import { useState, useEffect } from 'react'
import axios from 'axios'
//import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'

const StreetPost = (props) => {
  //let { id } = useParams()
  const [allComments, setAllComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      const results = await axios.get(
        `http://localhost:3001/comment/${props.id}`
      )
      setAllComments(results.data)
    }
    getComments()
  }, [])

  return (
    <div>
      <div>
        {/* <p>Street {props.id}</p> */}
        <p>Author: {props.authorId}</p>
        <p>Content: {props.content}</p>
      </div>
      <div>
        <CommentForm />
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
