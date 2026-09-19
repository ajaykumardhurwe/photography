export interface PricingRow {
  service: string;
  basic: string;
  standard: string;
  premium: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceLevel {
  level: string;
  label: string;
  dotColor: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  tagline: string;
  target: string;
  popular: boolean;
  packages: ServicePackage[];
}

export const PRICING_ROWS: PricingRow[] = [
  { service: 'Portrait / Personal Shoot', basic: '₹2,999–4,999', standard: '₹5,999–9,999', premium: '₹12,000–20,000' },
  { service: 'Couple Shoot', basic: '₹4,999–7,999', standard: '₹9,999–14,999', premium: '₹18,000–30,000' },
  { service: 'Pre-Wedding Photo', basic: '₹8,000–15,000', standard: '₹20,000–35,000', premium: '₹40,000–60,000+' },
  { service: 'Pre-Wedding Photo + Video', basic: '₹15,000–25,000', standard: '₹30,000–50,000', premium: '₹55,000–80,000+' },
  { service: 'Birthday / Small Event', basic: '₹5,000–8,000', standard: '₹10,000–15,000', premium: '₹18,000–30,000' },
  { service: 'Engagement', basic: '₹10,000–15,000', standard: '₹20,000–30,000', premium: '₹35,000–50,000' },
  { service: 'Wedding – 1 Day Photo', basic: '₹15,000–25,000', standard: '₹30,000–45,000', premium: '₹50,000–75,000+' },
  { service: 'Wedding – 1 Day Photo + Video', basic: '₹25,000–40,000', standard: '₹45,000–65,000', premium: '₹75,000–1,00,000+' },
  { service: '2-Day Wedding Photo + Video', basic: '₹40,000–60,000', standard: '₹70,000–1,00,000', premium: '₹1,20,000–1,75,000+' },
  { service: '3-Day Wedding Photo + Video', basic: '₹55,000–80,000', standard: '₹1,00,000–1,40,000', premium: '₹1,50,000–2,50,000+' },
  { service: 'Maternity', basic: '₹4,999–7,999', standard: '₹9,999–15,000', premium: '₹18,000–30,000' },
  { service: 'Baby / Newborn', basic: '₹5,000–8,000', standard: '₹10,000–15,000', premium: '₹18,000–30,000' },
  { service: 'Corporate Event', basic: '₹5,000–10,000/day', standard: '₹12,000–20,000/day', premium: '₹25,000–40,000+/day' },
];

export const SERVICE_LEVELS: ServiceLevel[] = [
  {
    level: '1',
    label: 'BASIC',
    dotColor: '🟢',
    color: 'var(--c-success-600)',
    bgColor: 'var(--c-success-500)',
    borderColor: 'var(--c-success-600)',
    icon: '📷',
    tagline: 'Budget-conscious families, birthdays, small functions, simple couple shoots',
    target: 'Budget-conscious families, birthdays, small functions, simple couple shoots',
    popular: false,
    packages: [
      {
        name: 'Basic Wedding',
        price: '₹24,999',
        features: [
          '1 Photographer',
          'Traditional photography',
          'Basic candid coverage',
          '100–200 edited photos',
          'Online delivery',
          '1 short reel',
          '1 day / up to 8 hours',
        ],
      },
      {
        name: 'Basic Pre-Wedding',
        price: '₹9,999',
        features: [
          '1 photographer',
          '1 location',
          '1–2 hours',
          '50–80 edited photos',
          'Online gallery',
        ],
      },
    ],
  },
  {
    level: '2',
    label: 'STANDARD',
    dotColor: '🔵',
    color: 'var(--c-secondary-600)',
    bgColor: 'var(--c-secondary-500)',
    borderColor: 'var(--c-secondary-600)',
    icon: '📸',
    tagline: 'Professional independent photographer / team — the Raipur mid-range sweet spot',
    target: 'Professional independent photographer / team in Raipur',
    popular: true,
    packages: [
      {
        name: 'Standard Wedding',
        price: '₹49,999',
        features: [
          '1 Candid Photographer',
          '1 Traditional Photographer',
          '1 Cinematic Videographer',
          'Full-day coverage',
          '300–500 edited photos',
          '3–5 minute highlight film',
          '2–3 reels',
          'Online gallery',
          'Basic album',
        ],
      },
      {
        name: 'Standard Pre-Wedding',
        price: '₹29,999',
        features: [
          '1 photographer',
          '1 videographer',
          '2 locations',
          '3–4 hours',
          '100+ edited photos',
          '30–60 sec cinematic reel',
          '2 Instagram reels',
        ],
      },
    ],
  },
  {
    level: '3',
    label: 'PREMIUM',
    dotColor: '🟣',
    color: 'var(--c-accent-600)',
    bgColor: 'var(--c-accent-500)',
    borderColor: 'var(--c-accent-600)',
    icon: '🎬',
    tagline: 'Cinematic production — for couples & families who want more than a basic studio package',
    target: 'Couples/families who care about cinematic production',
    popular: false,
    packages: [
      {
        name: 'Premium Wedding',
        price: '₹99,999+',
        features: [
          '2 Candid Photographers',
          '1 Traditional Photographer',
          '2 Cinematographers',
          'Drone',
          'Multi-camera coverage',
          'Same-day teaser',
          '5–8 minute cinematic wedding film',
          '5–10 reels',
          '500–800+ edited photos',
          'Premium album',
          'Couple portraits',
          'Complete online gallery',
          'Raw footage',
          'Dedicated coordinator',
        ],
      },
    ],
  },
];

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

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    type: 'photo',
    url: 'https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Studio fashion — black dress elegance',
    category: 'Studio',
    likes: 1243,
    comments: 48,
  },
  {
    id: 2,
    type: 'photo',
    url: 'https://images.pexels.com/photos/6023737/pexels-photo-6023737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/6023737/pexels-photo-6023737.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Wedding day gallery moment',
    category: 'Wedding',
    likes: 2891,
    comments: 112,
  },
  {
    id: 3,
    type: 'photo',
    url: 'https://images.pexels.com/photos/15086590/pexels-photo-15086590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/15086590/pexels-photo-15086590.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Urban street portrait session',
    category: 'Street',
    likes: 876,
    comments: 34,
  },
  {
    id: 4,
    type: 'video',
    url: 'https://images.pexels.com/photos/9866568/pexels-photo-9866568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/9866568/pexels-photo-9866568.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Behind the scenes — film production',
    category: 'Video',
    likes: 3412,
    comments: 156,
  },
  {
    id: 5,
    type: 'photo',
    url: 'https://images.pexels.com/photos/28355662/pexels-photo-28355662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/28355662/pexels-photo-28355662.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Misty mountain landscape',
    category: 'Nature',
    likes: 1567,
    comments: 67,
  },
  {
    id: 6,
    type: 'photo',
    url: 'https://images.pexels.com/photos/39081013/pexels-photo-39081013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/39081013/pexels-photo-39081013.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Studio profile — dramatic lighting',
    category: 'Studio',
    likes: 2103,
    comments: 89,
  },
  {
    id: 7,
    type: 'photo',
    url: 'https://images.pexels.com/photos/15984474/pexels-photo-15984474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/15984474/pexels-photo-15984474.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Nighttime wedding ceremony',
    category: 'Wedding',
    likes: 4521,
    comments: 203,
  },
  {
    id: 8,
    type: 'video',
    url: 'https://images.pexels.com/photos/9889178/pexels-photo-9889178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/9889178/pexels-photo-9889178.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Cinematic outdoor film shoot',
    category: 'Video',
    likes: 1987,
    comments: 78,
  },
  {
    id: 9,
    type: 'photo',
    url: 'https://images.pexels.com/photos/5582956/pexels-photo-5582956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/5582956/pexels-photo-5582956.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Neon night street fashion',
    category: 'Street',
    likes: 1234,
    comments: 56,
  },
  {
    id: 10,
    type: 'photo',
    url: 'https://images.pexels.com/photos/776453/pexels-photo-776453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/776453/pexels-photo-776453.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'Misty East Java morning',
    category: 'Nature',
    likes: 2890,
    comments: 134,
  },
  {
    id: 11,
    type: 'photo',
    url: 'https://images.pexels.com/photos/19279541/pexels-photo-19279541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/19279541/pexels-photo-19279541.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
    caption: 'In-studio portrait session',
    category: 'Studio',
    likes: 1678,
    comments: 72,
  },
  {
    id: 12,
    type: 'video',
    url: 'https://images.pexels.com/photos/9866569/pexels-photo-9866569.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    thumb: 'https://images.pexels.com/photos/9866569/pexels-photo-9866569.jpeg?auto=compress&cs=tinysrgb&h=350&w=350',
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
