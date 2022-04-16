import React from 'react';
import motion from '../../util/motion';


const Asteroid = ({posId, pos}) => {
    return (
        <>
          <img
            key={posId}
            id='asteroid-object'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.x, pos.y, pos.dir)} />

          {pos.xB !== pos.x && <img
            key={posId + 'a'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.xB, pos.y, pos.dir)} />}

          {pos.yB !== pos.y && <img
            key={posId + 'b'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.x, pos.yB, pos.dir)} />}


          {pos.yB !== pos.y && pos.xB !== pos.x && <img
            key={posId + 'c'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.xB, pos.yB, pos.dir)} />}
     
        </>
    )
}

export default Asteroid;