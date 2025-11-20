import React, { useState, useEffect } from 'react';

// URL MailChimp z main.js
const mailChimpURL = 'https://gmail.us8.list-manage.com/subscribe/post?u=0372f416821b8680ad7ce7df2&amp;id=d94694ee65&amp;f_id=001f16e1f0';

// Komponent formularza Mailchimp
const MailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Przesyłanie...');
  const [message, setMessage] = useState('');
  // Replikacja logiki 'hasError'
  const validateEmail = (email) => {
    if (!email) {
      return 'Podaj adres email.';
    }
    // Prosta walidacja regex (oryginalny kod polegał na 'validity.typeMismatch')
    const emailPattern = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
    if (!emailPattern.test(email)) {
      return 'Podaj poprawny adres email.';
    }
    return null;
  };

  // Rejestracja globalnego callbacku JSONP (logika z ssMailChimpForm)
  useEffect(() => {
    window.displayMailChimpStatus = (data) => {
      if (!data.result || !data.msg) return;
      
      setStatus(data.result); // 'success' or 'error'
      if (data.msg === 'Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.') {
        setMessage('Prawie skończone... Musimy potwierdzić Twój adres email. Aby zakończyć proces subskrypcji, kliknij link w emailu, który właśnie Ci wysłaliśmy.');
      }
      else {
        setMessage('Wystąpił błąd, spróbuj ponownie za kilka minut.');
      }
    };
    
    // Czyszczenie po odmontowaniu komponentu
    return () => {
      delete window.displayMailChimpStatus;
    };
  }, []);

  // Replikacja 'submitMailChimpForm'
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setStatus('error');
      setMessage(error);
      return;
    }
    
    setStatus('przesyłanie');
    setMessage('Przesyłanie...');

    let url = mailChimpURL.replace('/post?u=', '/post-json?u=');
    url += `&EMAIL=${encodeURIComponent(email)}&c=displayMailChimpStatus`;
    
    const script = document.createElement('script');
    script.src = url;
    
    script.onload = () => {
      script.remove();
    };
    
    document.body.appendChild(script);
  };

  return (
    <div className="subscribe-form">
      <form id="mc-form" className="mc-form" onSubmit={handleSubmit} noValidate>
        <div className="mc-input-wrap">
          <input
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="Twój adres email"
            title="Niepoprawny adres email."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="submit" name="subscribe" value="Subskrybuj" className="btn btn--primary" />
        </div>
        <div className={`mc-status ${status === 'error' ? 'error-message' : status === 'success' ? 'success-message' : ''}`}>
          {message}
        </div>
      </form>
    </div>
  );
};


// Główny komponent Footer
const Footer = () => {  
  const [data, setData] = useState({
    name: 'Kawiarnia u Basi',
    logoUrl: '/images/logo.svg',
    mailingCTA: 'Zapisz się do naszej listy mailingowej, aby otrzymywać aktualizacje, wiadomości i ekskluzywne oferty.',
    address1: 'Piotrowo 2, 60-965',
    address2: 'Poznań, Polska',
    emailAddress: 'kontakt@kawiarniaubasi.pl',
    phoneNumber: '555-123-345',
    openingHours: [
      { days: 'Pon. - Czw.', time: '9:00 - 21:00' },
      { days: 'Piątek', time: '10:00 - 21:00' },
      { days: 'Weekendy', time: '9:00 - 22:00' },
    ],
    fbLink: 'https://facebook.com/kawiarniaubasi',
    telegramLink: 'https://t.me/kawiarniaubasi',
    instagramLink: 'https://instagram.com/kawiarniaubasi',
    tripAdvisorLink: 'https://tripadvisor.com/kawiarniaubasi',
  });

  return (
    <footer id="footer" className="container s-footer">
      <div className="row s-footer__top row-x-center">
        <div className="column xl-6 lg-8 md-10 footer-block footer-newsletter">
          <h5>
            {data.mailingCTA}
          </h5>
          <MailchimpForm />
        </div>
      </div>

      <div className="row s-footer__main">
        <div className="column xl-3 lg-12 footer-block s-footer__main-start">
          <div className="s-footer__logo">
            <a className="logo" href="index.html">
              <img src={data.logoUrl} alt="Homepage" />
            </a>
          </div>
          <ul className="s-footer__social social-list">
            {data.fbLink && <li>
                <a href={data.fbLink} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill:'rgba(0, 0, 0, 1)', transform: 'null', msFilter: 'null' }}><path d="M20,3H4C3.447,3,3,3.448,3,4v16c0,0.552,0.447,1,1,1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325,1.42-3.592,3.5-3.592 c0.699-0.002,1.399,0.034,2.095,0.107v2.42h-1.435c-1.128,0-1.348,0.538-1.348,1.325v1.735h2.697l-0.35,2.725h-2.348V21H20 c0.553,0,1-0.448,1-1V4C21,3.448,20.553,3,20,3z"></path></svg>
                    <span className="u-screen-reader-text">Facebook</span>
                </a>
            </li>}
            {data.telegramLink && <li>
              <a href={data.telegramLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill:'rgba(0, 0, 0, 1)', transform: 'null', msFilter: 'null' }}><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path></svg>
                  <span className="u-screen-reader-text">Telegram</span>
              </a>
            </li>}
            {data.instagramLink && <li>
              <a href={data.instagramLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill:'rgba(0, 0, 0, 1)', transform: 'null', msFilter: 'null' }}><path d="M11.999,7.377c-2.554,0-4.623,2.07-4.623,4.623c0,2.554,2.069,4.624,4.623,4.624c2.552,0,4.623-2.07,4.623-4.624 C16.622,9.447,14.551,7.377,11.999,7.377L11.999,7.377z M11.999,15.004c-1.659,0-3.004-1.345-3.004-3.003 c0-1.659,1.345-3.003,3.004-3.003s3.002,1.344,3.002,3.003C15.001,13.659,13.658,15.004,11.999,15.004L11.999,15.004z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533,6.111c-0.469-1.209-1.424-2.165-2.633-2.632c-0.699-0.263-1.438-0.404-2.186-0.42 c-0.963-0.042-1.268-0.054-3.71-0.054s-2.755,0-3.71,0.054C7.548,3.074,6.809,3.215,6.11,3.479C4.9,3.946,3.945,4.902,3.477,6.111 c-0.263,0.7-0.404,1.438-0.419,2.186c-0.043,0.962-0.056,1.267-0.056,3.71c0,2.442,0,2.753,0.056,3.71 c0.015,0.748,0.156,1.486,0.419,2.187c0.469,1.208,1.424,2.164,2.634,2.632c0.696,0.272,1.435,0.426,2.185,0.45 c0.963,0.042,1.268,0.055,3.71,0.055s2.755,0,3.71-0.055c0.747-0.015,1.486-0.157,2.186-0.419c1.209-0.469,2.164-1.424,2.633-2.633 c0.263-0.7,0.404-1.438,0.419-2.186c0.043-0.962,0.056-1.267,0.056-3.71s0-2.753-0.056-3.71C20.941,7.57,20.801,6.819,20.533,6.111z M19.315,15.643c-0.007,0.576-0.111,1.147-0.311,1.688c-0.305,0.787-0.926,1.409-1.712,1.711c-0.535,0.199-1.099,0.303-1.67,0.311 c-0.95,0.044-1.218,0.055-3.654,0.055c-2.438,0-2.687,0-3.655-0.055c-0.569-0.007-1.135-0.112-1.669-0.311 c-0.789-0.301-1.414-0.923-1.719-1.711c-0.196-0.534-0.302-1.099-0.311-1.669c-0.043-0.95-0.053-1.218-0.053-3.654 c0-2.437,0-2.686,0.053-3.655c0.007-0.576,0.111-1.146,0.311-1.687c0.305-0.789,0.93-1.41,1.719-1.712 c0.534-0.198,1.1-0.303,1.669-0.311c0.951-0.043,1.218-0.055,3.655-0.055c2.437,0,2.687,0,3.654,0.055 c0.571,0.007,1.135,0.112,1.67,0.311c0.786,0.303,1.407,0.925,1.712,1.712c0.196,0.534,0.302,1.099,0.311,1.669 c0.043,0.951,0.054,1.218,0.054,3.655c0,2.436,0,2.698-0.043,3.654H19.315z"></path></svg>
                  <span className="u-screen-reader-text">Instagram</span>
              </a>
            </li>}
            {data.tripAdvisorLink && <li>
              <a href={data.tripAdvisorLink} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill:'rgba(0, 0, 0, 1)', transform: 'null', msFilter: 'null' }}><path d="M8.31 10.28a2.5 2.5 0 1 0 2.5 2.49 2.5 2.5 0 0 0-2.5-2.49zm0 3.8a1.31 1.31 0 1 1 0-2.61 1.31 1.31 0 1 1 0 2.61zm7.38-3.8a2.5 2.5 0 1 0 2.5 2.49 2.5 2.5 0 0 0-2.5-2.49zM17 12.77a1.31 1.31 0 1 1-1.31-1.3 1.31 1.31 0 0 1 1.31 1.3z"></path><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.38 10.77a3.69 3.69 0 0 1-6.2 2.71L12 16.77l-1.18-1.29a3.69 3.69 0 1 1-5-5.44l-1.2-1.3H7.3a8.33 8.33 0 0 1 9.41 0h2.67l-1.2 1.31a3.71 3.71 0 0 1 1.2 2.72z"></path><path d="M14.77 9.05a7.19 7.19 0 0 0-5.54 0A4.06 4.06 0 0 1 12 12.7a4.08 4.08 0 0 1 2.77-3.65z"></path></svg>
                  <span className="u-screen-reader-text">Tripadvisor</span>
              </a>
            </li>}
          </ul>
        </div>

        <div className="column xl-9 lg-12 s-footer__main-end grid-cols grid-cols--wrap">
          <div className="grid-cols__column footer-block">
            <h6>Lokalizacja</h6>
            <p>
              {data.address1}<br />
              {data.address2}
            </p>
          </div>
          <div className="grid-cols__column footer-block">
            <h6>Kontakt</h6>
            <ul className="link-list">
              <li><a href={`mailto:${data.emailAddress}`}>{data.emailAddress}</a></li>
              <li><a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a></li>
            </ul>
          </div>
          <div className="grid-cols__column footer-block">
            <h6>Godziny Otwarcia</h6>
            <ul className="opening-hours">
              {data.openingHours.map((item, index) => (
                <li key={index}>
                  <span className="opening-hours__days">{item.days}</span><span className="opening-hours__time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row s-footer__bottom">
        <div className="column xl-6 lg-12">
          <p className="ss-copyright">
            <span>© {data.name} {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;