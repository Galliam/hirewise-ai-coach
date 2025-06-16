
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const activeJobs = [
    { id: 1, title: "Senior Software Engineer", applications: 24, stage: "Active", posted: "3 days ago" },
    { id: 2, title: "Product Manager", applications: 18, stage: "Active", posted: "1 week ago" },
    { id: 3, title: "UX Designer", applications: 12, stage: "Draft", posted: "2 days ago" },
  ];

  const recentCandidates = [
    { name: "Sarah Chen", role: "Software Engineer", match: 95, status: "New", applied: "2 hours ago" },
    { name: "Mike Johnson", role: "Product Manager", match: 88, status: "Screening", applied: "1 day ago" },
    { name: "Emily Rodriguez", role: "UX Designer", match: 92, status: "Interview", applied: "3 days ago" },
  ];

  const pipelineStats = [
    { stage: "New Applications", count: 45, color: "bg-blue-500" },
    { stage: "Screening", count: 28, color: "bg-yellow-500" },
    { stage: "Interview", count: 12, color: "bg-green-500" },
    { stage: "Offer", count: 3, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏢</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Recruiter Hub</h1>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600">🔔</button>
              <button className="text-gray-600">👤</button>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="flex space-x-2 mb-6">
            <Button 
              onClick={() => navigate("/post-job")}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              + Post New Job
            </Button>
            <Button 
              onClick={() => navigate("/candidates")}
              variant="outline" 
              className="flex-1"
            >
              Browse Talent
            </Button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {pipelineStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <span className="text-sm text-gray-600">{stat.stage}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Jobs</h2>
              <button 
                onClick={() => navigate("/jobs-list")}
                className="text-blue-600 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <div key={job.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.applications} applications</p>
                      <p className="text-xs text-gray-500">Posted: {job.posted}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.stage === "Active" 
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {job.stage}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Applications
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Candidates</h2>
              <button 
                onClick={() => navigate("/candidates")}
                className="text-blue-600 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            
            <div className="space-y-3">
              {recentCandidates.map((candidate, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">👤</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.role}</p>
                        <p className="text-xs text-gray-500">Applied: {candidate.applied}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{candidate.match}%</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        candidate.status === "New" 
                          ? "bg-blue-100 text-blue-700"
                          : candidate.status === "Screening"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Message
                    </Button>
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
