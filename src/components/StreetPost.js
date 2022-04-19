import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
//import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Client from '../services/api'

const StreetPost = (props) => {
  const [allComments, setAllComments] = useState([])
  const [isClicked, setClicked] = useState(false)
  const [commentCount, setCommentCount] = useState(10000)
  const [heartClicked, toggleHeart] = useState(false)
  const [convoClicked, toggleConvo] = useState(false)

  useEffect(() => {
    const getComments = async () => {
      const results = await Client.get(
        `http://localhost:3001/comment/${props.id}`
      )
      setAllComments(results.data)
    }
    getComments()
  }, [commentCount])

  const deleteStreetHandler = async () => {
    const res = await Client.delete(
      `http://localhost:3001/street/${props.user.id}/delete/${props.id}`
    )
      .then((res) => console.log('delete street successful'))
      .catch((err) => console.log(err.data))
    props.setStreetCount(props.streetCount + 1)
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
        <span id="Name">{props.firstName}</span>
        <span id="Handle">@{props.userName}</span>
        <p id="FeedContent">{props.content}</p>
        <button className="btn btn-danger" onClick={deleteStreetHandler}>
          Delete
        </button>
      </div>
      <div className="IconBar">
        {!heartClicked ? (
          <FontAwesomeIcon
            icon={faHeartRegular}
            id="RegHeart"
            onClick={changeStyle}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeartSolid}
            id="SolidHeart"
            onClick={changeStyle}
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
            // streetId={comment.streetId}
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
      />
    </div>
  )
}

export default StreetPost
