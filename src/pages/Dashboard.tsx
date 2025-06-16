
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const applications = [
    { title: "Product Manager", company: "Tech Innovators Inc.", status: "Interviewing", applied: "2 days ago" },
    { title: "Senior Data Scientist", company: "Data Insights Corp.", status: "Rejected", applied: "1 week ago" },
    { title: "UX Designer", company: "WebWorks", status: "Screening", applied: "2 weeks ago" },
  ];

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
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recruiter Interest</h2>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">👩</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Tech Innovators Inc. is interested.</p>
                    <p className="text-sm text-gray-600">Senior Product Manager</p>
                    <p className="text-sm text-gray-500">San Francisco, CA</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">2 min ago</span>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Glassdoor ⭐</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Decline
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">👨</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">FutureTech Solutions is interested.</p>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                    <p className="text-sm text-gray-500">Remote</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">15 min ago</span>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Glassdoor ⭐</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Decline
                  </Button>
                </div>
              </div>
            </div>
            
            <button className="w-full text-center text-blue-600 font-medium py-3">
              View all notifications
            </button>
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
