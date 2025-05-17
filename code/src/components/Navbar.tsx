import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Crown, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThynkLogo from './ThynkLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ThynkLogo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-accent-dark">Thynk Analyzer</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Home
            </Link>
            
            {!user && (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  to={user.userType === 'job-seeker' ? '/job-seeker' : '/employer'}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(user.userType === 'job-seeker' ? '/job-seeker' : '/employer') 
                      ? 'text-primary-dark' 
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Dashboard
                </Link>
                
                {user.userType === 'job-seeker' && (
                  <>
                    <Link
                      to="/cv-builder"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/cv-builder') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      CV Builder
                    </Link>
                    <Link
                      to="/job-search"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/job-search') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <Search className="h-4 w-4 inline mr-1" />
                      Find Jobs
                    </Link>
                  </>
                )}
                
                {user.userType === 'employer' && (
                  <>
                    <Link
                      to="/post-job"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/post-job') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/candidates"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/candidates') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Find Candidates
                    </Link>
                  </>
                )}
                
                {!user.isPremium && (
                  <Link
                    to="/premium-plans"
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-secondary-dark hover:text-secondary transition-colors"
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    Premium
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {!user && (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/login') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to={user.userType === 'job-seeker' ? '/job-seeker' : '/employer'}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(user.userType === 'job-seeker' ? '/job-seeker' : '/employer') 
                    ? 'text-primary-dark' 
                    : 'text-gray-600 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              
              {user.userType === 'job-seeker' && (
                <>
                  <Link
                    to="/cv-builder"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/cv-builder') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    CV Builder
                  </Link>
                  <Link
                    to="/job-search"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/job-search') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    <Search className="h-4 w-4 inline mr-1" />
                    Find Jobs
                  </Link>
                </>
              )}
              
              {user.userType === 'employer' && (
                <>
                  <Link
                    to="/post-job"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/post-job') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    Post Job
                  </Link>
                  <Link
                    to="/candidates"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/candidates') ? 'text-primary-dark' : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    Find Candidates
                  </Link>
                </>
              )}
              
              {!user.isPremium && (
                <Link
                  to="/premium-plans"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-secondary-dark hover:text-secondary"
                  onClick={closeMenu}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Premium
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;