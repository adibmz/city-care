import { useEffect } from 'react';

/**
 * @param {{ title: string, description?: string }} metadata
 */
export function useSEO(metadata) {
  const { title, description } = metadata;

  useEffect(() => {
    const setMeta = (selector, attrs) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        Object.keys(attrs).forEach((key) => {
          if (key !== 'content') element.setAttribute(key, attrs[key]);
        });
        document.head.appendChild(element);
      }
      if (attrs.content) {
        element.setAttribute('content', attrs.content);
      }
    };

    if (title) {
      document.title = title;
    }
    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description });
      setMeta('meta[property="og:description"]', {
        property: 'og:description',
        content: description
      });
      setMeta('meta[name="twitter:description"]', {
        name: 'twitter:description',
        content: description
      });
    }
    if (title) {
      setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
      setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    }
    if (typeof window !== 'undefined' && window.location) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', window.location.href);
      setMeta('meta[property=\"og:url\"]', {
        property: 'og:url',
        content: window.location.href
      });
    }
  }, [title, description]);
}
