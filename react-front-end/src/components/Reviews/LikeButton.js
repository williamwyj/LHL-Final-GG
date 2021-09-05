import React from 'react';
import Button from 'react-bootstrap/Button'

const ButtonLike = function(props) {
  if (props.type === 'like') {
    return (
    <Button variant="outline-warning" className="rating" type="submit" onClick={props.action}>
        👍 {props.likes}
      </Button>
    )
  }
  if (props.type === 'haha') {
    return (
    <Button variant="outline-warning" className="rating" type="submit" onClick={props.action}>
        🤣 {props.likes}
      </Button>
    )
  }
  if (props.type === 'hmm') {
    return (
    <Button variant="outline-warning" className="rating" type="submit" onClick={props.action}>
        🤔 {props.likes}
      </Button>
    )
  }
}

const ButtonUnlike = function(props) {
  if (props.type === 'like') {
    return (
    <Button variant="warning" className="rating" type="submit" onClick={props.action}>
        👍 {Number(props.likes) + 1}
      </Button>
    )
  }
  if (props.type === 'haha') {
    return (
    <Button variant="warning" className="rating" type="submit" onClick={props.action}>
        🤣 {Number(props.likes) + 1}
      </Button>
    )
  }
  if (props.type === 'hmm') {
    return (
    <Button variant="warning" className="rating" type="submit" onClick={props.action}>
        🤔 {Number(props.likes) + 1}
      </Button>
    )
  }
}

export {ButtonLike, ButtonUnlike};