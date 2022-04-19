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

  const getComments = async () => {
    const results = await Client.get(
      `http://localhost:3001/comment/${props.id}`
    )
    setAllComments(results.data)
  }
  useEffect(() => {
    getComments()
  }, [props.id])

  const changeStyle = (e) => {
    e.preventDefault()
    setClicked(!isClicked)
  }

  return (
    <div className="PostFeed">
      {/* <p>Street {props.id}</p> */}
      <div className="PostContainer PostContent">
        <span id="Name">Jane Doe</span>
        <span id="Handle">@user_name</span>
        <p id="FeedContent">{props.content}</p>
      </div>
      <div className="IconBar">
        {!isClicked ? (
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
        <FontAwesomeIcon icon={faComment} id="ConvoBubble" />
      </div>
      {allComments.map((comment) => (
        <Comment
          key={comment.id}
          // streetId={comment.streetId}
          authorId={comment.authorId}
          content={comment.content}
        />
      ))}
      <CommentForm
        user={props.user}
        streetId={props.id}
        getComments={getComments}
      />
    </div>
  )
}

export default StreetPost
