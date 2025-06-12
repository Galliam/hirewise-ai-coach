
import BottomNavigation from "@/components/BottomNavigation";
import ProfileStrengthCard from "@/components/ProfileStrengthCard";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Hirewise</h1>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600">🔔</button>
              <button className="text-gray-600">👤</button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <ProfileStrengthCard score={75} label="Good" />
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
