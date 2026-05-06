import { useEffect } from 'react';

/**
 * Analytics component handles the injection of Google Analytics 4 
 * and Tawk.to Live Chat scripts using VITE_ environment variables.
 */
export default function Analytics() {
  useEffect(() => {
    // 1. Google Analytics 4 Integration
    const gaId = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      const gaConfig = document.createElement('script');
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(gaConfig);
    }

    // 2. Tawk.to Live Chat Integration
    const tawkPropertyId = (import.meta as any).env.VITE_TAWKTO_PROPERTY_ID;
    const tawkWidgetId = (import.meta as any).env.VITE_TAWKTO_WIDGET_ID || 'default';
    
    if (tawkPropertyId && tawkPropertyId !== 'XXXXXXXXXXXXXX') {
      const tawkScript = document.createElement('script');
      tawkScript.async = true;
      tawkScript.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
      tawkScript.charset = 'UTF-8';
      tawkScript.setAttribute('crossorigin', '*');
      document.body.appendChild(tawkScript);
    }
  }, []);

  return null;
}
