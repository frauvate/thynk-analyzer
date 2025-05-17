import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const handleChange = (id: string, field: string, value: string | boolean) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedData);
  };

  const handleAdd = () => {
    const newItem: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (id: string) => {
    if (data.length > 1) {
      const updatedData = data.filter(item => item.id !== id);
      onChange(updatedData);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      
      {data.map((experience, index) => (
        <div key={experience.id} className="mb-8 pb-8 border-b border-gray-200 last:border-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Experience #{index + 1}</h3>
            {data.length > 1 && (
              <button 
                type="button"
                onClick={() => handleRemove(experience.id)}
                className="text-error hover:text-error-dark transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`company-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => handleChange(experience.id, 'company', e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor={`position-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={(e) => handleChange(experience.id, 'position', e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor={`startDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                id={`startDate-${experience.id}`}
                value={experience.startDate}
                onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor={`endDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date {experience.current ? '(Current)' : '*'}
              </label>
              <input
                type="date"
                id={`endDate-${experience.id}`}
                value={experience.endDate}
                onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                className="input"
                disabled={experience.current}
                required={!experience.current}
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => handleChange(experience.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">I currently work here</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`description-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleChange(experience.id, 'description', e.target.value)}
                className="input"
                rows={4}
                placeholder="Describe your responsibilities, achievements, and skills used..."
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        <Plus className="h-5 w-5 mr-1" />
        Add Another Experience
      </button>
    </div>
  );
};

export default ExperienceForm;