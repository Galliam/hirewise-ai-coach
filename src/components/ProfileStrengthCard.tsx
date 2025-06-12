
interface ProfileStrengthCardProps {
  score: number;
  label: string;
}

const ProfileStrengthCard = ({ score, label }: ProfileStrengthCardProps) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile Strength</h2>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{score}</span>
            <span className="text-sm text-gray-500">{label}</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Marketability</span>
            <span className="text-sm font-medium text-gray-900">90%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[90%] transition-all duration-1000"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Experience</span>
            <span className="text-sm font-medium text-gray-900">70%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[70%] transition-all duration-1000"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Growth Potential</span>
            <span className="text-sm font-medium text-gray-900">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[60%] transition-all duration-1000"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Negotiation Power</span>
            <span className="text-sm font-medium text-gray-900">80%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-[80%] transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStrengthCard;
