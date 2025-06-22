
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecruiterBottomNavigation from "@/components/RecruiterBottomNavigation";
import UserMenu from "@/components/UserMenu";
import ExpressInterestDialog from "@/components/ExpressInterestDialog";
import { useRecruiterInterests } from "@/hooks/useRecruiterInterests";
import { Search, MapPin, Briefcase, Star, Heart } from "lucide-react";

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { interests, getInterestScore } = useRecruiterInterests();
  const [candidateScores, setCandidateScores] = useState<{[key: string]: number}>({});

  // Mock candidates data - in real app this would come from your candidates API
  const mockCandidates = [
    {
      id: "candidate-1",
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      experience: "5+ years",
      skills: ["React", "Node.js", "Python", "AWS"],
      avatar: "👩‍💻",
      matchScore: 92
    },
    {
      id: "candidate-2", 
      name: "Mike Johnson",
      title: "Product Manager",
      location: "Remote",
      experience: "7+ years",
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
      avatar: "👨‍💼",
      matchScore: 88
    },
    {
      id: "candidate-3",
      name: "Emily Rodriguez",
      title: "UX Designer",
      location: "New York, NY",
      experience: "4+ years", 
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      avatar: "👩‍🎨",
      matchScore: 85
    }
  ];

  useEffect(() => {
    // Calculate interest scores for all candidates
    const fetchScores = async () => {
      const scores: {[key: string]:number} = {};
      for (const candidate of mockCandidates) {
        scores[candidate.id] = await getInterestScore(candidate.id);
      }
      setCandidateScores(scores);
    };
    
    fetchScores();
  }, []);

  // Check if recruiter has already expressed interest in candidate
  const hasExpressedInterest = (candidateId: string) => {
    return interests.some(interest => interest.candidate_id === candidateId);
  };

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600">Discover talented candidates</p>
            </div>
            <UserMenu />
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
            </p>
            <Button variant="outline" size="sm">
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {filteredCandidates.map((candidate) => {
              const interestScore = candidateScores[candidate.id] || 0;
              const alreadyInterested = hasExpressedInterest(candidate.id);
              
              return (
                <div key={candidate.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{candidate.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">{candidate.title}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{candidate.matchScore}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{candidate.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-3 h-3" />
                          <span>{candidate.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {interestScore > 0 && (
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-pink-500 fill-current" />
                          <span className="text-xs text-pink-600 font-medium">
                            {interestScore} recruiter{interestScore > 1 ? 's' : ''} interested
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      {alreadyInterested ? (
                        <Button size="sm" variant="outline" disabled>
                          <Heart className="w-4 h-4 mr-2 fill-current text-pink-500" />
                          Interested
                        </Button>
                      ) : (
                        <ExpressInterestDialog 
                          candidateId={candidate.id}
                          candidateName={candidate.name}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <RecruiterBottomNavigation />
    </div>
  );
};

export default Candidates;
