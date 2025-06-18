
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface OnboardingStep1Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep1 = ({ onNext, profile }: OnboardingStep1Props) => {
  const [formData, setFormData] = useState({
    resume_url: profile?.resume_url || '',
    linkedin_url: profile?.linkedin_url || '',
    portfolio_url: profile?.portfolio_url || '',
    current_title: profile?.current_title || '',
    current_company: profile?.current_company || '',
    years_experience: profile?.years_experience || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Let's start with your professional background
        </h3>
        <p className="text-gray-600">
          This information helps us understand your experience level and create better matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="current_title">Current Job Title</Label>
          <Input
            id="current_title"
            value={formData.current_title}
            onChange={(e) => setFormData(prev => ({ ...prev, current_title: e.target.value }))}
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div>
          <Label htmlFor="current_company">Current Company</Label>
          <Input
            id="current_company"
            value={formData.current_company}
            onChange={(e) => setFormData(prev => ({ ...prev, current_company: e.target.value }))}
            placeholder="e.g. Google"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="years_experience">Years of Experience</Label>
        <Input
          id="years_experience"
          type="number"
          min="0"
          max="50"
          value={formData.years_experience}
          onChange={(e) => setFormData(prev => ({ ...prev, years_experience: parseInt(e.target.value) || '' }))}
          placeholder="e.g. 5"
        />
      </div>

      <div>
        <Label htmlFor="resume_url">Resume/CV URL (Optional)</Label>
        <Input
          id="resume_url"
          type="url"
          value={formData.resume_url}
          onChange={(e) => setFormData(prev => ({ ...prev, resume_url: e.target.value }))}
          placeholder="https://drive.google.com/..."
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload your resume to Google Drive, Dropbox, or similar and paste the public link here
        </p>
      </div>

      <div>
        <Label htmlFor="linkedin_url">LinkedIn Profile (Optional)</Label>
        <Input
          id="linkedin_url"
          type="url"
          value={formData.linkedin_url}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div>
        <Label htmlFor="portfolio_url">Portfolio/Website (Optional)</Label>
        <Input
          id="portfolio_url"
          type="url"
          value={formData.portfolio_url}
          onChange={(e) => setFormData(prev => ({ ...prev, portfolio_url: e.target.value }))}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep1;
