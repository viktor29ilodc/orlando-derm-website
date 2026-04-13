import { PRACTICE, LOCATIONS } from '@/data/practice';

// Generate LocalBusiness schema for a specific location
export function localBusinessSchema(location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${PRACTICE.url}/locations/${location.id}`,
    name: `${PRACTICE.name} - ${location.name}`,
    image: `${PRACTICE.url}/images/logo.png`,
    url: `${PRACTICE.url}/locations/${location.id}`,
    telephone: location.phoneTel,
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
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '16:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '08:00', closes: '14:00' },
    ],
    medicalSpecialty: 'Dermatology',
    hasMap: location.mapUrl,
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: PRACTICE.name,
      url: PRACTICE.url,
    },
  };
}

// Generate Physician schema for a provider
export function physicianSchema(provider) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: provider.name,
    url: `${PRACTICE.url}/providers/${provider.slug}`,
    image: `${PRACTICE.url}/images/providers/${provider.slug}.jpg`,
    medicalSpecialty: 'Dermatology',
    isAcceptingNewPatients: true,
    worksFor: {
      '@type': 'MedicalOrganization',
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
    ...(provider.languages && {
      knowsLanguage: provider.languages,
    }),
    ...(provider.services && {
      availableService: provider.services.map(s => ({
        '@type': 'MedicalProcedure',
        name: s,
      })),
    }),
  };
}

// Generate MedicalCondition schema for condition pages
export function medicalConditionSchema(condition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.name,
    url: `${PRACTICE.url}/conditions/${condition.slug}`,
    medicalSpecialty: 'Dermatology',
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
    name: service.name,
    url: `${PRACTICE.url}/services/${service.slug}`,
    description: service.shortDesc,
    medicalSpecialty: 'Dermatology',
    availableService: {
      '@type': 'MedicalTherapy',
      name: service.name,
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
    '@type': 'MedicalOrganization',
    name: PRACTICE.name,
    legalName: PRACTICE.legalName,
    url: PRACTICE.url,
    logo: `${PRACTICE.url}/images/logo.png`,
    description: PRACTICE.description,
    medicalSpecialty: ['Dermatology', 'Mohs Surgery'],
    isAcceptingNewPatients: true,
    sameAs: [
      'https://www.facebook.com/orlandodermatology/',
      'https://www.healthgrades.com/physician/dr-vitaly-blatnoy-xms8t',
      'https://www.zocdoc.com/doctor/vitaly-blatnoy-md-56078',
      'https://health.usnews.com/doctors/vitaly-blatnoy-202282',
      'https://www.vitals.com/doctors/Dr_Vitaly_Blatnoy.html',
      'https://doctor.webmd.com/doctor/vitaly-blatnoy-d292c295-d500-4f2e-b8e9-be490e3faff1-overview',
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: bookingUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
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
        latitude: 28.6396,
        longitude: -81.2084,
      },
      geoRadius: '50000',
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
