import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Client from '../services/api'

const StreetPost = (props) => {
  const [allComments, setAllComments] = useState([])
  const [commentCount, setCommentCount] = useState(10000)
  const [heartClicked, toggleHeart] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [convoClicked, toggleConvo] = useState(false)
  const [altCount, setAltCount] = useState(100)
  const [updateStreet, setUpdateStreet] = useState({
    content: '',
    isEdited: false
  })

  const [canEdit, toggleEdit] = useState(false)

  const changeStyle = (e) => {
    e.preventDefault()
    toggleHeart(!heartClicked)
  }

  const displayComments = (e) => {
    e.preventDefault()
    toggleConvo(!convoClicked)
  }

  const makeEdits = (e) => {
    e.preventDefault()
    toggleEdit(!canEdit)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setUpdateStreet({
      ...updateStreet,
      content: e.currentTarget.textContent,
      isEdited: true
    })
  }

  useEffect(() => {
    const getComments = async () => {
      const results = await Client.get(
        `http://localhost:3001/comment/${props.id}`
      )
      setAllComments(results.data)
    }
    const checkLikes = async () => {
      const likeResults = await Client.get(
        `http://localhost:3001/street/${props.user.id}/like/${props.id}`
      )
      if (likeResults.data > 0) {
        toggleHeart(true)
      } else {
        toggleHeart(false)
      }
    }
    const getLikeCount = async () => {
      const likeCountResults = await Client.get(
        `http://localhost:3001/street/like/${props.id}`
      )
      setLikeCount(likeCountResults.data.number)
    }
    getComments()
    checkLikes()
    getLikeCount()
  }, [commentCount, altCount])

  const deleteStreetHandler = async () => {
    const res = await Client.delete(
      `http://localhost:3001/street/${props.user.id}/delete/${props.id}`
    )
      .then((res) => console.log('delete street successful'))
      .catch((err) => console.log(err.data))
    props.setStreetCount(props.streetCount + 1)
  }

  const updateStreetHandleChange = async (e) => {
    e.preventDefault()
    const res = await Client.put(
      `http://localhost:3001/street/${props.user.id}/update/${props.id}`,
      updateStreet
    )
      .then((res) => console.log('update street successful'))
      .catch((err) => console.log(err.data))
    setUpdateStreet({
      content: '',
      isEdited: false
    })
    setCommentCount(commentCount + 1)
  }

  const likeStreetHandler = async (e) => {
    e.preventDefault()
    const res = await Client.post(
      `http://localhost:3001/street/${props.user.id}/like/${props.id}`
    )
      .then((res) => console.log('like street successful'))
      .catch((err) => console.log(err.data))
    setAltCount(altCount + 1)
  }

  const unlikeStreetHandler = async (e) => {
    e.preventDefault()
    const res = await Client.delete(
      `http://localhost:3001/street/${props.user.id}/like/${props.id}`
    )
      .then((res) => console.log('unlike street successful'))
      .catch((err) => console.log(err.data))
    setAltCount(altCount + 1)
  }

  return (
    <div className="PostFeed">
      <div className="PostContainer PostContent">
        <img src={props.avatar} alt="Avatar" className="Avatar" />
        <div className="PostHandle">
          <span id="Name">{props.firstName}</span>
          <span id="Handle">@{props.userName}</span>
        </div>
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
              onClick={deleteStreetHandler}
              pull="right"
            />
          ) : null}
        </div>
        <div
          className="EditStreet"
          id="FeedContent"
          contentEditable={
            canEdit && props.user.id === props.authorId ? true : null
          }
          onInput={handleChange}
        >
          {props.content}
        </div>
        <div className="UpdateButtonContainer">
          {props.user.id === props.authorId && canEdit ? (
            <button
              className="UpdateButton"
              onClick={(e) => {
                updateStreetHandleChange(e)
                // changeFocus()
                toggleEdit(false)
              }}
            >
              Post
            </button>
          ) : null}
        </div>
        <div className="IconBar">
          <div className="LikeCount">{likeCount > 0 ? likeCount : null}</div>
          {!heartClicked ? (
            <FontAwesomeIcon
              icon={faHeartRegular}
              id="RegHeart"
              onClick={(e) => {
                changeStyle(e)
                likeStreetHandler(e)
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeartSolid}
              id="SolidHeart"
              onClick={(e) => {
                changeStyle(e)
                unlikeStreetHandler(e)
              }}
            />
          )}
          <FontAwesomeIcon
            icon={faComment}
            id="ConvoBubble"
            onClick={displayComments}
          />
        </div>
      </div>
      {!convoClicked &&
        allComments.map((comment) => (
          <Comment
            key={comment.id}
            commentid={comment.id}
            authorId={comment.authorId}
            content={comment.content}
            userName={comment.User.userName}
            user={props.user}
            count={props.count}
            setCount={props.setCount}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
            avatar={comment.User.avatar}
          />
        ))}
      <CommentForm
        user={props.user}
        streetId={props.id}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
        allComments={allComments}
        setAllComments={setAllComments}
      />
    </div>
  )
}

export default StreetPost
