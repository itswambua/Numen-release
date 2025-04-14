// components/Footer.tsx

import React, { JSX } from 'react';  // Import React if you're using React.createElement directly (required for JSX types)

interface FooterProps {
  quickLinks: { href: string; label: string; icon: JSX.Element }[];
  socialLinks: { href: string; label: string; icon: JSX.Element }[];
  contactEmail: string;
}

const Footer: React.FC<FooterProps> = ({ quickLinks, socialLinks, contactEmail }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky/90 text-deep-brown py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-rooster transition-colors duration-200 flex items-center">
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <div className="flex flex-col space-y-4">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href={`mailto:${contactEmail}`} className="hover:text-rooster transition-colors duration-200">
                  {contactEmail}
                </a>
              </p>

              <p className="mt-2 mb-2">Follow the author on social media</p>

              <div className="flex space-x-5">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-deep-brown hover:text-rooster transition-colors duration-200"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-deep-brown/20 mt-10 pt-6 text-center">
          <p className="text-sm">&copy; {currentYear} The Numen of Banda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
