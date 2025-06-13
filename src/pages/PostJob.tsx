
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    benefits: "",
    skills: [] as string[],
    urgency: "normal"
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate job posting
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Job Posted Successfully!",
        description: "Your job is now live and visible to candidates.",
      });
      navigate("/recruiter-dashboard");
    }, 1000);
  };

  const skillSuggestions = ["JavaScript", "React", "Python", "AWS", "Leadership", "Communication", "Problem Solving", "SQL"];

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white px-4 py-6 shadow-sm rounded-t-xl">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate("/recruiter-dashboard")} className="text-gray-600">
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Post New Job</h1>
          </div>
        </div>
        
        <div className="bg-white p-6 shadow-sm rounded-b-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select department</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="design">Design</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. San Francisco, CA or Remote"
                required
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select experience</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6-10 years)</option>
                <option value="executive">Executive Level (10+ years)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryMin">Min Salary ($)</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  placeholder="80000"
                />
              </div>
              <div>
                <Label htmlFor="salaryMax">Max Salary ($)</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  placeholder="120000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Required Skills</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 mb-3">
                {skillSuggestions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.skills.includes(skill)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                required
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="List the must-have qualifications and experience..."
                required
              />
            </div>

            <div>
              <Label htmlFor="urgency">Hiring Urgency</Label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low - Can wait for the right candidate</option>
                <option value="normal">Normal - Standard timeline</option>
                <option value="high">High - Need to fill quickly</option>
                <option value="urgent">Urgent - Critical business need</option>
              </select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Posting Job..." : "Post Job"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
