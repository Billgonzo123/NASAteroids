
    

    function logKeyDown(e) {

        if (!keysPressed.includes(e.key)) {
            keysPressed = [...keysPressed, e.key];
          console.log('PressedDown: ', keysPressed);
        }
    
    
      }
    
    
      function logKeyUp(e) {
        const newKeys = keysPressed.filter(key => key !== e.key);
        if (newKeys !== keysPressed) keysPressed =newKeys;
        console.log('PressedUp: ', keysPressed);
      }


  




  module.exports = {handleInput, keysPressed};  