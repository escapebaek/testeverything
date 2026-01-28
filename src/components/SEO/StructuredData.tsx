import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://testeverything.vercel.app';

// Game structured data
export interface GameStructuredDataProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  category: string;
}

export const GameStructuredData: React.FC<GameStructuredDataProps> = ({
  name,
  description,
  url,
  image = `${BASE_URL}/logo512.png`,
  category,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: `${BASE_URL}${url}`,
    applicationCategory: 'GameApplication',
    genre: category,
    image: image,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// Quiz/Test structured data
export interface QuizStructuredDataProps {
  name: string;
  description: string;
  url: string;
  questionCount?: number;
  timeRequired?: string;
}

export const QuizStructuredData: React.FC<QuizStructuredDataProps> = ({
  name,
  description,
  url,
  questionCount = 10,
  timeRequired = 'PT10M',
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: name,
    description: description,
    url: `${BASE_URL}${url}`,
    educationalLevel: 'All levels',
    about: {
      '@type': 'Thing',
      name: 'Personality Assessment',
    },
    assesses: 'Personality traits',
    numberOfQuestions: questionCount,
    timeRequired: timeRequired,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// Blog post structured data
export interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  title,
  description,
  url,
  image = `${BASE_URL}/logo512.png`,
  author = 'TestEverything',
  publishedTime,
  modifiedTime,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `${BASE_URL}${url}`,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TestEverything',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo512.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${url}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// BreadcrumbList structured data
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// FAQ structured data
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};
