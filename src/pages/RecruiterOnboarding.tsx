
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const RecruiterOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    talentTypes: [] as string[],
    roles: [] as string[],
    skills: [] as string[],
    experience: [] as string[],
    culture: [] as string[],
    values: [] as string[],
    workStyle: [] as string[],
    salaryRange: "",
    benefits: [] as string[],
    budgetRange: "",
    recruitmentSteps: [] as string[],
    timeToHire: "",
    hiringVolume: ""
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate("/recruiter-dashboard");
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
        const talentTypes = ["Software Engineers", "Product Managers", "Data Scientists", "Designers", "Sales Professionals", "Marketing Specialists"];
        const experienceLevels = ["Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6-10 years)", "Executive Level (10+ years)"];
        const keySkills = ["Technical Skills", "Leadership", "Communication", "Problem Solving", "Creativity", "Analytical Thinking"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What talent are you looking for?</h2>
              <p className="text-gray-600">Help us understand your hiring needs</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Types of roles you typically hire</h3>
              <div className="grid grid-cols-2 gap-3">
                {talentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleSelection("talentTypes", type)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.talentTypes.includes(type)
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">Experience levels</h3>
              <div className="grid grid-cols-1 gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleSelection("experience", level)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.experience.includes(level)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Key skills you value most</h3>
              <div className="grid grid-cols-2 gap-3">
                {keySkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSelection("skills", skill)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
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
          </div>
        );

      case 2:
        const cultureValues = ["Innovation", "Collaboration", "Work-Life Balance", "Growth Mindset", "Diversity & Inclusion", "Results-Driven"];
        const workStyles = ["Remote-First", "Hybrid", "In-Office", "Flexible Hours", "Autonomous", "Team-Oriented"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Culture & Values</h2>
              <p className="text-gray-600">What makes your company unique?</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Core company values</h3>
              <div className="grid grid-cols-2 gap-3">
                {cultureValues.map((value) => (
                  <button
                    key={value}
                    onClick={() => toggleSelection("culture", value)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.culture.includes(value)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Work environment</h3>
              <div className="grid grid-cols-2 gap-3">
                {workStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => toggleSelection("workStyle", style)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.workStyle.includes(style)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        const benefitOptions = ["Health Insurance", "401k Match", "Flexible PTO", "Remote Work", "Stock Options", "Learning Budget", "Gym Membership", "Parental Leave"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Compensation & Benefits</h2>
              <p className="text-gray-600">Help candidates understand your offering</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical salary range for most roles</label>
                <Input 
                  placeholder="e.g. $80,000 - $150,000"
                  value={formData.salaryRange}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryRange: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual hiring budget range</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select budget range</option>
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m+">$5M+</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Benefits you offer</h3>
                <div className="grid grid-cols-2 gap-3">
                  {benefitOptions.map((benefit) => (
                    <button
                      key={benefit}
                      onClick={() => toggleSelection("benefits", benefit)}
                      className={`p-3 rounded-lg border text-sm transition-colors ${
                        formData.benefits.includes(benefit)
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {benefit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        const recruitmentSteps = ["Resume Review", "Phone Screening", "Technical Interview", "Culture Fit Interview", "Final Interview", "Reference Check"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recruitment Process</h2>
              <p className="text-gray-600">Define your hiring workflow</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Typical recruitment steps</h3>
              <div className="grid grid-cols-1 gap-3">
                {recruitmentSteps.map((step) => (
                  <button
                    key={step}
                    onClick={() => toggleSelection("recruitmentSteps", step)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.recruitmentSteps.includes(step)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average time to hire</label>
                <select
                  value={formData.timeToHire}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeToHire: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select timeframe</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="3-4-weeks">3-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3+-months">3+ months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly hiring volume</label>
                <select
                  value={formData.hiringVolume}
                  onChange={(e) => setFormData(prev => ({ ...prev, hiringVolume: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select volume</option>
                  <option value="1-5">1-5 hires</option>
                  <option value="6-15">6-15 hires</option>
                  <option value="16-30">16-30 hires</option>
                  <option value="30+">30+ hires</option>
                </select>
              </div>
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
              <span>Step {step} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
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
          {step === 4 ? "Complete Setup" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default RecruiterOnboarding;
