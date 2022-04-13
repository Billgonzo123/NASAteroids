import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../util/queries';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  console.log('logged in user data', data);

  return (
    <div>
      {/* username title: ${data.me.username} */}
      <p className="title" style={{textAlign:"center", textTransform: "uppercase"}}>username</p>
      {/* avatar input */}
      <div
        // style={{`background-color`: `#212529`, padding: `1rem` }}
        className="nes-field is-inline"
      >
        <label style={{ color:`#fff` }}>
          Avatar:
        </label>
        <input
          type="text"
          id="dark_field"
          className="nes-input is-dark"
          placeholder="Image url for avatar"
        />
      </div>
      {/* XP: ${data.me.XP} */}
      <div>
        <p>XP: 10,000</p>
      </div>
      {/* user scores */}
      <div className="lists">
      <ul className="nes-list is-circle">
          SCORES:
            {/* {data.me.highscores.map((score) => {
              return <li>${score}</li>;
            })} */}
            <li>100</li>
            <li>200</li>
          </ul>
      </div>
    </div>
  );
};

export default Profile;
