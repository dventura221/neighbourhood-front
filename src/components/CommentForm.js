import { useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../services/api'

const CommentForm = (props) => {
  const [commentValues, setCommentValues] = useState({ content: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `${BASE_URL}/comment/${props.user.id}/${props.streetId}/new`,
      commentValues
    )
      .then((res) => console.log('successful'))
      .catch((err) => console.log(err.data))
    setCommentValues({ content: '' })
    props.setCommentCount(props.commentCount + 1)
  }

  const handleChange = (e) => {
    setCommentValues({ ...commentValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="CommentFormContainer">
      <div className="CommentForm">
        <textarea
          required
          type="text"
          name="content"
          value={commentValues.content}
          placeholder="Add a comment!"
          onChange={handleChange}
        ></textarea>
        <div className="CommentButtonContainer">
          <button
            className="CommentButton"
            onClick={handleSubmit}
            disabled={commentValues.content === ''}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
