import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faRegThumb } from '@fortawesome/free-regular-svg-icons'

const Comment = (props) => {
  const [isClicked, setClicked] = useState(false)

  const green = '#018749'
  const black = '#000000'

  const toggleClick = (e) => {
    e.preventDefault()
    setClicked(!isClicked)
  }

  return (
    <div className="CommentContainer">
      {/* <h4>Comment</h4> */}
      {/* <h5>Author: {props.authorId} </h5> */}
      {/* <h5>Street: {props.streetId}</h5> */}
      <FontAwesomeIcon icon={faXmark} id="Close" pull="right" />
      <FontAwesomeIcon icon={faPenToSquare} id="Edit" pull="right" />
      <h4>@{props.userName}</h4>
      <p>{props.content}</p>
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
