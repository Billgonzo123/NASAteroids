export function playSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.play()
}

export function stopSound(snd) {
    const el = document.getElementById(`${snd}`);
    el.pause()
    el.load(); 
}

