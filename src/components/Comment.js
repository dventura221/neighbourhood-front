import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faRegThumb } from '@fortawesome/free-regular-svg-icons'
import Client from '../services/api'

const Comment = (props) => {
  const [isClicked, setClicked] = useState(false)
  const [canEdit, toggleEdit] = useState(false)
  const [saltCount, setSaltCount] = useState(10000)
  const [commentLikeCount, setCommentLikeCount] = useState(0)
  const [updateComment, setUpdateComment] = useState({
    content: '',
    isEdited: false
  })

  const green = '#018749'
  const black = '#000000'

  useEffect(() => {
    const checkCommentLikes = async () => {
      const likeResults = await Client.get(
        `http://localhost:3001/comment/${props.user.id}/like/${props.commentid}`
      )
      if (likeResults.data === 'already liked') {
        setClicked(true)
      } else {
        setClicked(false)
      }
    }
    const getCommentLikeCount = async () => {
      const commentLikeCountResults = await Client.get(
        `http://localhost:3001/comment/like/${props.commentid}`
      )
      setCommentLikeCount(commentLikeCountResults.data.number)
    }
    checkCommentLikes()
    getCommentLikeCount()
  }, [saltCount])

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

  const likeCommentHandler = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `http://localhost:3001/comment/${props.user.id}/like/${props.commentid}`
    )
      .then((res) => console.log('like comment successful'))
      .catch((err) => console.log(err.data))
    setSaltCount(saltCount + 1)
  }

  const unlikeCommentHandler = async (e) => {
    e.preventDefault()
    const res = await Client.delete(
      `http://localhost:3001/comment/${props.user.id}/like/${props.commentid}`
    )
      .then((res) => console.log('unlike street successful'))
      .catch((err) => console.log(err.data))
    setSaltCount(saltCount + 1)
  }

  return (
    <div className="CommentContainer CommentContent">
      <div className="EditIcons">
        {props.user.id === props.authorId ? (
          <FontAwesomeIcon
            icon={faPenToSquare}
            id="Edit"
            onClick={makeEdits}
            pull="right"
          />
        ) : null}
        {props.user.id === props.authorId ? (
          <FontAwesomeIcon
            icon={faXmark}
            id="Close"
            onClick={deleteCommentHandler}
            pull="right"
          />
        ) : null}
      </div>
      <img src={props.avatar} alt="comment avatar" className="Avatar" />
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
          className="UpdateButton"
          onClick={(e) => {
            updateCommentHandleChange(e)
            toggleEdit(false)
          }}
        >
          Update
        </button>
      ) : null}
      <div className="LikeContainer">
        {!canEdit && isClicked ? (
          <FontAwesomeIcon
            icon={faRegThumb}
            id="RegLike"
            pull="left"
            onClick={(e) => {
              toggleClick(e)
              unlikeCommentHandler(e)
            }}
            color={green}
          />
        ) : (
          <FontAwesomeIcon
            icon={faRegThumb}
            id="RegLike"
            pull="left"
            onClick={(e) => {
              toggleClick(e)
              likeCommentHandler(e)
            }}
            color={black}
          />
        )}
        <span className="commentLikeCount">
          {commentLikeCount > 0 ? commentLikeCount : null}
        </span>
      </div>
    </div>
  )
}

export default Comment
