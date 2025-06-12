
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type?: string;
  matchPercentage: number;
  onApply: () => void;
}

const JobCard = ({ title, company, location, type, matchPercentage, onApply }: JobCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 mb-2">{company}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              📍 {location}
            </span>
            {type && (
              <span className="flex items-center">
                💼 {type}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">{matchPercentage}%</span>
          <span className="text-xs text-gray-500 block">match</span>
        </div>
      </div>
      
      <Button 
        onClick={onApply}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
      >
        Apply Now
      </Button>
    </div>
  );
};

export default JobCard;
