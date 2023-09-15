// Footer.js

import React from 'react';
import Instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import youtube from '../assets/youtube.svg';
function Footer() {
  return (
    <div className="footer mt-3">
      <div className="social d-flex justify-content-center mb-3 ">
        <a href="#">
       <img src={facebook} />
        </a>
        <a href='#'>
        <img src={Instagram} />
        </a>
        <a href='#'>
        <img src={twitter} />
        </a>
        <a href='#'>
        <img src={youtube} />
        </a>
        {/* Include similar code for other social icons */}
      </div>
      <div className="links text-center">
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Press Room</a>
      </div>
      <center className="copy">
        <p>© 2023 MovieBox by Ejimnkonye Onyedika</p>
      </center>
    </div>
  );
}

export default Footer;
