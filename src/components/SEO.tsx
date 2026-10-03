import React, { useEffect } from 'react';
import { SEO_CONFIG, GLOBAL_SEO_KEYWORDS } from '../utils/seoData';
import { trackPageView } from '../utils/analytics';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'service';
  noIndex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Helper to update or create a <meta> tag
 */
function setMetaTag(nameOrProperty: 'name' | 'property' | 'http-equiv', key: string, content: string | undefined | null) {
  if (content === undefined || content === null) return;
  let element = document.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(nameOrProperty, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag
 */
function setLinkTag(rel: string, href: string, attributes: Record<string, string> = {}) {
  let selector = `link[rel="${rel}"]`;
  if (attributes.hreflang) {
    selector += `[hreflang="${attributes.hreflang}"]`;
  }
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  Object.entries(attributes).forEach(([attrKey, attrVal]) => {
    element?.setAttribute(attrKey, attrVal);
  });
}

export function SEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  noIndex = false,
  schema,
  articleMeta,
}: SEOProps) {
  useEffect(() => {
    // 1. Compute Clean Path & Format Page Title
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const formattedTitle = title
      ? `${title} | ${SEO_CONFIG.siteName}`
      : `${SEO_CONFIG.siteName} - Official Vedic Puja & Guruji Portal`;
    document.title = formattedTitle;

    // Trigger Google Analytics Page View with updated title & path
    trackPageView(cleanPath, formattedTitle);

    // 2. Format Meta Description
    const defaultDescription =
      'Authorized Hereditary Vatandar Purohit of Shri Trimbakeshwar Jyotirlinga. Authentic Narayan Nagbali, Kaal Sarp Shanti, Tripindi Shraddha, Maha Mrityunjaya & Rudrabhishek Pooja booking in Trimbakeshwar, Nashik.';
    const finalDescription = description || defaultDescription;
    setMetaTag('name', 'description', finalDescription);

    // 3. Format Keywords
    let keywordList: string[] = [];
    if (Array.isArray(keywords)) {
      keywordList = [...keywords, ...GLOBAL_SEO_KEYWORDS.slice(0, 10)];
    } else if (typeof keywords === 'string' && keywords.trim()) {
      keywordList = [keywords, ...GLOBAL_SEO_KEYWORDS.slice(0, 10)];
    } else {
      keywordList = GLOBAL_SEO_KEYWORDS;
    }
    setMetaTag('name', 'keywords', Array.from(new Set(keywordList)).join(', '));

    // 4. Robots Directives
    const robotsContent = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);
    setMetaTag('name', 'bingbot', robotsContent);

    // 5. Author & Language
    setMetaTag('name', 'author', SEO_CONFIG.author);
    setMetaTag('name', 'language', 'English, Marathi, Hindi');

    // 6. Geographic / Local SEO Meta Tags
    setMetaTag('name', 'geo.region', SEO_CONFIG.geo.region);
    setMetaTag('name', 'geo.placename', SEO_CONFIG.geo.placename);
    setMetaTag('name', 'geo.position', `${SEO_CONFIG.geo.latitude};${SEO_CONFIG.geo.longitude}`);
    setMetaTag('name', 'ICBM', `${SEO_CONFIG.geo.latitude}, ${SEO_CONFIG.geo.longitude}`);
    setMetaTag('name', 'target-country', 'in');
    setMetaTag('name', 'coverage', 'Worldwide');
    setMetaTag('name', 'distribution', 'Global');
    setMetaTag('name', 'rating', 'General');
    setMetaTag('name', 'revisit-after', '2 days');

    // 7. Canonical URL & Multilingual Hreflang
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : SEO_CONFIG.siteUrl;
    const fullCanonicalUrl = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;

    setLinkTag('canonical', fullCanonicalUrl);
    setLinkTag('alternate', fullCanonicalUrl, { hreflang: 'en' });
    setLinkTag('alternate', fullCanonicalUrl, { hreflang: 'mr' });
    setLinkTag('alternate', fullCanonicalUrl, { hreflang: 'hi' });
    setLinkTag('alternate', fullCanonicalUrl, { hreflang: 'x-default' });

    // 8. Open Graph (OG) Meta Tags
    const fullOgImage = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
      : SEO_CONFIG.defaultOgImage;

    setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', finalDescription);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:image:alt', formattedTitle);
    setMetaTag('property', 'og:locale', 'en_US');
    setMetaTag('property', 'og:locale:alternate', 'mr_IN');
    setMetaTag('property', 'og:locale:alternate', 'hi_IN');

    // 9. Article specific OG tags
    if (ogType === 'article' && articleMeta) {
      if (articleMeta.publishedTime) {
        setMetaTag('property', 'article:published_time', articleMeta.publishedTime);
      }
      if (articleMeta.modifiedTime) {
        setMetaTag('property', 'article:modified_time', articleMeta.modifiedTime);
      }
      if (articleMeta.author) {
        setMetaTag('property', 'article:author', articleMeta.author);
      }
      if (articleMeta.section) {
        setMetaTag('property', 'article:section', articleMeta.section);
      }
      if (articleMeta.tags && articleMeta.tags.length > 0) {
        articleMeta.tags.forEach((tag) => {
          setMetaTag('property', 'article:tag', tag);
        });
      }
    }

    // 10. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SEO_CONFIG.social.twitter);
    setMetaTag('name', 'twitter:creator', SEO_CONFIG.social.twitter);
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', finalDescription);
    setMetaTag('name', 'twitter:image', fullOgImage);

    // 11. Schema.org JSON-LD Structured Data
    const scriptId = 'trimbak-seo-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schema) {
      const schemaArray = Array.isArray(schema) ? schema : [schema];
      scriptTag.textContent = JSON.stringify(schemaArray);
    } else {
      // Default baseline schema
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SEO_CONFIG.siteName,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/articles?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      });
    }

    return () => {
      // Cleanup custom article tags on unmount if needed
    };
  }, [
    title,
    description,
    keywords,
    canonicalPath,
    ogImage,
    ogType,
    noIndex,
    JSON.stringify(schema),
    JSON.stringify(articleMeta),
  ]);

  return null;
}
