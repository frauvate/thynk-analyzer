import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, ChevronDown, X, Clock, Briefcase, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Istanbul, Turkey',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    posted: '2 days ago',
    description: 'We are looking for a skilled Frontend Developer with experience in React, TypeScript, and modern frontend practices.',
    requirements: [
      'Minimum 5 years of experience with JavaScript',
      'Proficiency in React, Redux, and TypeScript',
      'Experience with responsive design and cross-browser compatibility',
      'Strong problem-solving skills and attention to detail',
    ],
    featured: true,
    logo: 'https://images.pexels.com/photos/6170639/pexels-photo-6170639.jpeg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'Creative Solutions',
    location: 'Ankara, Turkey',
    type: 'Full-time',
    salary: '$70,000 - $90,000',
    posted: '3 days ago',
    description: 'Creative Solutions is seeking a talented UX Designer who can create intuitive and engaging user experiences for digital products.',
    requirements: [
      'Portfolio demonstrating strong UX/UI design skills',
      'Experience with design tools (Figma, Sketch, Adobe XD)',
      'Understanding of user research and usability testing',
      'Ability to collaborate with cross-functional teams',
    ],
    featured: false,
    logo: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90,000 - $110,000',
    posted: '1 week ago',
    description: 'CloudTech is hiring a DevOps Engineer to build and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      'Experience with AWS, GCP, or Azure',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Experience with infrastructure as code (Terraform, CloudFormation)',
      'Strong scripting skills (Bash, Python)',
    ],
    featured: false,
    logo: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Innovate Solutions',
    location: 'Istanbul, Turkey',
    type: 'Full-time',
    salary: '$85,000 - $105,000',
    posted: '5 days ago',
    description: 'Innovate Solutions is looking for a Product Manager to lead product development and strategy.',
    requirements: [
      'Minimum 3 years of experience in product management',
      'Track record of successful product launches',
      'Experience with agile development methodologies',
      'Strong analytical and communication skills',
    ],
    featured: true,
    logo: 'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
  {
    id: '5',
    title: 'Backend Developer (Node.js)',
    company: 'WebWorks',
    location: 'Izmir, Turkey',
    type: 'Full-time',
    salary: '$75,000 - $95,000',
    posted: '1 week ago',
    description: 'WebWorks is seeking a Backend Developer to design and implement server-side logic for our web applications.',
    requirements: [
      'Experience with Node.js and Express',
      'Knowledge of database systems (MongoDB, PostgreSQL)',
      'Understanding of RESTful API design',
      'Experience with authentication and authorization mechanisms',
    ],
    featured: false,
    logo: 'https://images.pexels.com/photos/7613/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'Growth Hackers',
    location: 'Remote',
    type: 'Part-time',
    salary: '$30 - $40 per hour',
    posted: '2 weeks ago',
    description: 'Growth Hackers is looking for a Marketing Specialist to help with digital marketing campaigns.',
    requirements: [
      'Experience with social media marketing',
      'Knowledge of SEO and SEM',
      'Experience with email marketing campaigns',
      'Analytical mindset for tracking and optimization',
    ],
    featured: false,
    logo: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=100',
    applied: false
  },
];

// Locations for filter
const locations = [
  'All Locations',
  'Istanbul, Turkey',
  'Ankara, Turkey',
  'Izmir, Turkey',
  'Remote',
];

// Job types for filter
const jobTypes = [
  'All Types',
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
];

// Salary ranges for filter
const salaryRanges = [
  'All Salaries',
  'Under $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  'Over $100,000',
];

const JobSearch = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(mockJobs);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [jobType, setJobType] = useState('All Types');
  const [salary, setSalary] = useState('All Salaries');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<{
    show: boolean;
    success: boolean;
    jobId: string | null;
  }>({
    show: false,
    success: false,
    jobId: null
  });

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = mockJobs;
    
    // Search by title or company
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by location
    if (location !== 'All Locations') {
      filtered = filtered.filter(job => job.location === location);
    }
    
    // Filter by job type
    if (jobType !== 'All Types') {
      filtered = filtered.filter(job => job.type === jobType);
    }
    
    // Filter by salary
    if (salary !== 'All Salaries') {
      const salaryValue = parseInt(job.salary.match(/\d+/g)[0]);
      switch (salary) {
        case 'Under $50,000':
          filtered = filtered.filter(job => salaryValue < 50000);
          break;
        case '$50,000 - $75,000':
          filtered = filtered.filter(job => salaryValue >= 50000 && salaryValue <= 75000);
          break;
        case '$75,000 - $100,000':
          filtered = filtered.filter(job => salaryValue >= 75000 && salaryValue <= 100000);
          break;
        case 'Over $100,000':
          filtered = filtered.filter(job => salaryValue > 100000);
          break;
      }
    }
    
    setJobs(filtered);
  }, [search, location, jobType, salary]);

  const resetFilters = () => {
    setLocation('All Locations');
    setJobType('All Types');
    setSalary('All Salaries');
  };

  const handleApply = async (jobId: string) => {
    // Simulate API call
    try {
      // Update local state
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, applied: true } : job
      ));
      
      setApplicationStatus({
        show: true,
        success: true,
        jobId
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setApplicationStatus({
          show: false,
          success: false,
          jobId: null
        });
      }, 3000);
    } catch (error) {
      setApplicationStatus({
        show: true,
        success: false,
        jobId
      });
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Job</h1>
          <p className="text-gray-600 mt-1">Browse and apply to jobs that match your skills and interests.</p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Search jobs, companies, or keywords"
              />
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {showFilters && (
            <motion.div 
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <select
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {salaryRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="flex items-center text-gray-600 hover:text-primary"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Jobs List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card">
              <div className="border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold">{jobs.length} Jobs Found</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${selectedJob === job.id ? 'bg-gray-50' : ''}`}
                      onClick={() => setSelectedJob(job.id)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex">
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="w-12 h-12 rounded-md object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{job.title}</h3>
                              <p className="text-gray-600">{job.company}</p>
                            </div>
                            {job.featured && (
                              <span className="bg-primary/10 text-primary px-2 py-1 text-xs font-medium rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center text-sm text-gray-600">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {job.type}
                            </span>
                            <span className="inline-flex items-center text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </span>
                            <span className="inline-flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.posted}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{job.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No jobs found matching your criteria. Try adjusting your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {selectedJob ? (
              <motion.div 
                className="bg-white rounded-lg shadow-card p-6 sticky top-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {jobs.map((job) => (
                  job.id === selectedJob && (
                    <div key={job.id}>
                      <div className="flex items-start mb-4">
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="w-16 h-16 rounded-md object-cover mr-4"
                        />
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="h-5 w-5 mr-2" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-5 w-5 mr-2" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2" />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                        <p className="text-gray-700">{job.description}</p>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-gray-700">{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-8">
                        {applicationStatus.show && applicationStatus.jobId === job.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg mb-4 ${
                              applicationStatus.success 
                                ? 'bg-success-light text-success-dark'
                                : 'bg-error-light text-error'
                            }`}
                          >
                            {applicationStatus.success 
                              ? 'Application submitted successfully!'
                              : 'Failed to submit application. Please try again.'}
                          </motion.div>
                        )}
                        
                        <button 
                          className={`btn-primary w-full mb-3 ${
                            job.applied ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={() => !job.applied && handleApply(job.id)}
                          disabled={job.applied}
                        >
                          {job.applied ? 'Applied' : 'Apply Now'}
                        </button>
                        <button className="btn-outline w-full">Save Job</button>
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-6 text-center">
                <div className="text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium text-gray-900 mb-2">Job Details</h3>
                  <p>Select a job to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;