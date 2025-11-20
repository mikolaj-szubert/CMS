import React, { useEffect } from 'react';

const galleryImages = [
  { id: 1, thumb: 'gallery-01', large: 'l-gallery-01' },
  { id: 2, thumb: 'gallery-02', large: 'l-gallery-02' },
  { id: 3, thumb: 'gallery-03', large: 'l-gallery-03' },
  { id: 4, thumb: 'gallery-04', large: 'l-gallery-04' },
  { id: 5, thumb: 'gallery-05', large: 'l-gallery-05' },
  { id: 6, thumb: 'gallery-06', large: 'l-gallery-06' },
  { id: 7, thumb: 'gallery-07', large: 'l-gallery-07' },
  { id: 8, thumb: 'gallery-08', large: 'l-gallery-08' },
];

const Gallery = () => {
  const [data, setData] = React.useState([
    { id: 1, thumb: 'gallery-01', large: 'l-gallery-01' },
    { id: 2, thumb: 'gallery-02', large: 'l-gallery-02' },
    { id: 3, thumb: 'gallery-03', large: 'l-gallery-03' },
    { id: 4, thumb: 'gallery-04', large: 'l-gallery-04' },
    { id: 5, thumb: 'gallery-05', large: 'l-gallery-05' },
    { id: 6, thumb: 'gallery-06', large: 'l-gallery-06' },
    { id: 7, thumb: 'gallery-07', large: 'l-gallery-07' },
    { id: 8, thumb: 'gallery-08', large: 'l-gallery-08' },
  ]);
  // Logika GLightbox (ssGLightbox)
  useEffect(() => {
    // Sprawdzamy, czy GLightbox jest załadowany z plugins.js
    if (window.GLightbox) {
      const lightbox = window.GLightbox({
        selector: '.glightbox',
        zoomable: false,
        touchNavigation: true,
        loop: false,
        autoplayVideos: true,
        svg: { // Kopiujemy konfigurację SVG z main.js
            close: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339-.219-.531-.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
            prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
            next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>'
        }
      });
      
      // Funkcja czyszcząca
      return () => {
        if (lightbox) {
          lightbox.destroy();
        }
      };
    }
  }, []); // Pusta tablica zależności zapewnia, że uruchomi się to tylko raz

  return (
    <section id="gallery" className="container s-gallery target-section">
      <div className="row s-gallery__header">
        <div className="column xl-12 section-header-wrap">
          <div className="section-header" data-num="03">
            <h2 className="text-display-title">Galeria</h2>
          </div>
        </div>
      </div>
      <div className="gallery-items grid-cols grid-cols--wrap">
        {galleryImages.map(img => (
          <div className="gallery-items__item grid-cols__column" key={img.id}>
            <a href={`/images/gallery/large/${img.large}.jpg`} className="gallery-items__item-thumb glightbox">
              <img
                src={`/images/gallery/${img.thumb}.jpg`}
                srcSet={`/images/gallery/${img.thumb}.jpg 1x, /images/gallery/${img.thumb}@2x.jpg 2x`}
                alt=""
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;