import React from 'react';

export default function UserProfile(props) {
  return (
    <section className="container userprofile">
      <img className="profileimg" src={props.thumbnail} alt={props.name} />
    </section>
  )
}