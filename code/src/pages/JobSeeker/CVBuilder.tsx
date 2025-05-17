import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, Download, Eye, ChevronRight, ChevronLeft } from 'lucide-react';

// Import mock data and templates
import { templates, initialCVData } from '../../data/cv-templates';
import CVPreview from '../../components/cv/CVPreview';
import PersonalInfoForm from '../../components/cv/PersonalInfoForm';
import ExperienceForm from '../../components/cv/ExperienceForm';
import EducationForm from '../../components/cv/EducationForm';
import SkillsForm from '../../components/cv/SkillsForm';
import { useAuth } from '../../contexts/AuthContext';

const steps = [
  { id: 'template', name: 'Select Template', icon: FileText },
  { id: 'personal', name: 'Personal Info', icon: FileText },
  { id: 'experience', name: 'Experience', icon: FileText },
  { id: 'education', name: 'Education', icon: FileText },
  { id: 'skills', name: 'Skills', icon: FileText },
  { id: 'preview', name: 'Preview', icon: Eye }
];

const CVBuilder = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [cvData, setCVData] = useState(initialCVData);
  
  // Load saved CV data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedData) {
      setCVData(JSON.parse(savedData));
    }
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
      window.scrollTo(0, 0);
    }
  };
  
  const updateCVData = (section: string, data: any) => {
    const updatedData = {
      ...cvData,
      [section]: data
    };
    setCVData(updatedData);
    localStorage.setItem('cvData', JSON.stringify(updatedData));
  };

  // Save template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    localStorage.setItem('selectedTemplate', templateId);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your CV</h1>
          <p className="text-gray-600 mt-1">Build a professional CV that stands out and gets you noticed.</p>
        </div>
        
        {/* Step Progress */}
        <div className="mb-8">
          <div className="hidden md:flex justify-center">
            <nav className="flex items-center space-x-2" aria-label="Progress">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center ${
                    currentStepIndex >= index 
                      ? 'text-primary' 
                      : 'text-gray-400'
                  }`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStepIndex >= index 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStepIndex > index ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="ml-2 text-sm font-medium hidden sm:block">
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="ml-2 text-gray-300">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="md:hidden">
            <p className="text-sm font-medium text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
            <h3 className="text-lg font-medium text-primary">
              {steps[currentStepIndex].name}
            </h3>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="bg-white shadow-card rounded-lg p-6 mb-8">
          {currentStep === 'template' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div 
                    key={template.id} 
                    className={`cv-template rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedTemplate === template.id ? 'border-primary' : 'border-transparent hover:border-gray-200'
                    } ${template.isPremium && !user?.isPremium ? 'premium-feature opacity-70' : ''}`}
                    onClick={() => {
                      if (!template.isPremium || user?.isPremium) {
                        handleTemplateSelect(template.id);
                      }
                    }}
                  >
                    <img 
                      src={template.thumbnail} 
                      alt={template.name} 
                      className="w-full h-auto rounded-t-lg"
                    />
                    <div className="p-3 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{template.name}</span>
                        {template.isPremium && !user?.isPremium ? (
                          <span className="premium-badge">Premium</span>
                        ) : selectedTemplate === template.id ? (
                          <Check className="text-primary w-5 h-5" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {templates.some(t => t.isPremium) && !user?.isPremium && (
                <div className="mt-6 bg-secondary/10 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Upgrade to Premium</span> to access all CV templates and get more job opportunities.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {currentStep === 'personal' && (
            <PersonalInfoForm 
              data={cvData.personal} 
              onChange={(data) => updateCVData('personal', data)} 
            />
          )}
          
          {currentStep === 'experience' && (
            <ExperienceForm 
              data={cvData.experience} 
              onChange={(data) => updateCVData('experience', data)} 
            />
          )}
          
          {currentStep === 'education' && (
            <EducationForm 
              data={cvData.education} 
              onChange={(data) => updateCVData('education', data)} 
            />
          )}
          
          {currentStep === 'skills' && (
            <SkillsForm 
              data={cvData.skills} 
              onChange={(data) => updateCVData('skills', data)} 
            />
          )}
          
          {currentStep === 'preview' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Preview Your CV</h2>
              </div>
              <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <CVPreview 
                  template={templates.find(t => t.id === selectedTemplate)!} 
                  data={cvData}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button 
            onClick={handlePrevious} 
            className={`btn-outline ${currentStepIndex === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button 
            onClick={handleNext} 
            className={`btn-primary ${currentStepIndex === steps.length - 1 ? 'invisible' : ''}`}
          >
            {currentStepIndex === steps.length - 2 ? 'Preview CV' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;