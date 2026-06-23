import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://imranalfarabi.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/#story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#social`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
