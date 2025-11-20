import React from 'react';

const Preloader = React.forwardRef((props, ref) => {
  return (
    <div id="preloader" ref={ref}>
      <div id="loader" className="dots-fade">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
});

export default Preloader;