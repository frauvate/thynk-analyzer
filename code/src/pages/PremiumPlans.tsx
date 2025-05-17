import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PremiumPlans = () => {
  const { user, upgradeAccount } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      await upgradeAccount();
      navigate(user?.userType === 'job-seeker' ? '/job-seeker' : '/employer');
    } catch (error) {
      console.error('Upgrade failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const jobSeekerFeatures = {
    free: [
      { name: 'Basic CV templates', included: true },
      { name: 'Job search with filters', included: true },
      { name: 'Apply to 10 jobs per month', included: true },
      { name: 'Premium CV templates', included: false },
      { name: 'Priority in search results', included: false },
      { name: 'Unlimited job applications', included: false },
      { name: 'Early access to job postings', included: false },
      { name: 'AI-powered job recommendations', included: false },
    ],
    premium: [
      { name: 'Basic CV templates', included: true },
      { name: 'Job search with filters', included: true },
      { name: 'Apply to 10 jobs per month', included: true },
      { name: 'Premium CV templates', included: true },
      { name: 'Priority in search results', included: true },
      { name: 'Unlimited job applications', included: true },
      { name: 'Early access to job postings', included: true },
      { name: 'AI-powered job recommendations', included: true },
    ],
  };

  const employerFeatures = {
    free: [
      { name: 'Post up to 3 jobs', included: true },
      { name: 'Basic candidate search', included: true },
      { name: 'Company profile', included: true },
      { name: 'Unlimited job postings', included: false },
      { name: 'Featured job listings', included: false },
      { name: 'Advanced candidate matching', included: false },
      { name: 'Premium candidate pool access', included: false },
      { name: 'Candidate analytics', included: false },
    ],
    premium: [
      { name: 'Post up to 3 jobs', included: true },
      { name: 'Basic candidate search', included: true },
      { name: 'Company profile', included: true },
      { name: 'Unlimited job postings', included: true },
      { name: 'Featured job listings', included: true },
      { name: 'Advanced candidate matching', included: true },
      { name: 'Premium candidate pool access', included: true },
      { name: 'Candidate analytics', included: true },
    ],
  };

  const features = user?.userType === 'employer' ? employerFeatures : jobSeekerFeatures;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Crown className="h-12 w-12 text-secondary inline-block mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Premium Plans</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Upgrade to premium to unlock exclusive features and get the most out of Thynk Analyzer.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-full shadow-sm flex">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedPlan === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center ${
                selectedPlan === 'annual'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Annual <span className="ml-1 text-xs bg-secondary px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            <div className="p-8 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Free Plan</h2>
              <p className="mt-2 text-gray-600">Basic features to get started</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              {!user ? (
                <button
                  onClick={() => navigate('/register')}
                  className="mt-8 w-full btn-outline"
                >
                  Sign Up for Free
                </button>
              ) : (
                <button
                  className="mt-8 w-full btn-outline opacity-50 cursor-not-allowed"
                  disabled
                >
                  Current Plan
                </button>
              )}
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-elevated overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 font-medium text-sm">
              Recommended
            </div>
            <div className="p-8 border-b bg-gradient-to-r from-primary to-secondary">
              <h2 className="text-2xl font-bold text-white">Premium Plan</h2>
              <p className="mt-2 text-white/80">All features to boost your success</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">
                  ${selectedPlan === 'monthly' ? '19.99' : '15.99'}
                </span>
                <span className="text-white/80">/month</span>
                {selectedPlan === 'annual' && (
                  <span className="ml-2 inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    Billed annually
                  </span>
                )}
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-900">{feature.name}</span>
                  </li>
                ))}
              </ul>
              {user?.isPremium ? (
                <button
                  className="mt-8 w-full btn-primary opacity-50 cursor-not-allowed"
                  disabled
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className={`mt-8 w-full btn-primary ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? 'Processing...' : 'Upgrade Now'}
                  {!isProcessing && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold text-gray-900">What happens when I upgrade to Premium?</h3>
              <p className="mt-2 text-gray-600">
                Upon upgrading to Premium, you'll instantly unlock all premium features. Job seekers gain access to premium templates and unlimited applications, while employers can post unlimited jobs and access advanced candidate matching.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold text-gray-900">Can I cancel my subscription anytime?</h3>
              <p className="mt-2 text-gray-600">
                Yes, you can cancel your premium subscription at any time. Your premium benefits will continue until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold text-gray-900">How do premium CV templates differ from free ones?</h3>
              <p className="mt-2 text-gray-600">
                Premium CV templates offer advanced design options, enhanced customization, and professionally crafted layouts that help your application stand out to potential employers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for premium subscriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;