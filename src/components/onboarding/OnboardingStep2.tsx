
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface OnboardingStep2Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep2 = ({ onNext, onBack, profile }: OnboardingStep2Props) => {
  const [formData, setFormData] = useState({
    desired_job_title: profile?.desired_job_title || '',
    desired_location: profile?.desired_location || [],
    job_type: profile?.job_type || [],
    salary_min: profile?.salary_min || '',
    salary_max: profile?.salary_max || '',
    currency: profile?.currency || 'USD',
    availability: profile?.availability || '',
    job_seeker_status: profile?.job_seeker_status || 'active'
  });

  const jobTypes = [
    { id: 'full_time', label: 'Full-time' },
    { id: 'part_time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' }
  ];

  const availabilityOptions = [
    { value: 'immediate', label: 'Immediately' },
    { value: '2_weeks', label: 'Within 2 weeks' },
    { value: '1_month', label: 'Within 1 month' },
    { value: '3_months', label: 'Within 3 months' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Actively looking' },
    { value: 'passive', label: 'Open to opportunities' },
    { value: 'not_looking', label: 'Not currently looking' }
  ];

  const handleJobTypeChange = (jobTypeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      job_type: checked 
        ? [...prev.job_type, jobTypeId]
        : prev.job_type.filter(type => type !== jobTypeId)
    }));
  };

  const handleLocationChange = (location: string) => {
    const locations = location.split(',').map(loc => loc.trim()).filter(loc => loc);
    setFormData(prev => ({ ...prev, desired_location: locations }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          What type of role are you looking for?
        </h3>
        <p className="text-gray-600">
          Help us understand your job preferences and availability.
        </p>
      </div>

      <div>
        <Label htmlFor="desired_job_title">Desired Job Title</Label>
        <Input
          id="desired_job_title"
          value={formData.desired_job_title}
          onChange={(e) => setFormData(prev => ({ ...prev, desired_job_title: e.target.value }))}
          placeholder="e.g. Senior Software Engineer"
          required
        />
      </div>

      <div>
        <Label htmlFor="desired_location">Preferred Locations</Label>
        <Input
          id="desired_location"
          value={formData.desired_location.join(', ')}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder="e.g. New York, San Francisco, Remote"
        />
        <p className="text-sm text-gray-500 mt-1">
          Separate multiple locations with commas
        </p>
      </div>

      <div>
        <Label className="text-base font-medium">Job Type Preferences</Label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {jobTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={formData.job_type.includes(type.id)}
                onCheckedChange={(checked) => handleJobTypeChange(type.id, checked as boolean)}
              />
              <Label htmlFor={type.id} className="text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Label htmlFor="salary_min">Min Salary</Label>
          <Input
            id="salary_min"
            type="number"
            value={formData.salary_min}
            onChange={(e) => setFormData(prev => ({ ...prev, salary_min: parseInt(e.target.value) || '' }))}
            placeholder="50000"
          />
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="salary_max">Max Salary</Label>
          <Input
            id="salary_max"
            type="number"
            value={formData.salary_max}
            onChange={(e) => setFormData(prev => ({ ...prev, salary_max: parseInt(e.target.value) || '' }))}
            placeholder="100000"
          />
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="currency">Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="When can you start?" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="job_seeker_status">Job Search Status</Label>
          <Select value={formData.job_seeker_status} onValueChange={(value) => setFormData(prev => ({ ...prev, job_seeker_status: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default OnboardingStep2;
