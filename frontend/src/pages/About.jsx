import React, {useState} from 'react';
const About = () => {
  const [data, setData] = useState({
    title: 'Nasza Historia',
    aboutSrc: '/images/about-pic-primary.jpg',
    aboutSrcSet: '/images/about-pic-primary.jpg 1x, /images/about-pic-primary@2x.jpg 2x',
    paragraphs: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum, ut consequuntur pariatur fugiat aliquam voluptatem officia blanditiis ipsa laboriosam ad velit voluptate nisi saepe quisquam minima culpa eaque amet.',
    ],
  });
  return (
    data.title && data.paragraphs && <section id="about" className="container s-about target-section">
      <div className="row s-about__content">
        <div className="column xl-4 lg-5 md-12 s-about__content-start">
          <div className="section-header" data-num="01">
            <h2 className="text-display-title">{data.title}</h2>
          </div>
          <figure className="about-pic-primary">
            <img
              src={data.aboutSrc}
              srcSet={data.aboutSrcSet}
              alt={data.title}
            />
          </figure>
        </div>
        <div className="column xl-6 lg-6 md-12 s-about__content-end">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;