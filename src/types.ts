export interface CuePoint {
  time: string;
  seconds: number;
  title: string;
  description: string;
}

export interface DemoReel {
  id: 'music' | 'game';
  title: string;
  category: string;
  subtitle: string;
  defaultVideoId: string;
  description: string;
  tags: string[];
  cues: CuePoint[];
}

export interface ProjectWork {
  id: string;
  title: string;
  category: 'film' | 'game' | 'production';
  categoryLabel: string;
  year: string;
  client: string;
  role: string;
  description: string;
  details: string;
  keyCues: string[];
  technologies: string[];
  deliverables: string[];
  reelRef: 'music' | 'game';
  cueSeconds?: number;
}

export interface StudioGearCategory {
  category: string;
  items: { name: string; detail: string }[];
}

export interface AudioSynthTrack {
  id: string;
  title: string;
  project: string;
  genre: string;
  duration: string;
  description: string;
  stems: string[];
}
