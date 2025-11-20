import { useCallback } from 'react';

const easeFunctions = {
  easeInQuad: function(t, b, c, d) {
      t /= d;
      return c * t * t + b;
  },
  easeOutQuad: function(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
  },
  easeInOutQuad: function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  },
  easeInOutCubic: function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
  },
  easeSmoothInOut: function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t*t*t + 2) + b;
  }
};

export const useSmoothScroll = () => {
  
  const smoothScrollTo = useCallback((target, options) => {
    const config = {
      tolerance: 0,
      duration: 1800,
      easing: 'easeSmoothInOut',
      container: window,
      ...options,
    };

    let animationFrameId = null;
    let isScrolling = false;

    if (isScrolling && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    isScrolling = true;

    const { duration, easing, tolerance, container, onStart, onComplete } = config;
    const startY = container === window ? window.pageYOffset : container.scrollTop;
    const startTime = performance.now();

    if (typeof onStart === 'function') onStart();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const targetRect = target.getBoundingClientRect();
      const targetY = (container === window ? targetRect.top + window.pageYOffset : targetRect.top) - tolerance;
      const change = targetY - startY;

      const easedProgress = easeFunctions[easing](progress, startY, change, 1);

      if (container === window) {
        window.scrollTo(0, easedProgress);
      } else {
        container.scrollTop = easedProgress;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateScroll);
      } else {
        isScrolling = false;
        animationFrameId = null;

        if (target && target.focus && !target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        if (target && target.focus) {
          target.focus({ preventScroll: true });
        }

        if (typeof onComplete === 'function') onComplete();
      }
    }

    animationFrameId = requestAnimationFrame(animateScroll);
  }, []);

  const handleSmoothScroll = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    let target;
    if (href === '#top') {
      target = { getBoundingClientRect: () => ({ top: 0 }) }; 
    } else {
      target = document.querySelector(href);
    }

    if (target) {
      smoothScrollTo(target);
    } else {
      console.warn(`Target "${href}" not found for smooth scroll.`);
    }
  }, [smoothScrollTo]);

  return { handleSmoothScroll, smoothScrollTo };
};