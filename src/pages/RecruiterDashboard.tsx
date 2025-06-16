
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";
import UserMenu from "@/components/UserMenu";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Jobs", value: "12", change: "+2 this week" },
    { label: "Applications", value: "234", change: "+18 today" },
    { label: "Interviews", value: "8", change: "3 scheduled" },
    { label: "Hired", value: "5", change: "This month" },
  ];

  const recentJobs = [
    { title: "Senior Software Engineer", applications: 45, status: "Active", posted: "2 days ago" },
    { title: "Product Manager", applications: 32, status: "Active", posted: "1 week ago" },
    { title: "UX Designer", applications: 28, status: "Draft", posted: "3 days ago" },
  ];

  const recentApplications = [
    { name: "Sarah Chen", role: "Senior Software Engineer", time: "2 hours ago", avatar: "👩" },
    { name: "Mike Johnson", role: "Product Manager", time: "4 hours ago", avatar: "👨" },
    { name: "Emily Rodriguez", role: "UX Designer", time: "1 day ago", avatar: "👩" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Recruiter Dashboard</h1>
              <p className="text-gray-600">Manage your hiring pipeline</p>
            </div>
            <UserMenu />
          </div>
          
          <Button 
            onClick={() => navigate("/post-job")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
              <button 
                onClick={() => navigate("/recruiter-activity")}
                className="text-blue-600 text-sm font-medium"
              >
                View all
              </button>
            </div>
            
            <div className="space-y-3">
              {recentJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === "Active" 
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{job.applications} applications</span>
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <button 
                onClick={() => navigate("/candidates")}
                className="text-blue-600 text-sm font-medium"
              >
                View all
              </button>
            </div>
            
            <div className="space-y-3">
              {recentApplications.map((application, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">{application.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{application.name}</p>
                      <p className="text-sm text-gray-600">Applied for {application.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{application.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default RecruiterDashboard;
