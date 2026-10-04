/**
 * Web Audio Sound Generator for Tamara Dela Cruz Studio Portfolio
 * Generates synthetic cinematic textures, brass braams, and arpeggios
 * with real-time waveform visualization data.
 */

class AudioSynthesizerEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private stemGains: GainNode[] = [];
  private stemActiveState = [true, true, true, true];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime, 0.05);
    }
  }

  public toggleStem(index: number, active: boolean) {
    this.stemActiveState[index] = active;
    if (this.stemGains[index] && this.ctx) {
      this.stemGains[index].gain.setTargetAtTime(active ? 0.8 : 0.001, this.ctx.currentTime, 0.05);
    }
  }

  public getStemState(index: number): boolean {
    return this.stemActiveState[index] ?? true;
  }

  public stop() {
    this.activeNodes.forEach(node => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {
          // ignore already stopped
        }
      } else {
        try {
          node.disconnect();
        } catch {
          // ignore
        }
      }
    });

    this.activeNodes = [];
    this.stemGains = [];
    this.isPlaying = false;
    this.currentTrackId = null;
  }

  public playTrack(trackId: string, onEnd?: () => void) {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.currentTrackId = trackId;

    // Create 4 stem gain channels
    this.stemGains = [0, 1, 2, 3].map(i => {
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(this.stemActiveState[i] ? 0.8 : 0.001, this.ctx!.currentTime);
      g.connect(this.masterGain!);
      return g;
    });

    const now = this.ctx.currentTime;

    switch (trackId) {
      case 'static-sea-cue':
        this.playStaticSea(now);
        break;
      case 'chrono-drift-cue':
        this.playChronoDrift(now);
        break;
      case 'eclipse-braam-cue':
        this.playEclipseBraam(now);
        break;
      case 'nocturne-poly-cue':
      default:
        this.playNocturnePoly(now);
        break;
    }

    // Auto-loop or reset timer
    const duration = trackId === 'eclipse-braam-cue' ? 6000 : 12000;
    const loopTimer = window.setTimeout(() => {
      if (this.isPlaying && this.currentTrackId === trackId) {
        this.playTrack(trackId, onEnd);
      } else if (onEnd) {
        onEnd();
      }
    }, duration);
    this.activeNodes.push(loopTimer);
  }

  private playStaticSea(now: number) {
    if (!this.ctx) return;

    // Stem 0: Deep Sub Bass (C1 ~ 32.7Hz)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(32.7, now);
    subOsc.frequency.exponentialRampToValueAtTime(34, now + 5);
    subOsc.frequency.exponentialRampToValueAtTime(32.7, now + 10);
    subOsc.connect(this.stemGains[0]);
    subOsc.start(now);
    this.activeNodes.push(subOsc);

    // Stem 1: Analog Drone (C2 + G2 dual saw with lowpass filter)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);
    filter.frequency.linearRampToValueAtTime(380, now + 4);
    filter.frequency.linearRampToValueAtTime(200, now + 10);
    filter.Q.setValueAtTime(4, now);
    filter.connect(this.stemGains[1]);

    const drone1 = this.ctx.createOscillator();
    drone1.type = 'sawtooth';
    drone1.frequency.setValueAtTime(65.4, now);
    drone1.connect(filter);
    drone1.start(now);
    this.activeNodes.push(drone1);

    const drone2 = this.ctx.createOscillator();
    drone2.type = 'sawtooth';
    drone2.frequency.setValueAtTime(98.0, now);
    drone2.detune.setValueAtTime(7, now);
    drone2.connect(filter);
    drone2.start(now);
    this.activeNodes.push(drone2);

    // Stem 2: String Bowed Harmonics (F3 / C4 / G4 sine shimmer)
    const notes = [174.6, 261.6, 392.0];
    notes.forEach((freq, idx) => {
      const harm = this.ctx!.createOscillator();
      harm.type = 'sine';
      harm.frequency.setValueAtTime(freq, now + idx * 0.8);
      
      const harmGain = this.ctx!.createGain();
      harmGain.gain.setValueAtTime(0, now);
      harmGain.gain.linearRampToValueAtTime(0.15, now + 1.5 + idx * 0.8);
      harmGain.gain.linearRampToValueAtTime(0.04, now + 8);
      
      harm.connect(harmGain);
      harmGain.connect(this.stemGains[2]);
      harm.start(now);
      this.activeNodes.push(harm);
    });

    // Stem 3: Tape Friction & Noise Texture
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, now);
    noiseFilter.Q.setValueAtTime(1.5, now);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(this.stemGains[3]);
    noiseNode.start(now);
    this.activeNodes.push(noiseNode);
  }

  private playChronoDrift(now: number) {
    if (!this.ctx) return;

    // Stem 0: Modular Synth Arpeggio (16th notes pulse)
    const bpm = 124;
    const stepDuration = 60 / bpm / 2; // 8th note steps
    const arpFreqs = [110, 130.8, 146.8, 164.8, 220, 196, 164.8, 130.8]; // A minor pentatonic

    for (let step = 0; step < 16; step++) {
      const stepTime = now + step * stepDuration;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(arpFreqs[step % arpFreqs.length], stepTime);

      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, stepTime);
      env.gain.linearRampToValueAtTime(0.2, stepTime + 0.02);
      env.gain.exponentialRampToValueAtTime(0.001, stepTime + stepDuration * 0.85);

      const f = this.ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(600 + (step * 80), stepTime);
      f.Q.setValueAtTime(6, stepTime);

      osc.connect(f);
      f.connect(env);
      env.connect(this.stemGains[0]);

      osc.start(stepTime);
      osc.stop(stepTime + stepDuration);
      this.activeNodes.push(osc);
    }

    // Stem 1: Kinetic Kick/Sub Pulse on beats 0, 4, 8, 12
    for (let beat = 0; beat < 4; beat++) {
      const beatTime = now + beat * (60 / bpm);
      const kickOsc = this.ctx.createOscillator();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(120, beatTime);
      kickOsc.frequency.exponentialRampToValueAtTime(45, beatTime + 0.1);

      const kickGain = this.ctx.createGain();
      kickGain.gain.setValueAtTime(0.5, beatTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.25);

      kickOsc.connect(kickGain);
      kickGain.connect(this.stemGains[1]);

      kickOsc.start(beatTime);
      kickOsc.stop(beatTime + 0.3);
      this.activeNodes.push(kickOsc);
    }

    // Stem 2: High Cybernetic UI Clicks & Hats
    for (let step = 0; step < 16; step++) {
      const hatTime = now + step * (stepDuration / 2);
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.03, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.08;
      }
      const hatSource = this.ctx.createBufferSource();
      hatSource.buffer = buffer;

      const hp = this.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(6500, hatTime);

      hatSource.connect(hp);
      hp.connect(this.stemGains[2]);
      hatSource.start(hatTime);
      this.activeNodes.push(hatSource);
    }

    // Stem 3: Sub Drone Base
    const bass = this.ctx.createOscillator();
    bass.type = 'triangle';
    bass.frequency.setValueAtTime(55, now);
    bass.connect(this.stemGains[3]);
    bass.start(now);
    this.activeNodes.push(bass);
  }

  private playEclipseBraam(now: number) {
    if (!this.ctx) return;

    // Stem 0: Massive Brass Lead Braam (Low D1 & D2 Detuned Saw Swarm)
    const baseFreq = 36.7; // D1
    [-12, -4, 0, 4, 12].forEach(cents => {
      const saw = this.ctx!.createOscillator();
      saw.type = 'sawtooth';
      saw.frequency.setValueAtTime(baseFreq, now);
      saw.detune.setValueAtTime(cents, now);

      const f = this.ctx!.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(150, now);
      f.frequency.exponentialRampToValueAtTime(1400, now + 0.3);
      f.frequency.exponentialRampToValueAtTime(250, now + 4.5);
      f.Q.setValueAtTime(5, now);

      const env = this.ctx!.createGain();
      env.gain.setValueAtTime(0.01, now);
      env.gain.exponentialRampToValueAtTime(0.35, now + 0.15);
      env.gain.exponentialRampToValueAtTime(0.001, now + 5.0);

      saw.connect(f);
      f.connect(env);
      env.connect(this.stemGains[0]);

      saw.start(now);
      saw.stop(now + 5.2);
      this.activeNodes.push(saw);
    });

    // Stem 1: Sub Bass Drop
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(75, now);
    sub.frequency.exponentialRampToValueAtTime(32, now + 3.0);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

    sub.connect(subGain);
    subGain.connect(this.stemGains[1]);
    sub.start(now);
    sub.stop(now + 4.6);
    this.activeNodes.push(sub);

    // Stem 2: Distorted Metal Friction / Shepard Riser
    const metal = this.ctx.createOscillator();
    metal.type = 'square';
    metal.frequency.setValueAtTime(220, now);
    metal.frequency.exponentialRampToValueAtTime(880, now + 3.5);

    const metalGain = this.ctx.createGain();
    metalGain.gain.setValueAtTime(0.001, now);
    metalGain.gain.linearRampToValueAtTime(0.08, now + 1.5);
    metalGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

    metal.connect(metalGain);
    metalGain.connect(this.stemGains[2]);
    metal.start(now);
    metal.stop(now + 4.2);
    this.activeNodes.push(metal);

    // Stem 3: Reverb / Ambient Tail
    const tailBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2.5, this.ctx.sampleRate);
    const d = tailBuffer.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.8)) * 0.1;
    }
    const tailSource = this.ctx.createBufferSource();
    tailSource.buffer = tailBuffer;

    const tailFilter = this.ctx.createBiquadFilter();
    tailFilter.type = 'lowpass';
    tailFilter.frequency.setValueAtTime(1800, now);

    tailSource.connect(tailFilter);
    tailFilter.connect(this.stemGains[3]);
    tailSource.start(now + 0.1);
    this.activeNodes.push(tailSource);
  }

  private playNocturnePoly(now: number) {
    if (!this.ctx) return;

    // Stem 0: Prophet-6 Warm Poly Chords (Dbmaj9 -> Bbm7 -> Abadd9)
    const chords = [
      [138.6, 174.6, 207.7, 261.6], // Db F Ab C
      [116.5, 138.6, 174.6, 207.7], // Bb Db F Ab
      [103.8, 130.8, 155.6, 207.7], // Ab C Eb Ab
    ];

    chords.forEach((chord, chordIdx) => {
      const chordStart = now + chordIdx * 3.5;
      chord.forEach(noteFreq => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(noteFreq, chordStart);

        // LFO for vintage analog pitch drift
        const lfo = this.ctx!.createOscillator();
        lfo.frequency.setValueAtTime(2.5, chordStart);
        const lfoGain = this.ctx!.createGain();
        lfoGain.gain.setValueAtTime(1.5, chordStart);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.detune);
        lfo.start(chordStart);
        this.activeNodes.push(lfo);

        const env = this.ctx!.createGain();
        env.gain.setValueAtTime(0, chordStart);
        env.gain.linearRampToValueAtTime(0.12, chordStart + 0.4);
        env.gain.setValueAtTime(0.10, chordStart + 2.8);
        env.gain.linearRampToValueAtTime(0.001, chordStart + 3.4);

        osc.connect(env);
        env.connect(this.stemGains[0]);
        osc.start(chordStart);
        osc.stop(chordStart + 3.5);
        this.activeNodes.push(osc);
      });
    });

    // Stem 1: Juno-106 Chorus High Layer
    const highPad = this.ctx.createOscillator();
    highPad.type = 'sawtooth';
    highPad.frequency.setValueAtTime(415.3, now); // Ab4

    const padFilter = this.ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(850, now);

    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.04, now);

    highPad.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(this.stemGains[1]);
    highPad.start(now);
    this.activeNodes.push(highPad);

    // Stem 2: Tape Flutter & Vinyl Crackle
    const flutterOsc = this.ctx.createOscillator();
    flutterOsc.type = 'sine';
    flutterOsc.frequency.setValueAtTime(0.5, now);
    const flutterGain = this.ctx.createGain();
    flutterGain.gain.setValueAtTime(4, now);
    flutterOsc.connect(flutterGain);
    flutterGain.connect(highPad.detune);
    flutterOsc.start(now);
    this.activeNodes.push(flutterOsc);

    // Stem 3: Sub Acoustic Bass Foundation
    const subBass = this.ctx.createOscillator();
    subBass.type = 'sine';
    subBass.frequency.setValueAtTime(69.3, now); // Db2
    subBass.connect(this.stemGains[3]);
    subBass.start(now);
    this.activeNodes.push(subBass);
  }

  public getTrackState(): { isPlaying: boolean; trackId: string | null } {
    return {
      isPlaying: this.isPlaying,
      trackId: this.currentTrackId,
    };
  }
}

export const audioEngine = new AudioSynthesizerEngine();
