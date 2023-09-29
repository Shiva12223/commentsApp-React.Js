// Write your code here

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likedTextClassName = isLiked ? 'button active' : 'button'
  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p>{initial}</p>
        </div>
        <div className="each-comment-container">
          <div className="profile-name-time">
            <p className="user-name">{name}</p>
            <p className="comment-time">{postedTime} ago</p>
          </div>
          <p className="comment-content">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-button">
          <img src={likedImage} alt="like" />
          <button
            onClick={onClickLike}
            type="button"
            className={likedTextClassName}
          >
            Like
          </button>
        </div>
        <button
          className="delete"
          type="button"
          data-testId="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
