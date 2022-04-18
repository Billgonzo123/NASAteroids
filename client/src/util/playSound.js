export function playSound(snd) {
    const el = document.getElementById(`${snd}`);
 
    el.play()
}
export function playSoundCancle(snd) {
    const el = document.getElementById(`${snd}`);
    el.load();
    el.play()
}

export function stopSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.pause()

}

export async function playMenuSound(snd, setState) {
   await setState(old => (snd));
    const el = document.getElementById(`menu-sound`);
    el.load();
    el.play();
}

