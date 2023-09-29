import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentInput: '', nameInput: '', commentsList: []}

  userName = event => {
    this.setState({nameInput: event.target.value})
  }

  userComment = event => {
    this.setState({commentInput: event.target.value})
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    const deleteComment = commentsList.filter(
      eachComment => eachComment.id !== commentId,
    )
    return this.setState({commentsList: deleteComment})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachCommentItem => {
        if (id === eachCommentItem.id) {
          return {...eachCommentItem, isLiked: !eachCommentItem.isLiked}
        }
        return eachCommentItem
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="title">Comments</h1>
          <div className="card">
            <form className="input-container" onSubmit={this.onAddComment}>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="user-input"
                placeholder="Your Name"
                type="text"
                onChange={this.userName}
                value={nameInput}
                id="userInput"
              />
              <textarea
                value={commentInput}
                onChange={this.userComment}
                className="user-comment"
                placeholder="Your Comments"
                htmlFor="userInput"
                name="userInput"
                rows="5"
                cols="30"
              />

              <button type="submit" onClick={this.onAddComment} className="btn">
                Add Comment
              </button>
            </form>
            <img
              className="comments-img"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>

          <hr className="line" />
          <div className="comments-counter-container">
            <div className="comments-count">{commentsList.length}</div>
            <p>Comments</p>
          </div>
          <ul className="comment-items-container">
            {this.renderCommentsList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments

// Write your code here
