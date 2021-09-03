import axios from 'axios'

export default function followFunctions() {
  const follow = (mainUsername, followUserId) => {
    return axios.get('/api/userId', {
      params: {
        username: mainUsername
      }
    }).then((data) => {
      axios.post("/api/user/follow", {
        params: {
          mainUserId : data.data[0].id,
          followUserId
        }
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
  const unfollow = (mainUsername, followUserId) => {
    return axios.get('/api/userId', {
      params: {
        username: mainUsername
      }
    }).then((data) => {
      axios.post("/api/user/unfollow", {
        params: {
          mainUserId : data.data[0].id,
          followUserId
        }
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
  return { follow, unfollow }
}
