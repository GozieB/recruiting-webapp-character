const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    /* eslint promise/catch-or-return: 0 */
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { /* eslint promise/always-return: 0 */
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
