import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Search, Briefcase, ChevronRight, Bell, MessageSquare, Award, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [cvData, setCvData] = useState<any>(null);
  
  useEffect(() => {
    // Load saved CV data
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      setCvData(JSON.parse(savedData));
    }

    // Mock data for recent jobs
    const mockRecentJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'Istanbul, Turkey',
        type: 'Full-time',
        salary: '$80,000 - $100,000',
        posted: '2 days ago',
        logo: 'https://images.pexels.com/photos/6170639/pexels-photo-6170639.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 2,
        title: 'UX Designer',
        company: 'Creative Solutions',
        location: 'Ankara, Turkey',
        type: 'Full-time',
        salary: '$70,000 - $90,000',
        posted: '3 days ago',
        logo: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 3,
        title: 'DevOps Engineer',
        company: 'CloudTech',
        location: 'Remote',
        type: 'Full-time',
        salary: '$90,000 - $110,000',
        posted: '1 week ago',
        logo: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ];
    
    // Mock data for job applications
    const mockJobApplications = [
      {
        id: 1,
        title: 'Product Manager',
        company: 'Innovate Solutions',
        status: 'Interview',
        date: '2023-04-10',
        logo: 'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'WebWorks',
        status: 'Applied',
        date: '2023-04-05',
        logo: 'https://images.pexels.com/photos/7613/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100'
      }
    ];
    
    setRecentJobs(mockRecentJobs);
    setJobApplications(mockJobApplications);
  }, []);

  const calculateProfileCompleteness = () => {
    if (!cvData) return 0;

    let total = 0;
    let completed = 0;

    // Personal info
    const personalFields = ['firstName', 'lastName', 'email', 'phone', 'title', 'summary'];
    personalFields.forEach(field => {
      total++;
      if (cvData.personal[field]) completed++;
    });

    // Experience
    if (cvData.experience.length > 0) {
      cvData.experience.forEach((exp: any) => {
        const fields = ['company', 'position', 'startDate', 'description'];
        fields.forEach(field => {
          total++;
          if (exp[field]) completed++;
        });
      });
    }

    // Education
    if (cvData.education.length > 0) {
      cvData.education.forEach((edu: any) => {
        const fields = ['institution', 'degree', 'field', 'startDate'];
        fields.forEach(field => {
          total++;
          if (edu[field]) completed++;
        });
      });
    }

    // Skills
    if (cvData.skills.professional.length > 0) {
      cvData.skills.professional.forEach((skill: any) => {
        total++;
        if (skill.name) completed++;
      });
    }

    return Math.round((completed / total) * 100);
  };
  
  const profileCompleteness = calculateProfileCompleteness();

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
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {cvData?.personal?.firstName || user?.name}</h1>
            <p className="text-gray-600 mt-1">Let's find your dream job today!</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <button className="btn bg-white text-gray-700 hover:bg-gray-50 flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
              </span>
            </button>
            <button className="btn bg-white text-gray-700 hover:bg-gray-50">
              <MessageSquare className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CV Completion & Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-card p-6 col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">CV Completion</h2>
              <Link to="/cv-builder" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
                Update CV <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
                  <span className="text-sm font-medium text-gray-700">{profileCompleteness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${profileCompleteness}%` }}
                  ></div>
                </div>
              </div>
              
              {cvData && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Current Position:</strong> {cvData.personal.title || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Experience:</strong> {cvData.experience.length} positions listed
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Education:</strong> {cvData.education.length} qualifications listed
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Skills:</strong> {cvData.skills.professional.length} professional skills listed
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <Eye className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-600">Profile Views</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 text-center">
                  <Search className="h-5 w-5 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-600">Searches</p>
                </div>
                <div className="bg-accent/10 rounded-lg p-4 text-center">
                  <Briefcase className="h-5 w-5 text-accent-dark mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-xs text-gray-600">Applications</p>
                </div>
                <div className="bg-success/10 rounded-lg p-4 text-center">
                  <Award className="h-5 w-5 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-xs text-gray-600">Interviews</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-card p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link to="/cv-builder" className="flex items-center p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <FileText className="h-5 w-5 mr-3" />
                <span>Update CV</span>
              </Link>
              <Link to="/job-search" className="flex items-center p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Search className="h-5 w-5 mr-3" />
                <span>Search Jobs</span>
              </Link>
              {!user?.isPremium && (
                <Link to="/premium-plans" className="flex items-center p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Award className="h-5 w-5 mr-3" />
                  <span>Upgrade to Premium</span>
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Job Recommendations */}
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recommended Jobs</h2>
            <Link to="/job-search" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <motion.div 
                key={job.id} 
                className="bg-white rounded-lg shadow-card hover:shadow-elevated transition-shadow p-6"
                variants={itemVariants}
              >
                <div className="flex items-start mb-4">
                  <img 
                    src={job.logo} 
                    alt={job.company} 
                    className="w-12 h-12 rounded-md object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600 text-sm">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.salary}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Posted {job.posted}</span>
                  <Link 
                    to={`/job/${job.id}`} 
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobApplications.map((application) => (
                  <motion.tr key={application.id} variants={itemVariants}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-md object-cover" src={application.logo} alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'Interview' ? 'bg-success-light text-success-dark' : 'bg-primary-light/50 text-primary-dark'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href="#" className="text-primary hover:text-primary-dark">
                        View
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;