
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { toast } = useToast();

  // Mock job data - in real app, this would come from an API
  const job = {
    title: "Senior Software Engineer",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "$120k - $180k",
    matchPercentage: 95,
    description: "We are looking for a passionate Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.",
    requirements: [
      "5+ years of experience in software development",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Strong understanding of software engineering principles",
      "Excellent communication and teamwork skills"
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
      "Contribute to architectural decisions"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO"
    ]
  };

  const handleApply = () => {
    toast({
      title: "Application Submitted!",
      description: "Your AI-tailored resume has been sent. We'll track your application progress.",
    });
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">{job.matchPercentage}%</span>
              <span className="text-xs text-gray-500 block">match</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{job.company}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                📍 {job.location}
              </div>
              <div className="flex items-center">
                💼 {job.type}
              </div>
              <div className="flex items-center">
                💰 {job.salary}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">•</span>
                  {resp}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-600 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="sticky bottom-4">
            <Button 
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
            >
              Apply with AI-Tailored Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
