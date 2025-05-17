import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="relative mx-auto h-24 w-24 text-primary">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M20 50C20 33.4315 33.4315 20 50 20V20C66.5685 20 80 33.4315 80 50V50C80 66.5685 66.5685 80 50 80V80C33.4315 80 20 66.5685 20 50V50Z"
                stroke="#cba6e6"
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.path
                d="M50 38V62"
                stroke="#1836b2"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
              <motion.path
                d="M50 78V78.01"
                stroke="#1836b2"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              />
            </svg>
          </div>
        </div>
      
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mt-8">
            <Link to="/" className="btn-primary">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;