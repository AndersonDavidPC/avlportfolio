import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function SocialIcons() {
  return (
    <div className="flex space-x-4">
      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
        <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
        <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
        <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
      </a>
    </div>
  );
} 