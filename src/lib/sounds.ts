// Web Audio API context (reused across calls)
let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtx;
}

/**
 * Correct answer chime — two ascending notes, cheerful feel
 * Fully offline (Web Audio API generated, no external fetch)
 */
const playCorrectChime = () => {
    try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;

        // Note 1 (C5)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.value = 523;
        gain1.gain.setValueAtTime(0.95, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc1.connect(gain1).connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.22);

        // Note 2 (E5, higher pitch)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.value = 659;
        gain2.gain.setValueAtTime(0.95, now + 0.12);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc2.connect(gain2).connect(ctx.destination);
        osc2.start(now + 0.12);
        osc2.stop(now + 0.37);
    } catch (error) {
        console.error("Error playing correct sound:", error);
    }
};

/**
 * Double Beep Error — Two short beeps, soft error feel
 * Offline ready (Web Audio API generated)
 */
const playDoubleBeepError = () => {
    try {
        const ctx = getAudioCtx();
        [0, 0.15].forEach(delay => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 300;
            gain.gain.setValueAtTime(1.0, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.1);
            osc.connect(gain).connect(ctx.destination);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.12);
        });
    } catch (error) {
        console.error("Error playing wrong sound:", error);
    }
};

export const playSound = (type: 'correct' | 'wrong') => {
    if (type === 'correct') {
        playCorrectChime();
    } else {
        playDoubleBeepError();
    }
};

export const playCorrectSound = () => playSound('correct');
export const playWrongSound = () => playSound('wrong');
