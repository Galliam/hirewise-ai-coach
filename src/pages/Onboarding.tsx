
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "",
    preferences: [] as string[],
    companyType: [] as string[],
    culture: [] as string[],
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSelection = (category: keyof typeof formData, value: string) => {
    const current = formData[category] as string[];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    
    setFormData(prev => ({
      ...prev,
      [category]: updated
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job title</label>
                <Input 
                  placeholder="e.g. Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company (optional)</label>
                <Input 
                  placeholder="e.g. Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input 
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        const jobRoles = ["Software Engineer", "Product Manager", "Data Scientist", "UX/UI Designer", "Marketing Specialist"];
        const companyTypes = ["Startup", "Large Corporation", "Non-Profit", "Government", "Consulting Firm"];
        const cultures = ["Fast-paced", "Collaborative", "Remote-friendly"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Preferences</h2>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">What kind of job are you looking for?</h3>
              <div className="grid grid-cols-2 gap-3">
                {jobRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => toggleSelection("preferences", role)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.preferences.includes(role)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">What type of company are you interested in?</h3>
              <div className="grid grid-cols-2 gap-3">
                {companyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleSelection("companyType", type)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.companyType.includes(type)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">What kind of company culture do you prefer?</h3>
              <div className="grid grid-cols-2 gap-3">
                {cultures.map((culture) => (
                  <button
                    key={culture}
                    onClick={() => toggleSelection("culture", culture)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.culture.includes(culture)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {culture}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Set!</h2>
              <p className="text-gray-600">Your AI recruiting agent is ready to find the perfect opportunities for you.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {step > 1 && (
              <button onClick={handleBack} className="text-gray-600">
                ← Back
              </button>
            )}
            <div className="flex-1" />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {step} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          {renderStep()}
        </div>
        
        <Button 
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {step === 3 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
