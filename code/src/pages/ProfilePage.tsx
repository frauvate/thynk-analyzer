import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Save, User, Building, Lock, Globe, Mail, Phone, MapPin, Star, Award } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isJobSeeker] = useState(user?.userType === 'job-seeker');
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    website: '',
    bio: '',
    // Job seeker specific
    title: isJobSeeker ? 'Software Developer' : '',
    openToWork: isJobSeeker ? true : false,
    // Employer specific
    companyName: !isJobSeeker ? 'TechCorp Inc.' : '',
    industry: !isJobSeeker ? 'Technology' : '',
    companySize: !isJobSeeker ? '51-200' : '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProfile({
      ...profile,
      [name]: checked
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update API call here
    alert('Profile updated successfully!');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Handle password update API call here
    alert('Password updated successfully!');
  };
  
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          {/* Profile header with premium badge if applicable */}
          <div className="relative bg-gradient-to-r from-primary to-secondary p-6 text-white">
            {user?.isPremium && (
              <div className="absolute top-4 right-4 flex items-center bg-white/20 rounded-full px-3 py-1">
                <Star className="h-4 w-4 mr-1 text-yellow-300" fill="currentColor" />
                <span className="text-sm font-medium">Premium Member</span>
              </div>
            )}
            <div className="flex items-center">
              {isJobSeeker ? (
                <User className="h-12 w-12 bg-white/20 p-2 rounded-full mr-4" />
              ) : (
                <Building className="h-12 w-12 bg-white/20 p-2 rounded-full mr-4" />
              )}
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-white/80">
                  {isJobSeeker ? profile.title || 'Job Seeker' : profile.companyName || 'Employer'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Profile tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'profile' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'security' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Security
              </button>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleProfileSubmit}>
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {isJobSeeker ? 'Full Name' : 'Contact Name'}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="input"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="input"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="input"
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={profile.location}
                            onChange={handleProfileChange}
                            className="input"
                            placeholder="City, Country"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={profile.website}
                            onChange={handleProfileChange}
                            className="input"
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                            Bio / About
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleProfileChange}
                            rows={4}
                            className="input"
                            placeholder="Tell us about yourself or your company..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Seeker Specific Fields */}
                    {isJobSeeker && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Professional Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={profile.title}
                              onChange={handleProfileChange}
                              className="input"
                              placeholder="e.g. Senior Frontend Developer"
                            />
                          </div>
                          <div className="flex items-center h-full">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="openToWork"
                                checked={profile.openToWork}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                              <span className="ml-2 text-gray-700">I'm open to work opportunities</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Employer Specific Fields */}
                    {!isJobSeeker && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              id="companyName"
                              name="companyName"
                              value={profile.companyName}
                              onChange={handleProfileChange}
                              className="input"
                            />
                          </div>
                          <div>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                              Industry
                            </label>
                            <select
                              id="industry"
                              name="industry"
                              value={profile.industry}
                              onChange={handleProfileChange}
                              className="input"
                            >
                              <option value="">Select Industry</option>
                              <option value="Technology">Technology</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Finance">Finance</option>
                              <option value="Education">Education</option>
                              <option value="Manufacturing">Manufacturing</option>
                              <option value="Retail">Retail</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                              Company Size
                            </label>
                            <select
                              id="companySize"
                              name="companySize"
                              value={profile.companySize}
                              onChange={handleProfileChange}
                              className="input"
                            >
                              <option value="">Select Company Size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="501-1000">501-1000 employees</option>
                              <option value="1000+">1000+ employees</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Subscription Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className={`rounded-full p-2 ${user?.isPremium ? 'bg-secondary/20 text-secondary' : 'bg-gray-200 text-gray-500'}`}>
                            {user?.isPremium ? <Award className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900">
                              {user?.isPremium ? 'Premium Plan' : 'Free Plan'}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {user?.isPremium 
                                ? 'You have access to all premium features'
                                : 'Upgrade to premium for additional features'
                              }
                            </p>
                          </div>
                          {!user?.isPremium && (
                            <button
                              type="button"
                              className="ml-auto btn-secondary text-sm"
                            >
                              Upgrade
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-primary flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="btn-primary flex items-center"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Management</h3>
                  <div className="flex flex-col space-y-3">
                    <button className="flex items-center text-left text-gray-700 hover:text-primary transition-colors">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>Update Email Address</span>
                    </button>
                    <button className="flex items-center text-left text-gray-700 hover:text-primary transition-colors">
                      <Globe className="h-5 w-5 mr-2" />
                      <span>Manage Notification Settings</span>
                    </button>
                    <button className="flex items-center text-left text-gray-700 hover:text-primary transition-colors">
                      <Lock className="h-5 w-5 mr-2" />
                      <span>Two-Factor Authentication</span>
                    </button>
                    <button className="flex items-center text-left text-error hover:text-error-dark transition-colors">
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;