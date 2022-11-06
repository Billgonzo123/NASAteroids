import { useEffect, useRef } from 'react';

const Touch = ({ tpCache, spaceDown }) => {
   

    function toggleFullscreen() {
        const elem = document.querySelector("body");
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
                alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    function getTouch(event) {
        const e = event.touches;
        tpCache.current = [];
        for (let i = 0; i < event.touches.length; i++) {
            tpCache.current.push(e[i].target.id)
        }

        //simulate space press
        if (tpCache.current.includes("shootBtn") && spaceDown.current !== 2) spaceDown.current = 1;
        if (!tpCache.current.includes("shootBtn")) spaceDown.current = 0;
    }

    useEffect(() => {
        window.addEventListener('touchstart', function (event) {
            getTouch(event)
        }, false);

        window.addEventListener('touchmove', function (event) {

            //getTouch (event)
        }, false);

        window.addEventListener('touchend', function (event) {

            if (event.target.id === 'FullScreen') {
                toggleFullscreen()
            } else {
                getTouch(event)
            }
        }, false);



    }, [])

    return (<>
    <button id='leftBtn'>leftBtn</button>
    <button id='rightBtn'>rightBtn</button>
    <button id='thrustBtn'>thrustBtn</button>
    <button id='shootBtn'>shootBtn</button>
    </>)
}

export default Touch;