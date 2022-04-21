export function playSound(snd) {
    const el = document.getElementById(`${snd}`);
 
    el.play()
}
export function playSoundCancel(snd) {
    const el = document.getElementById(`${snd}`);
    el.load();
    el.play()
}

export function stopSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.pause()

}

export function playMenuSound(snd) {
    const el = document.getElementById("menu-sound");
    el.setAttribute('src',require(`../assets/snd/menu_snd/${snd}.wav`))
    el.load();
    el.play();
}

