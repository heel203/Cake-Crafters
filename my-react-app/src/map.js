import React from 'react';

function MapEmbed() {
  return (
    <div className="container-fluid mt-0 mb-4">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7534.469766647966!2d72.83809079020334!3d19.228592508363988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b12efa4d16d5%3A0xc58e98b74b2dace7!2sVazira%2C%20Borivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710773345346!5m2!1sen!2sin" 
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default MapEmbed;
