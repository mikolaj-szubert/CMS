import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Preloader from './Preloader';

function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    
    htmlEl.classList.add('ss-preload');

    const handleLoad = () => {
      htmlEl.classList.remove('ss-preload');
      htmlEl.classList.add('ss-loaded');
      
      const preloader = document.querySelector('#preloader');
      if (preloader) {
        preloader.addEventListener('transitionend', (e) => {
          if (e.target.matches('#preloader')) {
            setLoading(false);
            bodyEl.classList.add('ss-show');
            setShowContent(true);
          }
        });
        
        preloader.style.opacity = 0; 
      } else {
        setLoading(false);
        setShowContent(true);
        bodyEl.classList.add('ss-show');
      }
    };
    
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {showContent && <Outlet />}
    </>
  );
}

export default AppLayout;