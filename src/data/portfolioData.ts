import { DemoReel, ProjectWork, StudioGearCategory, AudioSynthTrack } from '../types';

export const DEMO_REELS: Record<'music' | 'game', DemoReel> = {
  music: {
    id: 'music',
    title: 'Music Score Demo Reel',
    category: 'Film & Orchestral',
    subtitle: 'Curated Feature & Theatrical Score Cues',
    defaultVideoId: 'RM6sVbtLmP4',
    description:
      'A curated showcase of original dramatic themes, live string quartet recordings, hybrid analog modular synthesizer compositions, and atmospheric tension pieces composed for feature films and television dramas.',
    tags: ['Orchestral Score', 'Hybrid Synth', 'Live Strings', 'Stereo & 5.1'],
    cues: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Opening: The Frozen Threshold',
        description: 'Nordic cello harmonics, warm tape sub pulses, and felt piano.',
      },
      {
        time: '01:14',
        seconds: 74,
        title: 'Pursuit at Sector 4',
        description: 'Syncopated analog poly-synths, aggressive taiko drums, and brass swells.',
      },
      {
        time: '02:35',
        seconds: 155,
        title: 'Nocturne for Lost Cities',
        description: 'Intimate solo cello lead with ambient shimmering reverb decay.',
      },
      {
        time: '03:52',
        seconds: 232,
        title: 'Cosmic Void Re-entry',
        description: 'Eurorack modular noise washes and massive brass crescendo.',
      },
    ],
  },
  game: {
    id: 'game',
    title: 'Game Sound Design Demo Reel',
    category: 'Interactive Audio & SFX',
    subtitle: 'Broadcast-Ready & Procedural Game Audio',
    defaultVideoId: 'vgveSt6INQA',
    description:
      'Demonstrating dynamic adaptive audio, procedural weapon synthesis, tactile UI feedback, and broadcast-ready sound design tailored for desktop PC/console games as well as high-energy casual arcade audio.',
    tags: ['Audiokinetic Wwise', 'Procedural SFX', 'Spatial 3D', 'Adaptive Music'],
    cues: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Chrono Drift: Combat Transitions',
        description: 'Seamless adaptive interactive audio layers driven by game states in Wwise.',
      },
      {
        time: '01:05',
        seconds: 65,
        title: 'Procedural Ballistics & Impacts',
        description: 'Modular synthesis transient generation and real-time physical resonance.',
      },
      {
        time: '02:18',
        seconds: 138,
        title: 'Arcade Jackpot & High Roller SFX',
        description: 'Crisp coin acoustics, frequency-tuned riser chimes, and tactile tactile haptics.',
      },
      {
        time: '03:30',
        seconds: 210,
        title: 'Cybernetic Boss Encounter',
        description: 'Full 3D binaural positional audio with dynamic sidechain ducking.',
      },
    ],
  },
};

export const SELECTED_WORKS: ProjectWork[] = [
  {
    id: 'static-sea',
    title: 'The Static Sea',
    category: 'film',
    categoryLabel: 'Feature Film',
    year: '2025',
    client: 'Independent Psychological Drama',
    role: 'Composer & Lead Audio Mixer',
    description:
      'Full original score blending hydrophone textures, cello harmonics, and low-frequency analog sub pulses for an acclaimed psychological sci-fi film.',
    details:
      'Scored across a six-month period, The Static Sea required a custom acoustic palette. Tamara submerged contact microphones and hydrophones in arctic seawater to capture raw organic textures, subsequently processed through vintage tape loops and layered with a live 12-piece string ensemble.',
    keyCues: [
      'Submerged Memory (Main Title)',
      'Pressure Gradient (Cello & Sub)',
      'The Bends (Dissonant Clusters)',
      'Surfacing (Harmonic Resolution)',
    ],
    technologies: ['Pro Tools Ultimate', 'Aquarian H2a Hydrophone', 'Sequential Prophet-6', 'Neumann KM184'],
    deliverables: ['Original Motion Picture Soundtrack (22 Cues)', '5.1 Theatrical Mix', 'M&E Stems'],
    reelRef: 'music',
    cueSeconds: 0,
  },
  {
    id: 'chrono-drift',
    title: 'Chrono Drift',
    category: 'game',
    categoryLabel: 'Video Game',
    year: '2025',
    client: 'Starlight Interactive (Steam / PC)',
    role: 'Lead Sound Designer & Audio Implementation',
    description:
      'Dynamic interactive audio implementation with Audiokinetic Wwise, procedural weapon audio, and seamless adaptive combat state music.',
    details:
      'Implemented over 1,400 sound assets directly into Unity using Audiokinetic Wwise. Designed dynamic RTPC (Real-Time Parameter Control) variables that modulate time-dilation effects, engine whine, and combat tension in real-time as player health decreases.',
    keyCues: [
      'Wwise Switch Containers (Idle -> Combat)',
      'Time-Dilation Pitch Modulator',
      'Quantum Laser Transient Layers',
      'Tactile HUD Feedback System',
    ],
    technologies: ['Audiokinetic Wwise 2024', 'Unity 6 Engine', 'Eurorack Modular', 'Sound Devices MixPre-6'],
    deliverables: ['Wwise SoundBanks (.bnk)', 'C# Audio Integration Scripts', 'Dynamic Music Score (9 Stems)'],
    reelRef: 'game',
    cueSeconds: 0,
  },
  {
    id: 'nocturne-mirage',
    title: 'Mara — Nocturne Mirage',
    category: 'production',
    categoryLabel: 'Artist EP',
    year: '2024',
    client: 'Velvet Records (Vinyl & Digital)',
    role: 'Record Producer & Dolby Atmos Mixer',
    description:
      'Full 5-track EP production, vintage synthesizer tracking (Sequential Prophet & Juno-106), mixdown, and Dolby Atmos immersive master.',
    details:
      'Helmed complete production duties from pre-production arrangement to final spatial Dolby Atmos mastering. Featured live acoustic percussion fused with vintage Roland Juno-106 chorus patches and vocal tape delays.',
    keyCues: [
      'Velvet Horizon (Track 01)',
      'Neon Rain (Track 02)',
      'Echoes in Amber (Track 03)',
      'Midnight Drift (Track 04)',
    ],
    technologies: ['Logic Pro 11', 'Dolby Atmos Renderer', 'Roland Juno-106', 'Empirical Labs Distressor'],
    deliverables: ['Vinyl Master (24-bit/96kHz)', 'Dolby Atmos ADM BWF', 'Apple Digital Masters'],
    reelRef: 'music',
    cueSeconds: 155,
  },
  {
    id: 'eclipse-protocol',
    title: 'Eclipse Protocol',
    category: 'film',
    categoryLabel: 'Theatrical Trailer',
    year: '2024',
    client: 'Warner Bros Spec Campaign',
    role: 'Trailer Composer & Sound Designer',
    description:
      'Custom theatrical braams, analog sub drops, tension risers, and heavy mechanical sound design for motion picture marketing.',
    details:
      'Designed to pierce through dialogue and multi-channel theatre sound systems, this trailer suite utilizes custom bowed cymbal textures, hydraulic piston field recordings, and heavy 8-string electric cello hits.',
    keyCues: [
      'Sub-Braam Impact in D',
      'Shepard Tone Tension Riser',
      'Mechanical Shutters Stop',
      'Orchestral Climax Hit',
    ],
    technologies: ['Ableton Live 12', 'Serum & Phase Plant', 'Sennheiser MKH 416', 'Genelec 8341A SAM'],
    deliverables: ['Theatrical Trailer Score Stem Set', 'Trailer SFX Construction Kit', '5.1 Broadcast Mix'],
    reelRef: 'game',
    cueSeconds: 65,
  },
  {
    id: 'vanguard-cybernetic',
    title: 'Vanguard: Cybernetic Tactics',
    category: 'game',
    categoryLabel: 'Turn-Based RPG',
    year: '2025',
    client: 'Hexagon Studio',
    role: 'Interactive Composer & UI Audio Designer',
    description:
      'Tactical military electronic score and custom micro-tonal UI clicks, confirmations, and shield recharge sounds.',
    details:
      'Created a coherent audio brand for the tactical UI, prioritizing frequency clarity so critical HUD chirps never masked tactical combat cues or character voice acting.',
    keyCues: [
      'Turn Preparation Ambient Layer',
      'Hex-Grid Movement Click Suite',
      'Kinetic Railgun Discharge',
      'Victory Fanfare (Electro-Brass)',
    ],
    technologies: ['FMOD Studio', 'Unreal Engine 5.4', 'Moog Sub 37', 'FabFilter Suite'],
    deliverables: ['FMOD Event Bank', 'Lossless Waveform Assets', 'Linear OST Release'],
    reelRef: 'game',
    cueSeconds: 210,
  },
  {
    id: 'sylvan-whispers',
    title: 'Sylvan Whispers VR',
    category: 'production',
    categoryLabel: 'Spatial Audio / VR',
    year: '2024',
    client: 'Meta Quest Showcase',
    role: 'Spatial Audio Director',
    description:
      'Ambisonic 3rd-order binaural soundscape of a mythical whispering forest with reactive wind and wildlife acoustics.',
    details:
      'Constructed with 360-degree Ambisonic microphone arrays placed in temperate rainforests, tuned with head-related transfer functions (HRTF) to give headset users realistic verticality and depth.',
    keyCues: [
      'High Canopy Canopy Shimmer',
      'Binaural Insect Swarm Track',
      'Subterranean Root Drone',
      'Spatial Chimes of Dusk',
    ],
    technologies: ['Sennheiser AMBEO VR Mic', 'Reaper Ambisonic Toolkit', 'Meta Spatial Audio SDK'],
    deliverables: ['3rd Order Ambisonic B-format', 'Binaural Stereo Render', 'Interactive Sound Engine Map'],
    reelRef: 'music',
    cueSeconds: 74,
  },
];

export const STUDIO_GEAR: StudioGearCategory[] = [
  {
    category: 'Audio Middleware & Engines',
    items: [
      { name: 'Audiokinetic Wwise', detail: 'Wwise 2024 certified · Dynamic RTPC & soundbank authoring' },
      { name: 'FMOD Studio', detail: 'Event parameter routing & multi-track music systems' },
      { name: 'Game Engines', detail: 'Native Unity 6 & Unreal Engine 5.4 audio integration' },
    ],
  },
  {
    category: 'Digital Audio Workstations',
    items: [
      { name: 'Apple Logic Pro 11', detail: 'Primary film scoring & orchestral cue mockups' },
      { name: 'Avid Pro Tools Ultimate', detail: 'Dialogue editing, stem mastering, 5.1/7.1 re-recording' },
      { name: 'Ableton Live 12 Suite', detail: 'Sound design soundscapes & custom modular processing' },
    ],
  },
  {
    category: 'Hardware Synthesizers & Modular',
    items: [
      { name: 'Sequential Prophet-6', detail: '6-voice analog polyphonic synthesizer' },
      { name: 'Roland Juno-106', detail: 'Vintage 1984 classic analog chorus & pads' },
      { name: 'Eurorack Modular Rig', detail: 'Make Noise Maths, Mutable Rings/Clouds, Intellijel Rainmaker' },
      { name: 'Moog Sub 37', detail: 'Paraphonic analog bass & aggressive lead engine' },
    ],
  },
  {
    category: 'Monitoring & Calibration',
    items: [
      { name: 'Genelec 8341A SAM The Ones', detail: 'Point source coaxial studio monitors + GLM 4.2 Room Calibration' },
      { name: 'Sennheiser HD 650', detail: 'Open-back reference headphones for surgical stereo mix checks' },
      { name: 'Audeze LCD-X', detail: 'Planar magnetic planar headphones for sub-bass response' },
    ],
  },
  {
    category: 'Microphones & Field Recording',
    items: [
      { name: 'Sound Devices MixPre-6 II', detail: '32-bit float ultra-low-noise Kashmir preamps' },
      { name: 'Sennheiser MKH 416 & 8040', detail: 'Industry-standard shotgun & compact cardioid mics' },
      { name: 'LOM Geofón & BasicUcho', detail: 'Seismic acoustic sensor & binaural ear microphones' },
      { name: 'Aquarian Audio H2a', detail: 'Hydrophone for underwater acoustic capture' },
    ],
  },
];

export const SYNTH_TRACKS: AudioSynthTrack[] = [
  {
    id: 'static-sea-cue',
    title: 'The Static Sea — Cello & Sub Atmosphere',
    project: 'The Static Sea (Feature Film)',
    genre: 'Cinematic Ambient / Modern Drone',
    duration: '0:32',
    description: 'Subterranean sub-bass drone with evolving resonant harmonics and intimate bowed cello resonance.',
    stems: ['Sub Bass 38Hz', 'Analog Drone', 'String Harmonics', 'Tape Friction'],
  },
  {
    id: 'chrono-drift-cue',
    title: 'Chrono Drift — Adaptive Wwise Combat Pulse',
    project: 'Chrono Drift (Video Game)',
    genre: 'Interactive Hybrid Electronic',
    duration: '0:28',
    description: 'Polyrhythmic synth arpeggios with procedural filter sweep and kinetic percussion transients.',
    stems: ['Modular Arp', 'Kinetic Pulse', 'Bitcrush Percussion', 'Sub Sweep'],
  },
  {
    id: 'eclipse-braam-cue',
    title: 'Eclipse Protocol — Theatrical Braam Impact',
    project: 'Eclipse Protocol (Trailer)',
    genre: 'Theatrical Brass & Sub Impact',
    duration: '0:20',
    description: 'Massive multi-octave brass braam processed through tape saturation and low-end transient shaping.',
    stems: ['Brass Stabs', 'Sub Rumble', 'Metal Screech', 'Reverb Tail'],
  },
  {
    id: 'nocturne-poly-cue',
    title: 'Nocturne Mirage — Prophet-6 Poly Chords',
    project: 'Mara: Nocturne Mirage (EP)',
    genre: 'Vintage Analog Synthwave / Melodic',
    duration: '0:34',
    description: 'Warm analog chords with gentle chorused detune and gentle acoustic felt-piano undertone.',
    stems: ['Prophet-6 Pad', 'Juno-106 Chorus', 'Tape Flutter', 'Warm Bass'],
  },
];
