new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('Layout shift:', entry);
    }
  }).observe({type: 'layout-shift', buffered: true});