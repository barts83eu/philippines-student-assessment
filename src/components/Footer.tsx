import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: 'Platform Features',
      links: [
        { name: t('assessments'), href: '#assessments' },
        { name: t('progress'), href: '#progress' },
        { name: t('reports'), href: '#reports' },
        { name: t('resources'), href: '#resources' }
      ]
    },
    {
      title: 'Professional Services',
      links: [
        { name: 'Assessment Centers', href: '#centers' },
        { name: 'Remedial Teachers', href: '#teachers' },
        { name: 'Educational Therapy', href: '#therapy' },
        { name: 'Consultation', href: '#consultation' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: t('help'), href: '#help' },
        { name: 'User Guides', href: '#guides' },
        { name: 'Technical Support', href: '#support' },
        { name: 'Contact Us', href: '#contact' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Student Assessment</h3>
                <p className="text-sm text-gray-400">Assessment Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering Filipino students through comprehensive educational assessment and analytics.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">budots.media.philippines@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">+63 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Manila, Philippines</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>
                © 2024 Student Assessment Platform.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
          
          {/* PISA Reference */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              PISA (Programme for International Student Assessment) is conducted by the OECD. 
              This platform provides PISA-aligned assessments to help Filipino students prepare for international benchmarks.
            </p>
          </div>

          {/* Budots Credit - Moved to Bottom */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Developed by{' '}
              <a 
                href="https://budotsmediaphilippines.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
              >
                Budots Media Philippines
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;