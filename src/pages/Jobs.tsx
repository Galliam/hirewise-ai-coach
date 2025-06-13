import { useState } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import JobCard from "@/components/JobCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recommended");

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Company X",
      location: "San Francisco, CA",
      matchPercentage: 95,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Company B",
      location: "Remote",
      type: "Full-Time",
      matchPercentage: 88,
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Company C",
      location: "New York, NY",
      type: "Full-Time",
      matchPercentage: 82,
    },
  ];

  const handleViewJob = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Matches</h2>
          </div>
          
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        📍 {job.location}
                      </span>
                      {job.type && (
                        <span className="flex items-center">
                          💼 {job.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{job.matchPercentage}%</span>
                    <span className="text-xs text-gray-500 block">match</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleViewJob(job.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    Read JD
                  </Button>
                  <Button 
                    onClick={() => handleViewJob(job.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Jobs;
