async function loadPolyfill() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }

  if (typeof window.Promise === 'undefined') {
    await import('promise-polyfill/src/polyfill');
  }

  if (typeof window.fetch === 'undefined') {
    await import('unfetch/polyfill');
  }

  if (typeof window.AbortController === 'undefined') {
    await import('abortcontroller-polyfill');
  }

  if (!("scrollBehavior" in document.documentElement.style)) {
    await import("scroll-behavior-polyfill");
  }
}

export { loadPolyfill };
