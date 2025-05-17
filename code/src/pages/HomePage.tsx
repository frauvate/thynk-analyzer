import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Search, Building, Star, CheckCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: 'Professional CV Builder',
      description: 'Create stunning, professional CVs with our easy-to-use templates',
      userType: 'job-seeker'
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations based on your skills and experience',
      userType: 'job-seeker'
    },
    {
      icon: <Building className="h-6 w-6 text-primary" />,
      title: 'Company Profiles',
      description: 'Showcase your company and attract the best talent',
      userType: 'employer'
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: 'Premium Features',
      description: 'Unlock additional features with our premium subscription',
      userType: 'both'
    }
  ];

  const testimonials = [
    {
      text: "Thynk Analyzer helped me create a stunning CV and find my dream job within weeks!",
      author: "Sarah Johnson",
      role: "Software Developer",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      text: "As an employer, finding the right candidates has never been easier. The premium features are worth every penny.",
      author: "Michael Chen",
      role: "HR Director",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      text: "The CV templates are modern and professional. I received more interview calls than ever before!",
      author: "Emma Rodriguez",
      role: "Marketing Specialist",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Find Your <span className="text-primary">Dream Job</span> or <span className="text-accent-dark">Perfect Candidate</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect job seekers with employers through our advanced platform with premium features and beautiful CV templates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {!user && (
                  <>
                    <Link to="/register" className="btn-primary">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/login" className="btn-outline">
                      Sign In
                    </Link>
                  </>
                )}
                {user && user.userType === 'job-seeker' && (
                  <>
                    <Link to="/cv-builder" className="btn-primary">
                      Create Your CV
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/job-search" className="btn-outline">
                      Find Jobs
                    </Link>
                  </>
                )}
                {user && user.userType === 'employer' && (
                  <>
                    <Link to="/post-job" className="btn-primary">
                      Post a Job
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/candidates" className="btn-outline">
                      Find Candidates
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Job seekers and employers meeting" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-primary" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Features for Everyone
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for a job or hiring talent, Thynk Analyzer has the tools you need to succeed.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-card hover:shadow-elevated transition-shadow"
                variants={itemVariants}
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Upgrade to <span className="text-secondary-dark">Premium</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock exclusive features and get ahead of the competition with our premium plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div 
              className="bg-white rounded-lg shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary p-6">
                <h3 className="text-2xl font-bold text-white">For Job Seekers</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Access to premium CV templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Priority in job recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Unlimited job applications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Early access to new job postings</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/premium-plans" className="btn-primary w-full justify-center">
                    Get Premium
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-accent-dark p-6">
                <h3 className="text-2xl font-bold text-white">For Employers</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Unlimited candidate searches</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Featured job postings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Advanced candidate matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-dark mt-0.5 mr-2 flex-shrink-0" />
                    <span>Access to premium candidate pool</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/premium-plans" className="btn-accent w-full justify-center">
                    Get Premium
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who found success with Thynk Analyzer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-card relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary rounded-full p-2">
                  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 15V10C5.5 7 7.5 4.9 10.5 4.9V4C7.5 4 5 6.6 5 10V15H5.5ZM12.5 15V10C12.5 7 14.5 4.9 17.5 4.9V4C14.5 4 12 6.6 12 10V15H12.5Z" fill="white"/>
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 mt-2">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Career or Find the Perfect Candidate?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of professionals who have already found success with Thynk Analyzer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {!user && (
              <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
            {user && user.userType === 'job-seeker' && (
              <Link to="/cv-builder" className="btn bg-white text-primary hover:bg-gray-100">
                Create Your CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
            {user && user.userType === 'employer' && (
              <Link to="/post-job" className="btn bg-white text-primary hover:bg-gray-100">
                Post a Job
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;