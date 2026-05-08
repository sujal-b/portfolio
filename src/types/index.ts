export interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  beforeImageSrc?: string;
  afterImageSrc?: string;
  dominantColor?: string;
  cta?: { text: string; href: string };
}

export interface ProcessText {
  scrollStart: number;
  scrollEnd: number;
  text: string;
}

export interface LineHighlight {
  startLine: number;
  endLine: number;
  opacity: number;
}

export interface ScrollVelocity {
  velocity: number;
  direction: 'up' | 'down';
  scrollY: number;
}
