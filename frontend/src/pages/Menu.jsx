import React, { useState, useEffect } from 'react';

const MenuList = ({ items, currency }) => (
  <ul className="menu-list">
    {items.map((item, index) => (
      <li className="menu-list__item" key={index}>
        <div className="menu-list__item-desc">
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
        </div>
        <div className="menu-list__item-price">
          {item.price}<span>{currency}</span>
        </div>
      </li>
    ))}
  </ul>
);

const TabNav = ({ tabs, activeTab, onTabClick }) => {
  const handleKeyDown = (e, index) => {
    let newIndex = index;
    if (e.key === 'ArrowRight' || e.keyCode === 39) {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }
    
    e.preventDefault();
    const newTabId = tabs[newIndex].id;
    onTabClick(newTabId);
    
    e.currentTarget.parentNode.parentNode.querySelector(`[data-tab-id="${newTabId}"]`).focus();
  };

  return (
    <nav className="tab-nav">
      <ul className="tab-nav__list" role="tablist">
        {tabs.map((tab, index) => (
          <li key={tab.id} role="presentation" data-tab-active={activeTab === tab.id ? '' : null}>
            <a
              href={`#${tab.id}`}
              id={`tab-link-${tab.id}`}
              role="tab"
              tabIndex={activeTab === tab.id ? 0 : -1}
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
              data-tab-id={tab.id}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(tab.id);
              }}
              onFocus={() => onTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span>{tab.label}</span>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fillRule="nonzero" /></svg>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const TabPanel = ({ id, active, title, items, currency }) => (
  <div
    id={id}
    className="menu-block__group tab-content__item"
    role="tabpanel"
    aria-labelledby={`tab-link-${id}`}
    aria-hidden={!active}
    data-tab-active={active ? '' : null}
    style={!active ? { top: '100px', position: 'absolute' } : {}}
  >
    <h6 className="menu-block__cat-name">{title}</h6>
    <MenuList items={items} currency={currency} />
  </div>
);

const Menu = () => {
  const [data, setData] = useState({
    currency: 'PLN',
    signatureBlends: {
      title: 'Nasze Specjalności',
      items: [
        { name: 'Eleganckie Espresso', desc: 'Bogata i pełna w smaku, nasza charakterystyczna mieszanka espresso z nutami gorzkiej czekolady i prażonych orzechów.', price: '3.50' },
        { name: 'Delikatna Rozkosz Mocha', desc: 'Jedwabiste mocha z nutą wanilii, zwieńczone aksamitną bitą śmietaną.', price: '4.25' },
        { name: 'Delikatna Rozkosz Mocha', desc: 'Jedwabiste mocha z nutą wanilii, zwieńczone aksamitną bitą śmietaną.', price: '4.25' },
        { name: 'Delikatna Rozkosz Mocha', desc: 'Jedwabiste mocha z nutą wanilii, zwieńczone aksamitną bitą śmietaną.', price: '4.25' },
        { name: 'Delikatna Rozkosz Mocha', desc: 'Jedwabiste mocha z nutą wanilii, zwieńczone aksamitną bitą śmietaną.', price: '4.25' },
        { name: 'Delikatna Rozkosz Mocha', desc: 'Jedwabiste mocha z nutą wanilii, zwieńczone aksamitną bitą śmietaną.', price: '4.25' },
      ]
    },
    pastries: {
      title: 'Świeże Wypieki',
      items: [
        { name: 'Maślane Croissanty', desc: 'Maślane i chrupiące croissanty wypiekane do perfekcji.', price: '2.50' },
      ]
    },
    gourmetTreats: {
      title: 'Wykwintne Przysmaki',
      items: [
        { name: 'Ręcznie Robione Trufle z Ciemnej Czekolady', desc: 'Luksusowe trufle z ciemnej czekolady posypane kakao.', price: '2.75' },
      ]
    }
  });
  const tabs = [
    { id: 'tab-signature-blends', label: data.signatureBlends.title, data: data.signatureBlends },
    { id: 'tab-pastries', label: data.pastries.title, data: data.pastries },
    { id: 'tab-gourmet-treats', label: data.gourmetTreats.title, data: data.gourmetTreats },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [activeTab]);
  
  return (
    <section id="menu" className="container s-menu target-section">
      <div className="row s-menu__content">
        <div className="column xl-4 lg-5 md-12 s-menu__content-start">
          <div className="section-header" data-num="02">
            <h2 className="text-display-title">Nasze Menu</h2>
          </div>
          <TabNav tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        </div>
        <div className="column xl-6 lg-6 md-12 s-menu__content-end">
          <div className="tab-content menu-block">
            {tabs.map(tab => (
              <TabPanel
                key={tab.id}
                id={tab.id}
                active={activeTab === tab.id}
                title={tab.data.title}
                items={tab.data.items}
                currency={data.currency}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;