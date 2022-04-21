import React from 'react';
import motion from '../../utils/gameUtils/motion';

//generates a new asteroid element 
//pos contains all of the information saved in each asteroid object
const Asteroid = ({posId, pos}) => {
  //sizes uses the number saved in size (0-2) to decide which sprite to draw
  const sizes = ['asteroid_sm_sprt','asteroid_med_sprt', 'asteroid_large_sprt']
  const sprite = sizes[pos.size];
  //we must return 4 elements, 3 of which are conditional for rendering the illusion of the screen wrapping
    return (
        <>
          <img
            key={posId}
            id='asteroid-object'
            alt='asteroid-sprite'
            src={require( `../../assets/img/${sprite}.png`)}
            style={motion(pos.x, pos.y, pos.dir)} 
            />
            

          {pos.xB !== pos.x && <img
            key={posId + 'a'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require(`../../assets/img/${sprite}.png`)}
            style={motion(pos.xB, pos.y, pos.dir)} 
            />}

          {pos.yB !== pos.y && <img
            key={posId + 'b'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require(`../../assets/img/${sprite}.png`)}
            style={motion(pos.x, pos.yB, pos.dir)} 
            />}


          {pos.yB !== pos.y && pos.xB !== pos.x && <img
            key={posId + 'c'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require(`../../assets/img/${sprite}.png`)}
            style={motion(pos.xB, pos.yB, pos.dir)} 
            />}
     
        </>
    )
}

export default Asteroid;