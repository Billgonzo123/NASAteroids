export function checkScreenScale(screenWidth,setScreenScale) {
  const screenHeight = document.documentElement.clientHeight;
    if (screenWidth !== window.innerWidth) {
        screenWidth = window.innerWidth;
        setScreenScale((window.innerWidth) / (1920));
      }
  
}