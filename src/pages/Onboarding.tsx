
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    company: "",
    jobType: "",
    preferences: [] as string[],
    companyType: [] as string[],
    culture: [] as string[],
    salaryExpectation: "",
    benefits: [] as string[],
    personalityTraits: [] as string[],
    strengths: [] as string[],
  });
  const [openJobSuggestions, setOpenJobSuggestions] = useState(false);
  const [openLocationSuggestions, setOpenLocationSuggestions] = useState(false);
  const [openCompanySuggestions, setOpenCompanySuggestions] = useState(false);
  const navigate = useNavigate();

  // Mock data for suggestions
  const jobSuggestions = [
    "Software Engineer", "Product Manager", "Data Scientist", "UX/UI Designer", 
    "Marketing Manager", "Sales Representative", "DevOps Engineer", "Business Analyst",
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Machine Learning Engineer"
  ];

  const locationSuggestions = [
    "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA",
    "Los Angeles, CA", "Chicago, IL", "Denver, CO", "Remote", "London, UK"
  ];

  const getCompaniesForLocation = (location: string) => {
    const companiesByLocation: { [key: string]: string[] } = {
      "San Francisco, CA": ["Google", "Meta", "Uber", "Airbnb", "Salesforce"],
      "New York, NY": ["Goldman Sachs", "JPMorgan", "Bloomberg", "MongoDB", "Etsy"],
      "Seattle, WA": ["Amazon", "Microsoft", "Boeing", "Expedia", "Zillow"],
      "Austin, TX": ["Dell", "IBM", "Indeed", "HomeAway", "Bumble"],
      "Remote": ["GitLab", "Automattic", "Buffer", "Zapier", "InVision"]
    };
    return companiesByLocation[location] || ["Apple", "Netflix", "Tesla", "Adobe", "Spotify"];
  };

  const handleNext = () => {
    if (step < 6) {
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
                <Popover open={openJobSuggestions} onOpenChange={setOpenJobSuggestions}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openJobSuggestions}
                      className="w-full justify-between"
                    >
                      {formData.jobTitle || "Select or type a job title..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput 
                        placeholder="Search job titles..." 
                        value={formData.jobTitle}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}
                      />
                      <CommandList>
                        <CommandEmpty>No job title found.</CommandEmpty>
                        <CommandGroup>
                          {jobSuggestions
                            .filter(job => job.toLowerCase().includes(formData.jobTitle.toLowerCase()))
                            .map((job) => (
                            <CommandItem
                              key={job}
                              value={job}
                              onSelect={() => {
                                setFormData(prev => ({ ...prev, jobTitle: job }));
                                setOpenJobSuggestions(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.jobTitle === job ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {job}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Popover open={openLocationSuggestions} onOpenChange={setOpenLocationSuggestions}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openLocationSuggestions}
                      className="w-full justify-between"
                    >
                      {formData.location || "Select or type a location..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput 
                        placeholder="Search locations..." 
                        value={formData.location}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                      />
                      <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                          {locationSuggestions
                            .filter(location => location.toLowerCase().includes(formData.location.toLowerCase()))
                            .map((location) => (
                            <CommandItem
                              key={location}
                              value={location}
                              onSelect={() => {
                                setFormData(prev => ({ ...prev, location: location, company: "" }));
                                setOpenLocationSuggestions(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.location === location ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {location}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company (optional)</label>
                <Popover open={openCompanySuggestions} onOpenChange={setOpenCompanySuggestions}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCompanySuggestions}
                      className="w-full justify-between"
                      disabled={!formData.location}
                    >
                      {formData.company || "Select a company..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search companies..." />
                      <CommandList>
                        <CommandEmpty>No company found.</CommandEmpty>
                        <CommandGroup>
                          {getCompaniesForLocation(formData.location).map((company) => (
                            <CommandItem
                              key={company}
                              value={company}
                              onSelect={() => {
                                setFormData(prev => ({ ...prev, company: company }));
                                setOpenCompanySuggestions(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.company === company ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {company}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
        const benefitOptions = ["Health Insurance", "401k Match", "Flexible PTO", "Remote Work", "Stock Options", "Learning Budget"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Compensation & Benefits</h2>
              <p className="text-gray-600">Help us understand your expectations</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary Range</label>
                <Input 
                  placeholder="e.g. $80,000 - $120,000"
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryExpectation: e.target.value }))}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Which benefits are most important to you?</h3>
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
        const personalityTraits = ["Analytical", "Creative", "Detail-oriented", "Big picture", "Independent", "Collaborative"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personality Assessment</h2>
              <p className="text-gray-600">Select traits that best describe you</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">How would you describe your work style?</h3>
              <div className="grid grid-cols-2 gap-3">
                {personalityTraits.map((trait) => (
                  <button
                    key={trait}
                    onClick={() => toggleSelection("personalityTraits", trait)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.personalityTraits.includes(trait)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Questions</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">I prefer working in teams rather than alone</p>
                    <div className="flex space-x-2">
                      {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((option) => (
                        <button key={option} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">I enjoy taking on leadership responsibilities</p>
                    <div className="flex space-x-2">
                      {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((option) => (
                        <button key={option} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const strengthOptions = ["Problem Solving", "Communication", "Leadership", "Technical Skills", "Creativity", "Time Management"];
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Potential Assessment</h2>
              <p className="text-gray-600">Identify your key strengths and growth areas</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">What are your top strengths?</h3>
              <div className="grid grid-cols-2 gap-3">
                {strengthOptions.map((strength) => (
                  <button
                    key={strength}
                    onClick={() => toggleSelection("strengths", strength)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      formData.strengths.includes(strength)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {strength}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Scenario Questions</h3>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">When facing a challenging project, I typically:</p>
                    <div className="space-y-2">
                      {[
                        "Break it down into smaller tasks",
                        "Seek help from colleagues",
                        "Research best practices first",
                        "Dive in and learn as I go"
                      ].map((option) => (
                        <button key={option} className="block w-full text-left px-3 py-2 text-sm border rounded hover:bg-gray-50">
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Set!</h2>
              <p className="text-gray-600">Your AI recruiting agent is ready to find the perfect opportunities for you based on your comprehensive profile.</p>
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
              <span>Step {step} of 6</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
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
          {step === 6 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
