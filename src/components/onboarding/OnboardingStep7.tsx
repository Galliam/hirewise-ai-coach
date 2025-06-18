
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingStep7Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep7 = ({ onNext, onBack, profile }: OnboardingStep7Props) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    salary_weight: [7],
    location_weight: [8],
    company_culture_weight: [6],
    growth_opportunities_weight: [7],
    work_life_balance_weight: [8],
    role_responsibilities_weight: [9],
    deal_breakers: [],
    contact_preferences: [],
    best_contact_time: ''
  });

  const dealBreakers = [
    { id: 'no_remote', label: 'No remote work options' },
    { id: 'salary_below_min', label: 'Salary below my minimum' },
    { id: 'long_commute', label: 'Long commute (>1 hour)' },
    { id: 'poor_culture', label: 'Poor company culture' },
    { id: 'no_growth', label: 'Limited growth opportunities' },
    { id: 'poor_benefits', label: 'Poor benefits package' },
    { id: 'unstable_company', label: 'Unstable company finances' }
  ];

  const contactPreferences = [
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'text', label: 'Text message' }
  ];

  const contactTimes = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' }
  ];

  const handleCheckboxChange = (field: string, id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], id]
        : prev[field].filter(item => item !== id)
    }));
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleComplete = async () => {
    try {
      // Get job seeker profile ID
      const { data: jsProfile } = await supabase
        .from('job_seeker_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (jsProfile) {
        // Save job matching preferences
        await supabase
          .from('job_matching_preferences')
          .insert({
            job_seeker_id: jsProfile.id,
            salary_weight: formData.salary_weight[0],
            location_weight: formData.location_weight[0],
            company_culture_weight: formData.company_culture_weight[0],
            growth_opportunities_weight: formData.growth_opportunities_weight[0],
            work_life_balance_weight: formData.work_life_balance_weight[0],
            role_responsibilities_weight: formData.role_responsibilities_weight[0],
            deal_breakers: formData.deal_breakers,
            contact_preferences: formData.contact_preferences,
            best_contact_time: formData.best_contact_time
          });
      }

      onNext({});
    } catch (error) {
      console.error('Error saving matching preferences:', error);
      onNext({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Final Step: Matching Preferences
        </h3>
        <p className="text-gray-600">
          Help us prioritize what matters most to you in job matching.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Matching Criteria Importance</CardTitle>
          <p className="text-sm text-gray-600">
            Rate how important each factor is for your job search (1 = not important, 10 = very important)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Salary & Compensation</Label>
              <span className="text-sm font-medium text-blue-600">{formData.salary_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.salary_weight}
              onValueChange={(value) => handleSliderChange('salary_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Location & Commute</Label>
              <span className="text-sm font-medium text-blue-600">{formData.location_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.location_weight}
              onValueChange={(value) => handleSliderChange('location_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Company Culture</Label>
              <span className="text-sm font-medium text-blue-600">{formData.company_culture_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.company_culture_weight}
              onValueChange={(value) => handleSliderChange('company_culture_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Growth Opportunities</Label>
              <span className="text-sm font-medium text-blue-600">{formData.growth_opportunities_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.growth_opportunities_weight}
              onValueChange={(value) => handleSliderChange('growth_opportunities_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Work-Life Balance</Label>
              <span className="text-sm font-medium text-blue-600">{formData.work_life_balance_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.work_life_balance_weight}
              onValueChange={(value) => handleSliderChange('work_life_balance_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-base">Role & Responsibilities</Label>
              <span className="text-sm font-medium text-blue-600">{formData.role_responsibilities_weight[0]}/10</span>
            </div>
            <Slider
              value={formData.role_responsibilities_weight}
              onValueChange={(value) => handleSliderChange('role_responsibilities_weight', value)}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deal Breakers</CardTitle>
          <p className="text-sm text-gray-600">
            Select any factors that would make you immediately reject a job offer
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {dealBreakers.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`deal_breaker_${item.id}`}
                  checked={formData.deal_breakers.includes(item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange('deal_breakers', item.id, checked as boolean)}
                />
                <Label htmlFor={`deal_breaker_${item.id}`} className="text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Preferences</CardTitle>
          <p className="text-sm text-gray-600">
            How would you like recruiters to contact you?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-3 block">Preferred Contact Methods</Label>
            <div className="grid grid-cols-2 gap-3">
              {contactPreferences.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`contact_${method.id}`}
                    checked={formData.contact_preferences.includes(method.id)}
                    onCheckedChange={(checked) => handleCheckboxChange('contact_preferences', method.id, checked as boolean)}
                  />
                  <Label htmlFor={`contact_${method.id}`} className="text-sm font-normal">
                    {method.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="best_contact_time" className="text-base font-medium">Best Time to Contact</Label>
            <Select value={formData.best_contact_time} onValueChange={(value) => setFormData(prev => ({ ...prev, best_contact_time: value }))}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                {contactTimes.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleComplete} className="bg-blue-600 hover:bg-blue-700">
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep7;
