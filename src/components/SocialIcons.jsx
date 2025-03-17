import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function SocialIcons() {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com/avlasesorias/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Visitar Facebook de AVL Asesorías">
        <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
      </a>
      <a href="https://www.instagram.com/avlasesorias/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors" aria-label="Visitar Instagram de AVL Asesorías">
        <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
      </a>
      <a href="https://www.linkedin.com/company/avl-asesorias/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors" aria-label="Visitar LinkedIn de AVL Asesorías">
        <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
      </a>
      <a href="https://x.com/avlasesorias" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors" aria-label="Visitar X (Twitter) de AVL Asesorías">
        <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
      </a>
      <a href="https://www.tiktok.com/@avlasesorias" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors" aria-label="Visitar TikTok de AVL Asesorías">
        <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
      </a>
    </div>
  );
} 