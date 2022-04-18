import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const CommentForm = (props) => {
  // let navigate = useNavigate()

  const [commentValues, setCommentValues] = useState({ content: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    Client.post(
      `http://localhost:3001/comment/${props.user.id}/${props.streetId}/new`,
      commentValues
    )
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setCommentValues({ content: '' })
    props.getComments()
  }

  const handleChange = (e) => {
    setCommentValues({ ...commentValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="commentFormComp">
      <h3>Create Comment</h3>
      <form onSubmit={handleSubmit} className="commentForm">
        <input
          required
          type="text"
          name="content"
          value={commentValues.content}
          placeholder="Content"
          onChange={handleChange}
        ></input>
        <button className="submitButton">Submit</button>
      </form>
    </div>
  )
}

export default CommentForm
