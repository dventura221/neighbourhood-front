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
  }, [props.id])

  return (
    <div>
      <div className="StreetPost">
        {/* <p>Street {props.id}</p> */}
        <p id="StreetContent">
          <span>@user_name</span> <br />
          {props.content}
        </p>
        <CommentForm />
        {allComments.map((comment) => (
          <Comment
            key={comment.id}
            streetId={comment.streetId}
            authorId={comment.authorId}
            content={comment.content}
          />
        ))}
        {/* Add conditional render the multiple
        comments. */}
      </div>
    </div>
  )
}

export default StreetPost
