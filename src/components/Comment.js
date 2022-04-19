import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as faRegThumb } from '@fortawesome/free-regular-svg-icons'

const Comment = (props) => {
  const [isClicked, setClicked] = useState(false)

  const green = '#01796F'
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
      <h4>@user_name</h4>
      <p>{props.content}</p>
      <FontAwesomeIcon
        icon={faRegThumb}
        id="RegLike"
        pull="right"
        onClick={toggleClick}
        color={!isClicked ? green : black}
      />
    </div>
  )
}

export default Comment
