import { Plus, Trash2 } from 'lucide-react';

type Skill = {
  id: string;
  name: string;
  level: number;
};

type SkillsData = {
  professional: Skill[];
  languages: Skill[];
};

interface SkillsFormProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const handleSkillChange = (type: 'professional' | 'languages', id: string, field: string, value: string | number) => {
    const updatedData = {
      ...data,
      [type]: data[type].map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    };
    onChange(updatedData);
  };

  const handleAddSkill = (type: 'professional' | 'languages') => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 3
    };
    onChange({
      ...data,
      [type]: [...data[type], newSkill]
    });
  };

  const handleRemoveSkill = (type: 'professional' | 'languages', id: string) => {
    if (data[type].length > 1) {
      onChange({
        ...data,
        [type]: data[type].filter(skill => skill.id !== id)
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      
      {/* Professional Skills */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Professional Skills</h3>
        </div>
        
        {data.professional.map((skill) => (
          <div key={skill.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-7">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange('professional', skill.id, 'name', e.target.value)}
                className="input"
                placeholder="e.g. JavaScript, Project Management"
              />
            </div>
            <div className="col-span-4">
              <select
                value={skill.level}
                onChange={(e) => handleSkillChange('professional', skill.id, 'level', parseInt(e.target.value))}
                className="input"
              >
                <option value={1}>Beginner</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Advanced</option>
                <option value={4}>Expert</option>
                <option value={5}>Master</option>
              </select>
            </div>
            <div className="col-span-1 flex justify-center">
              {data.professional.length > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveSkill('professional', skill.id)}
                  className="text-error hover:text-error-dark transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => handleAddSkill('professional')}
          className="mt-2 flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Professional Skill
        </button>
      </div>
      
      {/* Language Skills */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Languages</h3>
        </div>
        
        {data.languages.map((skill) => (
          <div key={skill.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-7">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange('languages', skill.id, 'name', e.target.value)}
                className="input"
                placeholder="e.g. English, Spanish"
              />
            </div>
            <div className="col-span-4">
              <select
                value={skill.level}
                onChange={(e) => handleSkillChange('languages', skill.id, 'level', parseInt(e.target.value))}
                className="input"
              >
                <option value={1}>Basic</option>
                <option value={2}>Conversational</option>
                <option value={3}>Proficient</option>
                <option value={4}>Fluent</option>
                <option value={5}>Native</option>
              </select>
            </div>
            <div className="col-span-1 flex justify-center">
              {data.languages.length > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveSkill('languages', skill.id)}
                  className="text-error hover:text-error-dark transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => handleAddSkill('languages')}
          className="mt-2 flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Language
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;