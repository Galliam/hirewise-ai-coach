
import { useState } from "react";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";

const RecruiterStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const stats = {
    totalApplications: 156,
    activeJobs: 8,
    responseRate: 78,
    timeToHire: 12,
    topPerformingJob: "Senior Software Engineer",
    conversionRate: 24
  };

  const chartData = [
    { period: "Mon", applications: 12 },
    { period: "Tue", applications: 18 },
    { period: "Wed", applications: 24 },
    { period: "Thu", applications: 15 },
    { period: "Fri", applications: 32 },
    { period: "Sat", applications: 8 },
    { period: "Sun", applications: 5 },
  ];

  const insights = [
    {
      title: "Peak Application Time",
      description: "Most applications are received on Fridays between 2-4 PM",
      type: "time",
      icon: "⏰"
    },
    {
      title: "Best Performing Keywords",
      description: "Jobs with 'remote' and 'senior' get 40% more applications",
      type: "keyword",
      icon: "🔑"
    },
    {
      title: "Response Optimization",
      description: "Candidates respond 65% faster to personalized messages",
      type: "response",
      icon: "💬"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">AI Stats Center</h1>
          <p className="text-gray-600">Data-driven insights for better hiring</p>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex space-x-2">
            {["week", "month", "quarter"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize ${
                  selectedPeriod === period
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.totalApplications}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
              <div className="text-xs text-green-600 mt-1">↗ +12% vs last week</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.activeJobs}</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
              <div className="text-xs text-blue-600 mt-1">→ Same as last week</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{stats.responseRate}%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
              <div className="text-xs text-green-600 mt-1">↗ +5% vs last week</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{stats.timeToHire}</div>
              <div className="text-sm text-gray-600">Days to Hire</div>
              <div className="text-xs text-green-600 mt-1">↘ -2 days improved</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Application Trends</h3>
            <div className="flex items-end justify-between h-32 mb-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-blue-600 w-6 rounded-t"
                    style={{ height: `${(data.applications / 32) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">🤖 AI Insights</h3>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{insight.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Top Performing Job</h3>
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-medium text-blue-900">{stats.topPerformingJob}</h4>
              <p className="text-sm text-blue-700">Conversion Rate: {stats.conversionRate}%</p>
              <p className="text-xs text-blue-600 mt-1">Best keywords: React, Senior, Remote</p>
            </div>
          </div>
        </div>
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default RecruiterStats;
