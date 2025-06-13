
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");

  const candidates = [
    { 
      id: 1, 
      name: "Sarah Chen", 
      role: "Software Engineer", 
      match: 95, 
      status: "New", 
      applied: "2 hours ago",
      skills: ["React", "Python", "AWS"],
      experience: "5 years"
    },
    { 
      id: 2, 
      name: "Mike Johnson", 
      role: "Product Manager", 
      match: 88, 
      status: "Screening", 
      applied: "1 day ago",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      experience: "7 years"
    },
    { 
      id: 3, 
      name: "Emily Rodriguez", 
      role: "UX Designer", 
      match: 92, 
      status: "Interview", 
      applied: "3 days ago",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "4 years"
    },
    { 
      id: 4, 
      name: "David Kim", 
      role: "Data Scientist", 
      match: 89, 
      status: "Technical Review", 
      applied: "5 days ago",
      skills: ["Machine Learning", "SQL", "Python"],
      experience: "6 years"
    },
  ];

  const stages = ["all", "New", "Screening", "Interview", "Technical Review", "Offer"];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "all" || candidate.status === selectedStage;
    return matchesSearch && matchesStage;
  });

  const moveCandidate = (candidateId: number, newStage: string) => {
    // In a real app, this would update the candidate's status
    console.log(`Moving candidate ${candidateId} to ${newStage}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <button onClick={() => navigate("/recruiter-dashboard")} className="text-gray-600">
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Candidates</h1>
          </div>
          
          <div className="space-y-3">
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex space-x-2 overflow-x-auto">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedStage === stage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {stage === "all" ? "All" : stage}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                    <p className="text-xs text-gray-500">{candidate.experience} experience</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">{candidate.match}%</div>
                  <span className="text-xs text-gray-500">match</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  candidate.status === "New" 
                    ? "bg-blue-100 text-blue-700"
                    : candidate.status === "Screening"
                    ? "bg-yellow-100 text-yellow-700"
                    : candidate.status === "Interview"
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {candidate.status}
                </span>
                <span className="text-xs text-gray-500">Applied: {candidate.applied}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  View Profile
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                  Message
                </Button>
                <select 
                  onChange={(e) => moveCandidate(candidate.id, e.target.value)}
                  className="text-xs px-2 py-1 border border-gray-300 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>Move to...</option>
                  <option value="Screening">Screening</option>
                  <option value="Interview">Interview</option>
                  <option value="Technical Review">Technical Review</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Reject</option>
                </select>
              </div>
            </div>
          ))}
          
          {filteredCandidates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No candidates found</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Candidates;
