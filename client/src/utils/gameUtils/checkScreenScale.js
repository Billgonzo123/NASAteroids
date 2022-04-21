export function checkScreenScale(screenWidth,setScreenScale) {
    if (screenWidth !== window.innerWidth) {
        screenWidth = window.innerWidth;
        setScreenScale((window.innerWidth) / (1920));
      }
}