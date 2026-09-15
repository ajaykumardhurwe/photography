export interface ServiceTier {
  level: string;
  name: string;
  tagline: string;
  price: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  features: string[];
  popular: boolean;
}

export interface GalleryItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  thumb: string;
  caption: string;
  category: string;
  likes: number;
  comments: number;
}

export const SERVICES: ServiceTier[] = [
  {
    level: 'BASIC',
    name: 'Starter Snap',
    tagline: 'Perfect for beginners & small projects',
    price: '$199',
    color: 'var(--c-secondary-600)',
    bgColor: 'var(--c-secondary-100)',
    borderColor: 'var(--c-secondary-600)',
    icon: 'camera',
    features: [
      '1-hour photo session',
      '1 location of your choice',
      '30 edited high-res photos',
      'Online gallery for 30 days',
      'Social media ready files',
      '48-hour turnaround',
    ],
    popular: false,
  },
  {
    level: 'INTERMEDIATE',
    name: 'Pro Shoot',
    tagline: 'For special moments that deserve more',
    price: '$499',
    color: 'var(--c-primary-700)',
    bgColor: 'var(--c-primary-100)',
    borderColor: 'var(--c-primary-700)',
    icon: 'camera-enhance',
    features: [
      '3-hour photo session',
      'Up to 2 locations',
      '100 edited high-res photos',
      '10 retouched portraits',
      'Online gallery for 90 days',
      'Print release included',
      '24-hour preview delivery',
      '1-minute highlight reel',
    ],
    popular: true,
  },
  {
    level: 'ADVANCED',
    name: 'Cinematic Master',
    tagline: 'The full production experience',
    price: '$1,299',
    color: 'var(--c-accent-600)',
    bgColor: 'var(--c-accent-100)',
    borderColor: 'var(--c-accent-600)',
    icon: 'movie',
    features: [
      'Full-day photo + video session',
      'Up to 4 locations',
      '200+ edited high-res photos',
      '30 retouched portraits',
      '5-minute cinematic video',
      'Drone footage included',
      'Unlimited online gallery',
      'Full print + commercial release',
      'Same-day sneak peek (10 photos)',
      'Custom photo book (20 pages)',
    ],
    popular: false,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    type: 'photo',
    url: 'https://images.pexels.com/photos/23991042/pexels-photo-23991042.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/23991042/pexels-photo-23991042.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Studio fashion — black dress elegance',
    category: 'Studio',
    likes: 1243,
    comments: 48,
  },
  {
    id: 2,
    type: 'photo',
    url: 'https://images.pexels.com/photos/32167238/pexels-photo-32167238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/32167238/pexels-photo-32167238.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Wedding day gallery moment',
    category: 'Wedding',
    likes: 2891,
    comments: 112,
  },
  {
    id: 3,
    type: 'photo',
    url: 'https://images.pexels.com/photos/17612522/pexels-photo-17612522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/17612522/pexels-photo-17612522.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Urban street portrait session',
    category: 'Street',
    likes: 876,
    comments: 34,
  },
  {
    id: 4,
    type: 'video',
    url: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Behind the scenes — film production',
    category: 'Video',
    likes: 3412,
    comments: 156,
  },
  {
    id: 5,
    type: 'photo',
    url: 'https://images.pexels.com/photos/14449735/pexels-photo-14449735.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/14449735/pexels-photo-14449735.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Misty mountain landscape',
    category: 'Nature',
    likes: 1567,
    comments: 67,
  },
  {
    id: 6,
    type: 'photo',
    url: 'https://images.pexels.com/photos/36181540/pexels-photo-36181540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/36181540/pexels-photo-36181540.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Studio profile — dramatic lighting',
    category: 'Studio',
    likes: 2103,
    comments: 89,
  },
  {
    id: 7,
    type: 'photo',
    url: 'https://images.pexels.com/photos/18322558/pexels-photo-18322558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/18322558/pexels-photo-18322558.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Nighttime wedding ceremony',
    category: 'Wedding',
    likes: 4521,
    comments: 203,
  },
  {
    id: 8,
    type: 'video',
    url: 'https://images.pexels.com/photos/9892617/pexels-photo-9892617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/9892617/pexels-photo-9892617.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Cinematic outdoor film shoot',
    category: 'Video',
    likes: 1987,
    comments: 78,
  },
  {
    id: 9,
    type: 'photo',
    url: 'https://images.pexels.com/photos/26988465/pexels-photo-26988465.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/26988465/pexels-photo-26988465.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Neon night street fashion',
    category: 'Street',
    likes: 1234,
    comments: 56,
  },
  {
    id: 10,
    type: 'photo',
    url: 'https://images.pexels.com/photos/38262927/pexels-photo-38262927.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/38262927/pexels-photo-38262927.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Misty East Java morning',
    category: 'Nature',
    likes: 2890,
    comments: 134,
  },
  {
    id: 11,
    type: 'photo',
    url: 'https://images.pexels.com/photos/16029834/pexels-photo-16029834.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/16029834/pexels-photo-16029834.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'In-studio portrait session',
    category: 'Studio',
    likes: 1678,
    comments: 72,
  },
  {
    id: 12,
    type: 'video',
    url: 'https://images.pexels.com/photos/30396798/pexels-photo-30396798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/30396798/pexels-photo-30396798.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Film crew on set — monochrome',
    category: 'Video',
    likes: 987,
    comments: 41,
  },
];

export const GALLERY_CATEGORIES = ['All', 'Studio', 'Wedding', 'Street', 'Nature', 'Video'];

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Bride',
    text: 'Absolutely blown away! The photos from our wedding day are pure magic. Every detail was captured perfectly.',
    avatar: 'SM',
    color: 'var(--c-accent-400)',
  },
  {
    name: 'James Rodriguez',
    role: 'Fashion Designer',
    text: 'The Pro Shoot package delivered exactly what my brand needed. Studio lighting was flawless and the retouched portraits are stunning.',
    avatar: 'JR',
    color: 'var(--c-secondary-400)',
  },
  {
    name: 'Emily Chen',
    role: 'Event Planner',
    text: 'The cinematic video from our corporate event exceeded all expectations. Professional, creative, and delivered on time!',
    avatar: 'EC',
    color: 'var(--c-primary-500)',
  },
];
