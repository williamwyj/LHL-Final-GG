import React, {useContext} from 'react';
import { authContext } from "../../providers/AuthProvider";
import { Button } from 'react-bootstrap';
import "./UserProfile.scss"

export default function UserProfile(props) {

  const { token } = useContext(authContext);
  return (
    <section className="container userprofile">
      <div className="profileimgname"> 
        <img className="profileimg" src={props.thumbnail} alt={props.username} />
        {props.username}
        {!token && <Button>Follow</Button>}
      </div>
      <div className="profilestats">
          <p>Reviews: {props.reviews}</p>
          <p>Followers: {props.followers}</p>
          <p>Followed:{props.followed}</p>
      </div>
    </section>
  )
}