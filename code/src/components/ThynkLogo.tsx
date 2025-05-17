import { Search } from 'lucide-react';

interface ThynkLogoProps {
  className?: string;
}

const ThynkLogo = ({ className = 'h-8 w-8' }: ThynkLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Search className="text-accent-dark" size={24} />
      </div>
      <img 
        src="/logo.svg" 
        alt="Thynk Analyzer Logo" 
        className="w-full h-full"
      />
    </div>
  );
};

export default ThynkLogo;