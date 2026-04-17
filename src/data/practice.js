// All practice data in one place — edit here, updates everywhere

export const PRACTICE = {
  name: 'Orlando Dermatology Center',
  legalName: 'Dermatology and Skin Cancer Surgery Center LLC dba Orlando Dermatology Center',
  url: 'https://www.orlandodermatologycenter.com',
  bookingUrl: 'https://www.orlandodermatologycenter.com/book', // Replace with NexHealth URL once live
  paymentUrl: 'https://www.orlandodermatologycenter.com/booking', // Payment portal
  patientPortalUrl: 'https://patientportal.advancedmd.com/account/logon?lk=140478', // AdvancedMD patient portal
  npi: '1174078281', // Group NPI (Type 2)
  description: 'Board-certified dermatologists providing medical, cosmetic, and surgical dermatology including Mohs surgery across 4 Central Florida locations.',
  hours: 'Mon-Thu 8am-4pm, Fri 8am-2pm',
  hoursStructured: {
    monday: '08:00-16:00',
    tuesday: '08:00-16:00',
    wednesday: '08:00-16:00',
    thursday: '08:00-16:00',
    friday: '08:00-14:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
};

export const LOCATIONS = [
  {
    id: 'oviedo',
    name: 'Oviedo',
    address: '7560 Red Bug Lake Rd, Suite 1014',
    city: 'Oviedo',
    state: 'FL',
    zip: '32765',
    phone: '(407) 706-1770',
    phoneTel: '+14077061770',
    lat: 28.6396,
    lng: -81.2084,
    mapUrl: 'https://maps.google.com/?q=7560+Red+Bug+Lake+Rd+Suite+1014+Oviedo+FL+32765',
  },
  {
    id: 'orlando-waterford-lakes',
    name: 'Orlando Waterford Lakes',
    address: '422 South Alafaya Trl, Unit 26',
    city: 'Orlando',
    state: 'FL',
    zip: '32828',
    phone: '(407) 538-3855',
    phoneTel: '+14075383855',
    lat: 28.5395,
    lng: -81.2063,
    mapUrl: 'https://maps.google.com/?q=422+South+Alafaya+Trl+Unit+26+Orlando+FL+32828',
  },
  {
    id: 'lake-mary',
    name: 'Lake Mary',
    address: '731 Stirling Center Place, Suite 1931',
    city: 'Lake Mary',
    state: 'FL',
    zip: '32746',
    phone: '(407) 436-7375',
    phoneTel: '+14074367375',
    lat: 28.7589,
    lng: -81.3178,
    mapUrl: 'https://maps.google.com/?q=731+Stirling+Center+Place+Suite+1931+Lake+Mary+FL+32746',
  },
  {
    id: 'casselberry',
    name: 'Casselberry',
    address: '4970 South US Hwy 17-92',
    city: 'Casselberry',
    state: 'FL',
    zip: '32707',
    phone: '(407) 635-8012',
    phoneTel: '+14076358012',
    lat: 28.6564,
    lng: -81.3270,
    mapUrl: 'https://maps.google.com/?q=4970+South+US+Hwy+17+92+Casselberry+FL+32707',
  },
];

export const PROVIDERS = [
  {
    id: 'vitaly-blatnoy-md',
    name: 'Vitaly Blatnoy, MD',
    title: 'Dermatologist & Mohs Surgeon',
    role: 'Founder',
    npi: '1669462123',
    credentials: ['Board-Certified, American Board of Dermatology', 'Fellow, American Academy of Dermatology (FAAD)', 'American Society of Mohs Surgery'],
    education: 'National Medical University of Kyiv, Residency at University of Cincinnati',
    languages: ['English', 'Russian', 'Spanish', 'Hebrew'],
    services: ['Mohs Surgery', 'Skin Cancer Surgery', 'Superficial Radiation Treatment', 'General Dermatology'],
    slug: 'vitaly-blatnoy-md',
  },
  {
    id: 'tim-nyckowski-do',
    name: 'Tim Nyckowski, DO',
    title: 'Dermatologist & Mohs Surgeon',
    npi: '1003313735',
    slug: 'tim-nyckowski-do',
  },
  {
    id: 'mikhail-vaysberg-do',
    name: 'Mikhail Vaysberg, DO',
    title: 'Board Certified Facial Plastic and Reconstructive Surgeon',
    npi: '1083639561',
    slug: 'mikhail-vaysberg-do',
  },
  {
    id: 'elena-shumsky-aprn',
    name: 'Elena Shumsky, APRN',
    title: 'Dermatology Provider',
    slug: 'elena-shumsky-aprn',
  },
  {
    id: 'stella-terenteva-aprn',
    name: 'Stella Terenteva, APRN',
    title: 'Dermatology Provider',
    slug: 'stella-terenteva-aprn',
  },
  {
    id: 'joanna-kluger-wesley-pa',
    name: 'Joanna Kluger-Wesley, PA',
    title: 'Dermatology Provider',
    slug: 'joanna-kluger-wesley-pa',
  },
  {
    id: 'amanda-hulce-aprn',
    name: 'Amanda Hulce, APRN',
    title: 'Dermatology Provider',
    slug: 'amanda-hulce-aprn',
  },
  {
    id: 'cassie-de-los-angeles-pa-c',
    name: 'Cassie de los Angeles, PA-C',
    title: 'Dermatology Provider',
    slug: 'cassie-de-los-angeles-pa-c',
  },
];

export const SERVICES = [
  { id: 'mohs-surgery', name: 'Mohs Surgery', category: 'surgical', slug: 'mohs-surgery', shortDesc: 'Advanced skin cancer removal with maximum tissue preservation.' },
  { id: 'skin-cancer-surgery', name: 'Skin Cancer Surgery', category: 'surgical', slug: 'skin-cancer-surgery', shortDesc: 'Expert surgical treatment for all types of skin cancer.' },
  { id: 'srt', name: 'Superficial Radiation Treatment (SRT)', category: 'surgical', slug: 'superficial-radiation-treatment', shortDesc: 'Non-surgical skin cancer treatment using targeted radiation.' },
  { id: 'skin-cancer-screening', name: 'Skin Cancer Screening', category: 'medical', slug: 'skin-cancer-screening', shortDesc: 'Comprehensive full-body skin examinations.' },
  { id: 'adult-pediatric', name: 'Adult & Pediatric Dermatology', category: 'medical', slug: 'adult-pediatric-dermatology', shortDesc: 'Complete medical dermatology for all ages.' },
  { id: 'mole-removal', name: 'Mole Check & Removal', category: 'medical', slug: 'mole-check-removal', shortDesc: 'Professional mole evaluation and removal.' },
  { id: 'keloid-removal', name: 'Keloid Scars Removal', category: 'surgical', slug: 'keloid-scars-removal', shortDesc: 'Specialized treatment for keloid scars.' },
  { id: 'botox-fillers', name: 'Botox & Fillers', category: 'cosmetic', slug: 'botox-fillers', shortDesc: 'Injectable treatments for wrinkles and volume restoration.' },
  { id: 'ipl', name: 'IPL Laser Rejuvenation', category: 'cosmetic', slug: 'ipl-laser-rejuvenation', shortDesc: 'Intense pulsed light for sun damage and skin tone.' },
  { id: 'co2-laser', name: 'CO2 Laser Resurfacing', category: 'cosmetic', slug: 'co2-laser-resurfacing', shortDesc: 'Fractional laser for deep wrinkles and scarring.' },
  { id: 'laser-vein', name: 'Laser Vein Removal', category: 'cosmetic', slug: 'laser-vein-removal', shortDesc: 'Laser treatment for spider veins and leg veins.' },
  { id: 'chemical-peels', name: 'Chemical Peels', category: 'cosmetic', slug: 'chemical-peels', shortDesc: 'Professional-grade peels for skin renewal.' },
  { id: 'skin-care', name: 'Skin Care', category: 'cosmetic', slug: 'skin-care', shortDesc: 'Medical-grade skincare treatments and products.' },
  { id: 'skin-tag-removal', name: 'Skin Tag Removal', category: 'medical', slug: 'skin-tag-removal', shortDesc: 'Quick, painless removal of skin tags.' },
  { id: 'laser-treatments', name: 'Laser Treatments', category: 'cosmetic', slug: 'laser-treatments', shortDesc: 'Advanced laser technology for skin rejuvenation and correction.' },
];

export const CONDITIONS = [
  { id: 'acne', name: 'Acne', slug: 'acne' },
  { id: 'eczema', name: 'Eczema', slug: 'eczema' },
  { id: 'psoriasis', name: 'Psoriasis', slug: 'psoriasis' },
  { id: 'hair-loss', name: 'Hair Loss', slug: 'hair-loss' },
  { id: 'warts', name: 'Warts', slug: 'warts' },
  { id: 'aging', name: 'Aging', slug: 'aging' },
  { id: 'cysts', name: 'Cysts', slug: 'cysts' },
  { id: 'lipoma', name: 'Lipoma', slug: 'lipoma' },
  { id: 'hidradenitis-suppurativa', name: 'Hidradenitis Suppurativa', slug: 'hidradenitis-suppurativa' },
];
