import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import ThynkLogo from './ThynkLogo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <ThynkLogo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-accent-dark">Thynk Analyzer</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting talented professionals with their dream jobs. Premium features for both job seekers and employers.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-dark transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/job-search" className="text-sm text-gray-600 hover:text-primary">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="text-sm text-gray-600 hover:text-primary">
                  CV Builder
                </Link>
              </li>
              <li>
                <Link to="/premium-plans" className="text-sm text-gray-600 hover:text-primary">
                  Premium Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/post-job" className="text-sm text-gray-600 hover:text-primary">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-sm text-gray-600 hover:text-primary">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link to="/premium-plans" className="text-sm text-gray-600 hover:text-primary">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Recruiting Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Thynk Analyzer. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm transition-colors">
              <MessageCircle size={16} className="mr-2" />
              Chat with Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;