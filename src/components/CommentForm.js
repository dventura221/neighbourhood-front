import { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const CommentForm = () => {
  // let navigate = useNavigate()

  const [commentValues, setCommentValues] = useState({ content: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:3001/comment/2/1/new`, commentValues)
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setCommentValues({ content: '' })
  }

  const handleChange = (e) => {
    setCommentValues({ ...commentValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="Comment">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          type="text"
          name="content"
          value={commentValues.content}
          placeholder="Add a comment!"
          onChange={handleChange}
        ></textarea>
        <button className="CommentButton">Post</button>
      </form>
    </div>
  )
}

export default CommentForm
