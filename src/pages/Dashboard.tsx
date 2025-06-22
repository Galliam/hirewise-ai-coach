
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import UserMenu from "@/components/UserMenu";
import RecruiterInterestCard from "@/components/RecruiterInterestCard";
import AddCareerUpdateDialog from "@/components/AddCareerUpdateDialog";
import { useNavigate } from "react-router-dom";
import { useRecruiterInterests } from "@/hooks/useRecruiterInterests";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { interests, loading: interestsLoading, getInterestScore } = useRecruiterInterests();
  const [interestScore, setInterestScore] = useState(0);

  useEffect(() => {
    const fetchInterestScore = async () => {
      if (user) {
        const score = await getInterestScore(user.id);
        setInterestScore(score);
      }
    };
    
    fetchInterestScore();
  }, [user, interests]);

  const applications = [
    { title: "Product Manager", company: "Tech Innovators Inc.", status: "Interviewing", applied: "2 days ago" },
    { title: "Senior Data Scientist", company: "Data Insights Corp.", status: "Rejected", applied: "1 week ago" },
    { title: "UX Designer", company: "WebWorks", status: "Screening", applied: "2 weeks ago" },
  ];

  const pendingInterests = interests.filter(interest => interest.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <UserMenu />
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Your Profile Score</h2>
              <button 
                onClick={() => navigate("/profile")}
                className="text-blue-600 text-sm font-medium"
              >
                9-Box Grid →
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-blue-600">85%</div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Your profile is strong! Keep it updated to attract top recruiters.</p>
                {interestScore > 0 && (
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                      🔥 {interestScore} Interest Points
                    </span>
                    <span className="text-xs text-gray-500">High recruiter interest!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Career Updates Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Career Updates</h2>
              <AddCareerUpdateDialog />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">
                Share your career milestones with interested recruiters. They'll be notified when you add updates.
              </p>
            </div>
          </div>
          
          {/* Recruiter Interest Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recruiter Interest</h2>
              {pendingInterests.length > 0 && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                  {pendingInterests.length} pending
                </span>
              )}
            </div>
            
            {interestsLoading ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Loading interests...</p>
              </div>
            ) : interests.length === 0 ? (
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recruiter interests yet</h3>
                <p className="text-gray-600 text-sm">Keep improving your profile to attract recruiters!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {interests.slice(0, 3).map((interest) => (
                  <RecruiterInterestCard 
                    key={interest.id} 
                    interest={interest}
                  />
                ))}
                {interests.length > 3 && (
                  <button className="w-full text-center text-blue-600 font-medium py-3">
                    View all {interests.length} interests
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ongoing Applications</h2>
            <div className="space-y-3">
              {applications.map((app, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{app.title}</h3>
                      <p className="text-sm text-gray-600">{app.company}</p>
                      <p className="text-xs text-gray-500">Applied: {app.applied}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === "Interviewing" 
                        ? "bg-blue-100 text-blue-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full text-center text-blue-600 font-medium py-3">
              View all applications
            </button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
