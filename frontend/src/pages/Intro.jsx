import React, {useState} from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Intro = () => {
  const { handleSmoothScroll } = useSmoothScroll();
  const [data, setData] = useState({ 
    overline: 'Witaj w',
    title: 'Kawiarnia u Basi',
    primaryImage: {
      src: '/images/intro-pic-primary.jpg',
      srcSet: '/images/intro-pic-primary.jpg 1x, /images/intro-pic-primary@2x.jpg 2x',
    },
    secondaryImage: {
      src: '/images/intro-pic-secondary.jpg',
      srcSet: '/images/intro-pic-secondary.jpg 1x, /images/intro-pic-secondary@2x.jpg 2x',
    },
    description: 'Delektuj się chwilami błogości z każdym łykiem, gdy nasze mistrzowsko przygotowane kawy i wyśmienite wypieki otulają Twoje zmysły.',
    fbLink: '#0',
    igLink: '#0',
    piLink: '#0',
    xLink: '#0',
  });
  return (
    <section id="intro" className="container s-intro target-section">
      <div className="grid-block s-intro__content">
        <div className="intro-header">
          <div className="intro-header__overline">{data.overline}</div>
          <h1 className="intro-header__big-type">
            {data.title}
          </h1>
        </div>

        <figure className="intro-pic-primary">
          <img
            src={data.primaryImage.src}
            srcSet={data.primaryImage.srcSet}
            alt=""
          />
        </figure>

        <div className="intro-block-content">
          <figure className="intro-block-content__pic">
            <img
              src={data.secondaryImage.src}
              srcSet={data.secondaryImage.srcSet}
              alt=""
            />
          </figure>

          <div className="intro-block-content__text-wrap">
            <p className="intro-block-content__text">
              {data.description}
            </p>
            <ul className="intro-block-content__social">
              {data.fbLink ? <li><a href={data.fbLink}>FB</a></li> : null}
              {data.igLink ? <li><a href={data.igLink}>IG</a></li> : null}
              {data.piLink ? <li><a href={data.piLink}>PI</a></li> : null}
              {data.xLink ? <li><a href={data.xLink}>X</a></li> : null}
            </ul>
          </div>
        </div>

        <div className="intro-scroll">
          <a className="smoothscroll" href="#about" onClick={handleSmoothScroll}>
            <span className="intro-scroll__circle-text"></span>
            <span className="intro-scroll__text u-screen-reader-text">Przewiń Niżej</span>
            <div className="intro-scroll__icon">
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m5.214 14.522s4.505 4.502 6.259 6.255c.146.147.338.22.53.22s.384-.073.53-.22c1.754-1.752 6.249-6.244 6.249-6.244.144-.144.216-.334.217-.523 0-.193-.074-.386-.221-.534-.293-.293-.766-.294-1.057-.004l-4.968 4.968v-14.692c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.692l-4.979-4.978c-.289-.289-.761-.287-1.054.006-.148.148-.222.341-.221.534 0 .189.071.377.215.52z" fillRule="nonzero" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;