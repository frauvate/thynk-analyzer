import { motion } from 'framer-motion';
import { generatePDF } from '../../utils/pdfGenerator';
import { Download } from 'lucide-react';

interface CVPreviewProps {
  template: {
    id: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    layout: string;
  };
  data: any;
}

const CVPreview = ({ template, data }: CVPreviewProps) => {
  const getTemplateStyles = () => {
    switch (template.layout) {
      case 'sidebar':
        return {
          container: 'grid grid-cols-3 min-h-[1056px]',
          sidebar: 'col-span-1 bg-gray-100 p-8',
          main: 'col-span-2 p-8'
        };
      case 'modern':
        return {
          container: 'flex flex-col min-h-[1056px]',
          header: 'bg-gradient-to-r from-primary to-secondary text-white p-8',
          main: 'grid grid-cols-2 gap-8 p-8'
        };
      case 'minimal':
        return {
          container: 'flex flex-col min-h-[1056px] p-8',
          header: 'border-b-2 pb-6 mb-6',
          main: 'grid grid-cols-1 gap-6'
        };
      case 'executive':
        return {
          container: 'flex flex-col min-h-[1056px]',
          header: 'bg-gray-900 text-white p-12 text-center',
          main: 'p-8 grid grid-cols-2 gap-x-12 gap-y-8'
        };
      default: // classic
        return {
          container: 'flex flex-col min-h-[1056px] p-8',
          header: 'mb-8',
          main: 'grid grid-cols-1 gap-6'
        };
    }
  };

  const renderHeader = () => {
    const headerContent = (
      <>
        <h1 className="text-2xl font-bold mb-1">
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p className="text-lg mb-2">{data.personal.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
        </div>
      </>
    );

    if (template.layout === 'modern' || template.layout === 'executive') {
      return <div className="text-center">{headerContent}</div>;
    }

    return headerContent;
  };

  const renderSummary = () => (
    data.personal.summary && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2" style={{ color: template.primaryColor }}>
          Professional Summary
        </h2>
        <p className="text-gray-700">{data.personal.summary}</p>
      </div>
    )
  );

  const renderExperience = () => (
    data.experience.length > 0 && data.experience[0].company && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2" style={{ color: template.primaryColor }}>
          Work Experience
        </h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">{exp.position}</h3>
              <span className="text-sm text-gray-600">
                {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                {exp.current ? ' Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </span>
            </div>
            <p className="text-gray-700">{exp.company}</p>
            {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
          </div>
        ))}
      </div>
    )
  );

  const renderEducation = () => (
    data.education.length > 0 && data.education[0].institution && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2" style={{ color: template.primaryColor }}>
          Education
        </h2>
        {data.education.map((edu: any) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
              <span className="text-sm text-gray-600">
                {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </span>
            </div>
            <p className="text-gray-700">{edu.institution}</p>
            {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
          </div>
        ))}
      </div>
    )
  );

  const renderSkills = () => (
    data.skills.professional.length > 0 && data.skills.professional[0].name && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2" style={{ color: template.primaryColor }}>
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Professional Skills</h3>
            <ul className="space-y-2">
              {data.skills.professional.map((skill: any) => (
                <li key={skill.id} className="flex items-center">
                  <span className="mr-2">{skill.name}</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(skill.level / 5) * 100}%`,
                        backgroundColor: template.primaryColor 
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Languages</h3>
            <ul className="space-y-2">
              {data.skills.languages.map((lang: any) => (
                <li key={lang.id} className="flex items-center">
                  <span className="mr-2">{lang.name}</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(lang.level / 5) * 100}%`,
                        backgroundColor: template.secondaryColor 
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );

  const handleDownload = () => {
    const fileName = `${data.personal.firstName || 'CV'}-${data.personal.lastName || 'Document'}-${new Date().getTime()}.pdf`;
    generatePDF('cv-preview', fileName);
  };

  const styles = getTemplateStyles();

  return (
    <div className="relative">
      <div 
        id="cv-preview"
        className={`bg-white ${styles.container}`}
        style={{ 
          fontFamily: template.fontFamily,
          color: template.primaryColor 
        }}
      >
        {template.layout === 'sidebar' ? (
          <>
            <div className={styles.sidebar}>
              {renderHeader()}
              {renderSkills()}
            </div>
            <div className={styles.main}>
              {renderSummary()}
              {renderExperience()}
              {renderEducation()}
            </div>
          </>
        ) : template.layout === 'modern' ? (
          <>
            <div className={styles.header}>
              {renderHeader()}
            </div>
            <div className={styles.main}>
              <div>
                {renderSummary()}
                {renderExperience()}
              </div>
              <div>
                {renderEducation()}
                {renderSkills()}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.header}>
              {renderHeader()}
            </div>
            <div className={styles.main}>
              {renderSummary()}
              {renderExperience()}
              {renderEducation()}
              {renderSkills()}
            </div>
          </>
        )}
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CVPreview;