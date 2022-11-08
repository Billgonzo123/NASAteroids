export function checkScreenScale(screenWidth,setScreenScale) {
  const h = window.innerHeight;
  const w = window.innerWidth;
  (w/h) > 1.8 ? setScreenScale((h) / (1080)) : setScreenScale((w) / (1920));
  
}