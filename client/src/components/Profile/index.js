import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';

import Auth from '../../util/auth';

const Profile = () => {
  const [login] = useMutation(LOGIN_USER);
  const { loading, data } = useQuery(GET_ME);
  console.log(data);

  return (
    <div class="nes-container is-dark with-title">
      {/* username title */}
      <p class="title">${data.me.username}</p>
      {/* avatar input */}
      <div
        style="background-color:#212529; padding: 1rem;"
        class="nes-field is-inline"
      >
        <label for="dark_field" style="color:#fff;">
          Avatar:
        </label>
        <input
          type="text"
          id="dark_field"
          class="nes-input is-dark"
          placeholder="Image url for avatar"
        />
      </div>
      {/* XP */}
      <div>
        <p>XP: ${data.me.XP}</p>
      </div>
      {/* user scores */}
      <div>
        <p>Highscores:</p>
      </div>
    </div>
  );
};

export default Profile;
