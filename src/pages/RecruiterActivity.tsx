
import { useState } from "react";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";

const RecruiterActivity = () => {
  const [activeTab, setActiveTab] = useState("jobs");

  const publishedJobs = [
    { id: 1, title: "Senior Software Engineer", status: "Active", applications: 24, posted: "3 days ago", views: 156 },
    { id: 2, title: "Product Manager", status: "Active", applications: 18, posted: "1 week ago", views: 89 },
    { id: 3, title: "UX Designer", status: "Draft", applications: 12, posted: "2 days ago", views: 45 },
  ];

  const recentActivities = [
    { type: "application", message: "Sarah Chen applied to Senior Software Engineer", time: "2 hours ago" },
    { type: "view", message: "156 views on Product Manager position", time: "4 hours ago" },
    { type: "message", message: "New message from Mike Johnson", time: "1 day ago" },
    { type: "interview", message: "Interview scheduled with Emily Rodriguez", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Activity Center</h1>
          <p className="text-gray-600">Track your hiring activities and job performance</p>
        </div>

        <div className="p-4">
          <div className="flex space-x-2 mb-6">
            <button 
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === "jobs" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Published Jobs
            </button>
            <button 
              onClick={() => setActiveTab("activity")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === "activity" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Recent Activity
            </button>
          </div>

          {activeTab === "jobs" && (
            <div className="space-y-4">
              {publishedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">Posted: {job.posted}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === "Active" 
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{job.applications}</div>
                      <div className="text-xs text-gray-500">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{job.views}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "application" ? "bg-blue-100" :
                      activity.type === "view" ? "bg-green-100" :
                      activity.type === "message" ? "bg-purple-100" :
                      "bg-orange-100"
                    }`}>
                      <span className="text-sm">
                        {activity.type === "application" ? "📝" :
                         activity.type === "view" ? "👁️" :
                         activity.type === "message" ? "💬" :
                         "📅"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default RecruiterActivity;
