import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faRegThumb } from '@fortawesome/free-regular-svg-icons'
import Client from '../services/api'

const Comment = (props) => {
  const [isClicked, setClicked] = useState(false)
  const [canEdit, toggleEdit] = useState(false)
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

  const makeEdits = (e) => {
    e.preventDefault()
    toggleEdit(!canEdit)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setUpdateComment({
      ...updateComment,
      content: e.currentTarget.textContent,
      isEdited: true
    })
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
      {props.user.id === props.authorId ? (
        <FontAwesomeIcon
          icon={faXmark}
          id="Close"
          onClick={deleteCommentHandler}
          pull="right"
        />
      ) : null}
      {props.user.id === props.authorId ? (
        <FontAwesomeIcon
          icon={faPenToSquare}
          id="Edit"
          onClick={makeEdits}
          pull="right"
        />
      ) : null}
      <span>
        <img
          src={props.avatar}
          alt="comment avatar"
          className="commentAvatar"
        />
      </span>
      <h4>@{props.userName}</h4>
      <div
        className="EditComment"
        contentEditable={
          canEdit && props.user.id === props.authorId ? true : null
        }
        onInput={handleChange}
      >
        {props.content} <br />
      </div>
      {props.user.id === props.authorId && canEdit ? (
        <button
          onClick={(e) => {
            updateCommentHandleChange(e)
            toggleEdit(false)
          }}
        >
          Comment
        </button>
      ) : null}
      {/* {props.user.id !== props.authorId ? (
        <FontAwesomeIcon
          icon={faRegThumb}
          id="RegLike"
          pull="left"
          onClick={toggleClick}
          color={!isClicked ? green : black}
        />
      ) : null} */}
      {!canEdit ? (
        <FontAwesomeIcon
          icon={faRegThumb}
          id="RegLike"
          pull="left"
          onClick={toggleClick}
          color={!isClicked ? black : green}
        />
      ) : null}
    </div>
  )
}

export default Comment
