import fs from 'fs';
import path from 'path';

// Generate a 20-second sample WAV file containing warm speech-band tones and acoustic texture
const sampleRate = 44100;
const numChannels = 2;
const durationSeconds = 18;
const numSamples = sampleRate * durationSeconds;
const bytesPerSample = 2; // 16-bit
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = numSamples * blockAlign;

const buffer = Buffer.alloc(44 + dataSize);

// RIFF chunk descriptor
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt sub-chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample

// data sub-chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Generate gentle vocal-range harmonic presence and ambient studio tone
let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  
  // Intro chime / podcast opening chord followed by gentle warm voice-frequency cadence
  const envelope = Math.min(1, t * 1.5) * Math.min(1, (durationSeconds - t) * 1.5);
  
  // Fundamental speech formant frequencies (~220Hz, ~440Hz, ~880Hz) with gentle modulation
  const voiceTone = (
    Math.sin(2 * Math.PI * 220 * t) * 0.25 +
    Math.sin(2 * Math.PI * 330 * t) * 0.15 +
    Math.sin(2 * Math.PI * 440 * t) * 0.12 +
    Math.sin(2 * Math.PI * 110 * t) * 0.3
  );

  // Subtle natural room ambiance
  const room = (Math.random() * 2 - 1) * 0.015;
  const sampleValue = Math.max(-1, Math.min(1, (voiceTone + room) * envelope * 0.6));
  const int16Val = Math.floor(sampleValue * 32767);

  // Left & Right
  buffer.writeInt16LE(int16Val, offset);
  buffer.writeInt16LE(int16Val, offset + 2);
  offset += 4;
}

const outputPath = path.join(process.cwd(), 'public', 'audio', 'podcast-raw-audio.wav');
fs.writeFileSync(outputPath, buffer);
console.log('Created WAV file at:', outputPath, 'size:', buffer.length);
