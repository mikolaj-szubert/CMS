import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [data, setData] = useState({
    title: 'Co Mówią Nasi Klienci',
    testimonials: [
      { 
        name: 'Janusz Kowalski', 
        location: 'Warszawa, Polska', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Janusz_Kowalski_Sejm_2019.jpg',
        text: 'Molestiae incidunt consequatur quis ipsa autem nam sit enim magni. Voluptas tempore rem. Explicabo a quaerat sint autem dolore ducimus ut consequatur neque. Nisi dolores quaerat fuga rem nihil nostrum. Laudantium quia consequatur molestias.' 
      },
      { 
        name: 'Jan Heweliusz', 
        location: 'Gdańsk, Polska', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Johannes_Hevelius.PNG',
        text: 'Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Voluptatem dignissimos ut ducimus accusantium perspiciatis. Quasi voluptas eius distinctio. Atque eos maxime.' 
      },
      { 
        name: 'Jan Paweł', 
        location: 'Wadowice, Polska', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg/512px-ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_%28cropped%29.jpg?20230131115520',
        text: 'Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam. Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio. Voluptatem dignissimos ut.' 
      },
      { 
        name: 'Jan Kulczyk', 
        location: 'Bydgoszcz, Polska', 
        img: 'https://polin.pl/sites/default/files/styles/galeria_mala/public/pictures/www_jan_kulczyk_0.jpg?itok=c9A2btoT',
        text: 'Nunc interdum lacus sit amet orci. Vestibulum dapibus nunc ac augue. Fusce vel dui. In ac felis quis tortor malesuada pretium. Curabitur vestibulum aliquam leo. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.' 
      },
    ]
  });
  
  // Logika Swipera (ssSwiper)
  useEffect(() => {
    // Sprawdzamy, czy Swiper jest załadowany z plugins.js i czy ref istnieje
    if (window.Swiper && sliderRef.current) {
      const slider = new window.Swiper(sliderRef.current, {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // Kopiujemy breakpoints z main.js
            401: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            801: {
                slidesPerView: 2,
                spaceBetween: 44
            },
            1201: {
                slidesPerView: 3,
                spaceBetween: 44
            }
        }
      });
      
      // Funkcja czyszcząca
      return () => {
        if (slider) {
          slider.destroy();
        }
      };
    }
  }, []); // Pusta tablica zależności zapewnia, że uruchomi się to tylko raz

  return (
    <section id="testimonials" className="container s-testimonials">
      <div className="row s-testimonials__content">
        <div className="column xl-12">
          <h3 className="testimonials-title u-text-center">{data.title}</h3>
          
          {/* Używamy ref, aby przekazać element do Swipera */}
          <div className="swiper-container testimonials-slider" ref={sliderRef}>
            <div className="swiper-wrapper">
              
              {data.testimonials.map((t, i) => (
                <div className="testimonials-slider__slide swiper-slide" key={i}>
                  <div className="testimonials-slider__author">
                    <img src={t.img} alt={t.name} className="testimonials-slider__avatar" />
                    <cite className="testimonials-slider__cite">
                      {t.name}
                      <span>{t.location}</span>
                    </cite>
                  </div>
                  <p>{t.text}</p>
                </div>
              ))}
              
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;