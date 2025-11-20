import React from 'react';

import Header from './Header';
import Intro from './Intro';
import About from './About';
import Menu from './Menu';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Footer from './Footer';

function HomePage() { 

  return (
    <div id="page" className="s-pagewrap ss-home">
      <>
        <Header />
        <Intro />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Footer />
      </>
    </div>
  );
}

export default HomePage;