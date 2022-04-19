import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
//import axios from 'axios'
//import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Client from '../services/api'

const StreetPost = (props) => {
  //let { id } = useParams()
  const [allComments, setAllComments] = useState([])
  const [isClicked, setClicked] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [heartClicked, toggleHeart] = useState(false)
  const [convoClicked, toggleConvo] = useState(false)

  useEffect(() => {
    const getComments = async () => {
      const results = await Client.get(
        `http://localhost:3001/comment/${props.id}`
      )
      //console.log('getComments useEffect', results)
      setAllComments(results.data)
    }
    getComments()
  }, [commentCount])

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
      {/* <p>Street {props.id}</p> */}
      <div className="PostContainer PostContent">
        <span id="Name">{props.firstName}</span>
        <span id="Handle">@{props.userName}</span>
        <p id="FeedContent">{props.content}</p>
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
