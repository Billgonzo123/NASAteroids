export function playSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.play()
}

export function stopSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.pause()

}

export function playMenuSound(snd, setState) {
    setState(old => (snd));
    const el = document.getElementById(`menu-sound`);
    el.load();
    el.play();
}

