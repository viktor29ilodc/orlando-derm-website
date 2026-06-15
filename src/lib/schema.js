import { PRACTICE, LOCATIONS } from '@/data/practice';

// Generate LocalBusiness schema for a specific location.
// MedicalClinic is the precise type for a multi-physician outpatient practice;
// the array keeps the broader MedicalBusiness/LocalBusiness behavior too.
export function localBusinessSchema(location) {
  const [monOpen, monClose] = PRACTICE.hoursStructured.monday.split('-');
  const [friOpen, friClose] = PRACTICE.hoursStructured.friday.split('-');
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'MedicalBusiness'],
    '@id': `${PRACTICE.url}/locations/${location.id}#clinic`,
    name: `${PRACTICE.name} - ${location.name}`,
    image: `${PRACTICE.url}/images/logo.png`,
    url: `${PRACTICE.url}/locations/${location.id}`,
    telephone: location.phoneTel,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Insurance, CareCredit',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: monOpen, closes: monClose },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: friOpen, closes: friClose },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '00:00', closes: '00:00' },
    ],
    medicalSpecialty: 'https://schema.org/Dermatology',
    areaServed: { '@type': 'City', name: `${location.city}, ${location.state}` },
    hasMap: location.mapUrl,
    ...(location.mapUrl && { sameAs: [location.mapUrl] }),
    parentOrganization: {
      '@type': ['MedicalOrganization', 'MedicalClinic'],
      '@id': `${PRACTICE.url}/#organization`,
      name: PRACTICE.name,
      url: PRACTICE.url,
    },
  };
}

// Generate provider schema. Only MD/DO providers are typed `Physician`;
// APRNs and PAs are typed `Person` with a jobTitle, which is the correct
// schema.org type for mid-level providers.
export function physicianSchema(provider) {
  const isPhysician = /\b(MD|DO)\b/.test(provider.name);
  const ext = provider.slug === 'joanna-kluger-wesley-pa' ? 'png' : 'jpg';
  return {
    '@context': 'https://schema.org',
    '@type': isPhysician ? 'Physician' : 'Person',
    '@id': `${PRACTICE.url}/providers/${provider.slug}#provider`,
    name: provider.name,
    url: `${PRACTICE.url}/providers/${provider.slug}`,
    image: `${PRACTICE.url}/images/providers/${provider.slug}.${ext}`,
    jobTitle: provider.title,
    ...(isPhysician && {
      medicalSpecialty: 'https://schema.org/Dermatology',
      isAcceptingNewPatients: true,
    }),
    worksFor: {
      '@type': 'MedicalOrganization',
      '@id': `${PRACTICE.url}/#organization`,
      name: PRACTICE.name,
      url: PRACTICE.url,
    },
    ...(provider.npi && {
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'NPI',
        value: provider.npi,
      },
    }),
    ...(provider.credentials && {
      hasCredential: provider.credentials.map(c => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: c,
      })),
    }),
    ...(provider.education && {
      alumniOf: provider.education.split(', ').map(inst => ({
        '@type': 'CollegeOrUniversity',
        name: inst,
      })),
    }),
    ...(provider.languages && {
      knowsLanguage: provider.languages,
    }),
    ...(provider.services && {
      knowsAbout: provider.services,
    }),
    ...(provider.sameAs && {
      sameAs: provider.sameAs,
    }),
  };
}

// Generate MedicalCondition schema for condition pages
export function medicalConditionSchema(condition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    '@id': `${PRACTICE.url}/conditions/${condition.slug}#condition`,
    name: condition.name,
    url: `${PRACTICE.url}/conditions/${condition.slug}`,
    medicalSpecialty: 'https://schema.org/Dermatology',
    ...(condition.description && { description: condition.description }),
    ...(condition.relatedServices && {
      possibleTreatment: condition.relatedServices.map(s => ({
        '@type': 'MedicalTherapy',
        name: s,
      })),
    }),
  };
}

// Generate MedicalProcedure schema for a service
export function medicalProcedureSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${PRACTICE.url}/services/${service.slug}#procedure`,
    name: service.name,
    url: `${PRACTICE.url}/services/${service.slug}`,
    description: service.shortDesc,
    medicalSpecialty: 'https://schema.org/Dermatology',
    ...(service.procedureType && { procedureType: `https://schema.org/${service.procedureType}` }),
    ...(service.bodyLocation && { bodyLocation: service.bodyLocation }),
    // E-E-A-T: Medical content reviewed by board-certified physician.
    // author must be Person/Organization for rich results — not Physician.
    author: {
      '@type': 'Person',
      name: 'Vitaly Blatnoy, MD',
      url: `${PRACTICE.url}/providers/vitaly-blatnoy-md`,
      jobTitle: 'Board-Certified Dermatologist, FAAD',
    },
  };
}

// Generate FAQPage schema from Q&A pairs
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate BreadcrumbList schema
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${PRACTICE.url}${item.url}` : undefined,
    })),
  };
}

// Generate Organization schema for the home page
export function organizationSchema() {
  // Replace with your actual NexHealth booking URL once set up
  const bookingUrl = PRACTICE.bookingUrl || `${PRACTICE.url}/book`;

  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalOrganization', 'MedicalClinic'],
    '@id': `${PRACTICE.url}/#organization`,
    name: PRACTICE.name,
    legalName: PRACTICE.legalName,
    url: PRACTICE.url,
    logo: `${PRACTICE.url}/images/logo.png`,
    description: PRACTICE.description,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'NPI',
      value: PRACTICE.npi,
    },
    medicalSpecialty: 'https://schema.org/Dermatology',
    isAcceptingNewPatients: true,
    // Practice-level profiles only. Individual physician directory listings
    // (Healthgrades, Vitals, WebMD) live on the provider's Physician node.
    sameAs: [
      'https://www.facebook.com/orlandodermatology/',
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: bookingUrl,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Dermatology Appointment',
      },
    },
    address: LOCATIONS.map(loc => ({
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US',
    })),
    contactPoint: LOCATIONS.map(loc => ({
      '@type': 'ContactPoint',
      telephone: loc.phoneTel,
      contactType: 'appointments',
      areaServed: 'Central Florida',
      availableLanguage: ['English', 'Spanish', 'Russian'],
    })),
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.652236,
        longitude: -81.243721,
      },
      geoRadius: '50000',
    },
  };
}

// Generate BlogPosting schema for a blog article
export function blogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${PRACTICE.url}/blog/${post.slug}`,
    ...(post.excerpt && { description: post.excerpt }),
    ...(post.date && { datePublished: post.date, dateModified: post.updatedDate || post.date }),
    // Article rich results require an absolute image URL; fall back to the logo.
    image: {
      '@type': 'ImageObject',
      url: post.image
        ? (post.image.startsWith('http') ? post.image : `${PRACTICE.url}${post.image}`)
        : `${PRACTICE.url}/images/logo.png`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${PRACTICE.url}/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: post.author || 'Vitaly Blatnoy, MD',
      // Link + dermatologist title only when the byline is Dr. Blatnoy.
      ...((!post.author || /blatnoy/i.test(post.author)) && {
        url: `${PRACTICE.url}/providers/vitaly-blatnoy-md`,
        jobTitle: 'Board-Certified Dermatologist, FAAD',
      }),
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: PRACTICE.name,
      url: PRACTICE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${PRACTICE.url}/images/logo.png`,
      },
    },
  };
}

// Helper to render schema as script tag
export function SchemaScript({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
