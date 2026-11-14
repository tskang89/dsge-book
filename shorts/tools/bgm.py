#!/usr/bin/env python3
"""배경음악·효과음 합성(numpy). 외부 음원을 쓰지 않으므로 저작권 문제가 없다.

  from bgm import make_bgm, sfx
  y = make_bgm(seconds, seed=11, bpm=96, mood="bright", sr=44100)   # 스테레오 (N,2) float32
  s = sfx("pop", sr)                                                 # 모노 float32

mood: bright(장조, 경쾌) · calm(느린 로파이) · tense(단조, 긴장감)
같은 seed 면 같은 곡이 나온다. 에피소드마다 seed 를 바꿔 곡을 바꾼다.
"""
import numpy as np

MOODS = {
    # (음계 근음 반음, 진행(근음 도수, 화음 성격), 밝기)
    "bright": [[(0, "maj7"), (9, "m7"), (5, "maj7"), (7, "dom7")],
               [(0, "maj7"), (7, "dom7"), (9, "m7"), (5, "maj7")],
               [(5, "maj7"), (7, "dom7"), (4, "m7"), (9, "m7")]],
    "calm":   [[(0, "maj7"), (4, "m7"), (5, "maj7"), (5, "m7")],
               [(2, "m7"), (7, "dom7"), (0, "maj7"), (9, "m7")]],
    "tense":  [[(0, "m7"), (8, "maj7"), (3, "maj7"), (10, "dom7")],
               [(0, "m7"), (5, "m7"), (8, "maj7"), (7, "dom7")]],
}
CH = {"maj7": [0, 4, 7, 11], "m7": [0, 3, 7, 10], "dom7": [0, 4, 7, 10]}


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env(n, sr, a=.005, d=.3, s=.0, r=.05):
    t = np.arange(n) / sr
    e = np.where(t < a, t / a, s + (1 - s) * np.exp(-(t - a) / max(d, 1e-3)))
    rn = int(r * sr)
    if rn and n > rn:
        e[-rn:] *= np.linspace(1, 0, rn)
    return e


def epiano(f, dur, sr, vel=1.0):
    n = int(dur * sr); t = np.arange(n) / sr
    x = (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t + .3) * np.exp(-t * 3)
         + .12 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 6))
    x *= (1 + .1 * np.sin(2 * np.pi * 5 * t))  # 트레몰로
    return vel * x * env(n, sr, a=.01, d=.9, s=.15, r=.15)


def bass(f, dur, sr, vel=1.0):
    n = int(dur * sr); t = np.arange(n) / sr
    x = np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * 2 * f * t)
    return vel * np.tanh(1.5 * x) * env(n, sr, a=.008, d=.35, s=.35, r=.06)


def kick(sr):
    n = int(.35 * sr); t = np.arange(n) / sr
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 9)


def snare(sr, r):
    n = int(.22 * sr); t = np.arange(n) / sr
    noise = r.standard_normal(n)
    noise = noise - np.convolve(noise, np.ones(8) / 8, "same")  # 고역 통과(대충)
    return (.6 * noise * np.exp(-t * 18) + .3 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 25))


def hat(sr, r):
    n = int(.06 * sr); t = np.arange(n) / sr
    x = r.standard_normal(n); x = x - np.convolve(x, np.ones(4) / 4, "same")
    return x * np.exp(-t * 70)


def add(buf, x, i):
    if i >= len(buf):
        return
    m = min(len(x), len(buf) - i)
    buf[i:i + m] += x[:m]


def lowpass(x, k):
    """단극 저역 통과(따뜻한 소리). k 작을수록 어둡다."""
    y = np.empty_like(x); acc = 0.0
    # 빠른 계산: 지수 필터를 lfilter 없이 블록 단위로
    try:
        from scipy.signal import lfilter
        return lfilter([k], [1, -(1 - k)], x).astype(np.float32)
    except Exception:
        for i, v in enumerate(x):
            acc += k * (v - acc); y[i] = acc
        return y


def make_bgm(seconds, seed=1, bpm=96, mood="bright", sr=44100):
    r = np.random.default_rng(seed)
    prog = MOODS.get(mood, MOODS["bright"])[seed % len(MOODS.get(mood, MOODS["bright"]))]
    key = 48 + int(r.integers(0, 7))      # C3~F#3
    beat = 60.0 / bpm; bar = 4 * beat
    n = int((seconds + 2) * sr)
    pad = np.zeros(n, np.float32); bs = np.zeros(n, np.float32); dr = np.zeros(n, np.float32); mel = np.zeros(n, np.float32)
    K, SN, HT = kick(sr), snare(sr, r), hat(sr, r)
    nbar = int(np.ceil(seconds / bar)) + 1
    scale = [0, 2, 4, 7, 9] if mood != "tense" else [0, 3, 5, 7, 10]
    for b in range(nbar):
        root, q = prog[b % len(prog)]
        t0 = b * bar
        # 코드: 반 마디마다 다시 친다(스윙 약간)
        for half in (0, 2):
            for j, iv in enumerate(CH[q]):
                f = hz(key + 12 + root + iv)
                add(pad, epiano(f, bar / 2 + .3, sr, .16), int((t0 + half * beat + j * .012) * sr))
        # 베이스: 1·3박 근음, 4박 반 경과음
        for bt, off in ((0, 0), (2, 0), (3.5, 7)):
            add(bs, bass(hz(key - 12 + root + off), beat * (1.4 if bt < 3 else .45), sr, .5), int((t0 + bt * beat) * sr))
        # 드럼(첫 마디는 쉬고 들어간다)
        if b >= 1:
            for bt in (0, 2.5):
                add(dr, K * .9, int((t0 + bt * beat) * sr))
            for bt in (1, 3):
                add(dr, SN * .35, int((t0 + bt * beat) * sr))
            for e in range(8):
                sw = .06 * beat if e % 2 else 0
                add(dr, HT * (.18 if e % 2 else .26), int((t0 + e * beat / 2 + sw) * sr))
        # 멜로디(벨): 짝수 마디에 짧은 오음계 동기
        if b % 2 == 1 and b >= 2:
            for e in range(int(r.integers(2, 5))):
                deg = scale[int(r.integers(0, len(scale)))]
                f = hz(key + 24 + root % 12 + deg if mood != "tense" else key + 24 + deg)
                st = t0 + int(r.integers(0, 8)) * beat / 2
                x = np.sin(2 * np.pi * f * np.arange(int(.6 * sr)) / sr) * env(int(.6 * sr), sr, d=.25) * .1
                add(mel, x, int(st * sr))
    pad = lowpass(pad, .18); bs = lowpass(bs, .08)
    # 사이드체인 느낌: 킥마다 패드를 살짝 눌러 숨 쉬게
    duck = np.ones(n, np.float32)
    for b in range(1, nbar):
        for bt in (0, 2.5):
            i = int((b * bar + bt * beat) * sr); m = min(int(.25 * sr), n - i)
            if m > 0:
                duck[i:i + m] = np.minimum(duck[i:i + m], 1 - .35 * np.exp(-np.arange(m) / sr * 12))
    mix_l = (pad * duck * 1.0 + bs * .9 + dr * .55 + mel * .9)
    mix_r = (pad * duck * .9 + bs * .9 + dr * .55 + np.roll(mel, int(.012 * sr)) * .9)
    y = np.stack([mix_l, mix_r], 1)[: int(seconds * sr)]
    fade = int(1.5 * sr)
    y[:int(.4 * sr)] *= np.linspace(0, 1, int(.4 * sr))[:, None]
    y[-fade:] *= np.linspace(1, 0, fade)[:, None]
    return (y / (np.abs(y).max() + 1e-9) * .9).astype(np.float32)


def sfx(kind, sr=44100):
    t = lambda d: np.arange(int(d * sr)) / sr
    r = np.random.default_rng(len(kind))
    if kind == "pop":
        x = t(.12); f = 600 + 900 * np.exp(-x * 40)
        return (np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-x * 30) * .6).astype(np.float32)
    if kind == "ding":
        x = t(1.0)
        return ((np.sin(2 * np.pi * 1318.5 * x) + .5 * np.sin(2 * np.pi * 1975.5 * x)) * np.exp(-x * 4) * .35).astype(np.float32)
    if kind == "coin":
        a, b = t(.08), t(.5)
        return np.concatenate([np.sin(2 * np.pi * 987.8 * a) * .3,
                               np.sin(2 * np.pi * 1318.5 * b) * np.exp(-b * 6) * .35]).astype(np.float32)
    if kind == "whoosh":
        x = t(.45); w = r.standard_normal(len(x))
        f = lowpass(w.astype(np.float32), .05) * 6
        e = np.sin(np.pi * x / x[-1]) ** 2
        return (f * e * .5).astype(np.float32)
    raise ValueError(kind)
