
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface OnboardingStep3Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep3 = ({ onNext, onBack, profile }: OnboardingStep3Props) => {
  const [formData, setFormData] = useState({
    company_types: profile?.company_types || [],
    company_sizes: profile?.company_sizes || [],
    industries: profile?.industries || [],
    work_environment: profile?.work_environment || [],
    company_culture: profile?.company_culture || [],
    benefits_priorities: profile?.benefits_priorities || []
  });

  const companyTypes = [
    { id: 'startup', label: 'Startup' },
    { id: 'mid_size', label: 'Mid-size Company' },
    { id: 'enterprise', label: 'Large Enterprise' },
    { id: 'non_profit', label: 'Non-profit' },
    { id: 'government', label: 'Government' }
  ];

  const companySizes = [
    { id: '1-10', label: '1-10 employees' },
    { id: '11-50', label: '11-50 employees' },
    { id: '51-200', label: '51-200 employees' },
    { id: '201-1000', label: '201-1000 employees' },
    { id: '1000+', label: '1000+ employees' }
  ];

  const industries = [
    { id: 'tech', label: 'Technology' },
    { id: 'finance', label: 'Finance' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'retail', label: 'Retail' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'media', label: 'Media & Entertainment' }
  ];

  const workEnvironments = [
    { id: 'fast_paced', label: 'Fast-paced' },
    { id: 'collaborative', label: 'Collaborative' },
    { id: 'independent', label: 'Independent work' },
    { id: 'structured', label: 'Structured' },
    { id: 'flexible', label: 'Flexible' },
    { id: 'innovative', label: 'Innovative' }
  ];

  const companyCultures = [
    { id: 'innovative', label: 'Innovative' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'casual', label: 'Casual' },
    { id: 'formal', label: 'Formal' },
    { id: 'diverse', label: 'Diverse & Inclusive' },
    { id: 'competitive', label: 'Competitive' }
  ];

  const benefitsPriorities = [
    { id: 'health_insurance', label: 'Health Insurance' },
    { id: 'retirement', label: 'Retirement Plans' },
    { id: 'pto', label: 'Paid Time Off' },
    { id: 'remote_work', label: 'Remote Work Options' },
    { id: 'learning_budget', label: 'Learning & Development' },
    { id: 'stock_options', label: 'Stock Options' }
  ];

  const handleCheckboxChange = (field: string, id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], id]
        : prev[field].filter(item => item !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          What work environment suits you best?
        </h3>
        <p className="text-gray-600">
          Tell us about your preferred company culture and work style.
        </p>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Company Types</Label>
        <div className="grid grid-cols-2 gap-3">
          {companyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`company_type_${type.id}`}
                checked={formData.company_types.includes(type.id)}
                onCheckedChange={(checked) => handleCheckboxChange('company_types', type.id, checked as boolean)}
              />
              <Label htmlFor={`company_type_${type.id}`} className="text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Company Sizes</Label>
        <div className="grid grid-cols-2 gap-3">
          {companySizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox
                id={`company_size_${size.id}`}
                checked={formData.company_sizes.includes(size.id)}
                onCheckedChange={(checked) => handleCheckboxChange('company_sizes', size.id, checked as boolean)}
              />
              <Label htmlFor={`company_size_${size.id}`} className="text-sm font-normal">
                {size.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Industries of Interest</Label>
        <div className="grid grid-cols-2 gap-3">
          {industries.map((industry) => (
            <div key={industry.id} className="flex items-center space-x-2">
              <Checkbox
                id={`industry_${industry.id}`}
                checked={formData.industries.includes(industry.id)}
                onCheckedChange={(checked) => handleCheckboxChange('industries', industry.id, checked as boolean)}
              />
              <Label htmlFor={`industry_${industry.id}`} className="text-sm font-normal">
                {industry.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Work Environment Preferences</Label>
        <div className="grid grid-cols-2 gap-3">
          {workEnvironments.map((env) => (
            <div key={env.id} className="flex items-center space-x-2">
              <Checkbox
                id={`work_env_${env.id}`}
                checked={formData.work_environment.includes(env.id)}
                onCheckedChange={(checked) => handleCheckboxChange('work_environment', env.id, checked as boolean)}
              />
              <Label htmlFor={`work_env_${env.id}`} className="text-sm font-normal">
                {env.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Company Culture</Label>
        <div className="grid grid-cols-2 gap-3">
          {companyCultures.map((culture) => (
            <div key={culture.id} className="flex items-center space-x-2">
              <Checkbox
                id={`culture_${culture.id}`}
                checked={formData.company_culture.includes(culture.id)}
                onCheckedChange={(checked) => handleCheckboxChange('company_culture', culture.id, checked as boolean)}
              />
              <Label htmlFor={`culture_${culture.id}`} className="text-sm font-normal">
                {culture.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Benefits Priorities</Label>
        <div className="grid grid-cols-2 gap-3">
          {benefitsPriorities.map((benefit) => (
            <div key={benefit.id} className="flex items-center space-x-2">
              <Checkbox
                id={`benefit_${benefit.id}`}
                checked={formData.benefits_priorities.includes(benefit.id)}
                onCheckedChange={(checked) => handleCheckboxChange('benefits_priorities', benefit.id, checked as boolean)}
              />
              <Label htmlFor={`benefit_${benefit.id}`} className="text-sm font-normal">
                {benefit.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep3;
