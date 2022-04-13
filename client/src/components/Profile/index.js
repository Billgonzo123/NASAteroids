import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';

import Auth from '../../util/auth';

const Profile = () => {

  const {loading, data } = useQuery(GET_ME);
  console.log(data);
  return (
   <>
       test!
   </>
  )
}


export default Profile;