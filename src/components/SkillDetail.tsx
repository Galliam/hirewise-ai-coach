
interface SkillDetailProps {
  skill: string;
  level: number;
  relatedTo: string[];
  achievements: string[];
  onClose: () => void;
}

const SkillDetail = ({ skill, level, relatedTo, achievements, onClose }: SkillDetailProps) => {
  const getLevelText = (level: number) => {
    if (level <= 3) return "Beginner";
    if (level <= 6) return "Intermediate";
    return "Advanced";
  };

  const getLevelColor = (level: number) => {
    if (level <= 3) return "bg-red-100 text-red-700";
    if (level <= 6) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{skill}</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Skill Level</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
                {getLevelText(level)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(level / 9) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-1">{level}/9</div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Related To</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTo.map((item, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What This Skill Allows You To Achieve</h3>
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-sm">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
