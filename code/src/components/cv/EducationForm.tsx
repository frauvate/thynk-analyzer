import { Plus, Trash2 } from 'lucide-react';

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
};

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const handleChange = (id: string, field: string, value: string) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedData);
  };

  const handleAdd = () => {
    const newItem: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
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
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      
      {data.map((education, index) => (
        <div key={education.id} className="mb-8 pb-8 border-b border-gray-200 last:border-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Education #{index + 1}</h3>
            {data.length > 1 && (
              <button 
                type="button"
                onClick={() => handleRemove(education.id)}
                className="text-error hover:text-error-dark transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`institution-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Institution Name *
              </label>
              <input
                type="text"
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => handleChange(education.id, 'institution', e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor={`degree-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                className="input"
                placeholder="e.g. Bachelor's, Master's"
                required
              />
            </div>
            <div>
              <label htmlFor={`field-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                id={`field-${education.id}`}
                value={education.field}
                onChange={(e) => handleChange(education.id, 'field', e.target.value)}
                className="input"
                placeholder="e.g. Computer Science"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`startDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  id={`startDate-${education.id}`}
                  value={education.startDate}
                  onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor={`endDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  id={`endDate-${education.id}`}
                  value={education.endDate}
                  onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`description-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => handleChange(education.id, 'description', e.target.value)}
                className="input"
                rows={4}
                placeholder="Describe your academic achievements, projects, honors, etc..."
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
        Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;