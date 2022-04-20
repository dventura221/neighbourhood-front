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
  const [convoClicked, toggleConvo] = useState(false)
  const [updateStreet, setUpdateStreet] = useState({
    content: '',
    isEdited: false
  })

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
      console.log('likeResults', likeResults)
      if (likeResults.data > 0) {
        toggleHeart(true)
      } else {
        toggleHeart(false)
      }
    }
    getComments()
    checkLikes()
  }, [commentCount])

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
  }

  const unlikeStreetHandler = async (e) => {
    e.preventDefault()
    const res = await Client.delete(
      `http://localhost:3001/street/${props.user.id}/like/${props.id}`
    )
      .then((res) => console.log('unlike street successful'))
      .catch((err) => console.log(err.data))
  }

  const changeStyle = (e) => {
    e.preventDefault()
    toggleHeart(!heartClicked)
  }

  const displayComments = (e) => {
    e.preventDefault()
    toggleConvo(!convoClicked)
  }

  return (
    <div className="PostFeed">
      <div className="PostContainer PostContent">
        {props.user.id === props.authorId ? (
          <FontAwesomeIcon
            icon={faXmark}
            id="StreetClose"
            onClick={deleteStreetHandler}
            pull="right"
          />
        ) : null}
        {props.user.id === props.authorId ? (
          <FontAwesomeIcon icon={faPenToSquare} id="StreetEdit" pull="right" />
        ) : null}
        <span>
          <img src={props.avatar} alt="avatar" />
        </span>
        <span id="Name">{props.firstName}</span>
        <span id="Handle">@{props.userName}</span>
        <p id="FeedContent">{props.content}</p>
        <div>
          <form
            onSubmit={updateStreetHandleChange}
            className="updateCommentForm"
          >
            <input
              required
              type="text"
              value={updateStreet.content}
              placeholder="Edit Street"
              onChange={(e) =>
                setUpdateStreet({
                  ...updateStreet,
                  content: e.target.value,
                  isEdited: true
                })
              }
            ></input>
            <button className="submitButton" text="Submit">
              Edit Street
            </button>
          </form>
        </div>
      </div>
      <div className="IconBar">
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
