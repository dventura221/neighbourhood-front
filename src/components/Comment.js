import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faRegThumb } from '@fortawesome/free-regular-svg-icons'
import Client from '../services/api'

const Comment = (props) => {
  const [isClicked, setClicked] = useState(false)
  const [updateComment, setUpdateComment] = useState({
    content: '',
    isEdited: false
  })

  const green = '#018749'
  const black = '#000000'

  const toggleClick = (e) => {
    e.preventDefault()
    setClicked(!isClicked)
  }

  const deleteCommentHandler = async () => {
    const res = await Client.delete(
      `http://localhost:3001/comment/${props.user.id}/delete/${props.commentid}`
    )
      .then((res) => console.log('delete comment successful'))
      .catch((err) => console.log(err.data))
    props.setCommentCount(props.commentCount + 1)
  }

  const updateCommentHandleChange = async (e) => {
    e.preventDefault()
    console.log(updateComment)
    //console.log('Before', updateComment)
    //console.log('After', updateComment)
    const res = await Client.put(
      `http://localhost:3001/comment/${props.user.id}/update/${props.commentid}`,
      updateComment
    )
      .then((res) => console.log('update comment successful'))
      .catch((err) => console.log(err.data))
    setUpdateComment({
      content: '',
      isEdited: false
    })
    props.setCommentCount(props.commentCount + 1)
  }

  return (
    <div className="CommentContainer">
      {/* <h4>Comment</h4> */}
      {/* <h5>Author: {props.authorId} </h5> */}
      {/* <h5>Street: {props.streetId}</h5> */}
      <FontAwesomeIcon
        icon={faXmark}
        id="Close"
        onClick={deleteCommentHandler}
        pull="right"
      />
      <FontAwesomeIcon icon={faPenToSquare} id="Edit" pull="right" />
      <h4>@{props.userName}</h4>
      <p>{props.content}</p>
      <div>
        <form
          onSubmit={updateCommentHandleChange}
          className="updateCommentForm"
        >
          <input
            required
            type="text"
            value={updateComment.content}
            placeholder="Edit Comment"
            onChange={(e) =>
              setUpdateComment({
                ...updateComment,
                content: e.target.value,
                isEdited: true
              })
            }
          ></input>
          <button className="submitButton" text="Submit">
            Edit Comment
          </button>
        </form>
      </div>
      <FontAwesomeIcon
        icon={faRegThumb}
        id="RegLike"
        pull="left"
        onClick={toggleClick}
        color={!isClicked ? green : black}
      />
    </div>
  )
}

export default Comment
