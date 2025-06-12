
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import JobCard from "@/components/JobCard";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("recommended");

  const jobs = [
    {
      title: "Software Engineer",
      company: "Company X",
      location: "San Francisco, CA",
      matchPercentage: 95,
    },
    {
      title: "Product Manager",
      company: "Company B",
      location: "Remote",
      type: "Full-Time",
      matchPercentage: 88,
    },
    {
      title: "Data Analyst",
      company: "Company C",
      location: "New York, NY",
      type: "Full-Time",
      matchPercentage: 82,
    },
  ];

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your AI-tailored resume has been sent for the ${jobTitle} position.`,
    });
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
              <JobCard
                key={index}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                matchPercentage={job.matchPercentage}
                onApply={() => handleApply(job.title)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Jobs;
