
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface OnboardingStep4Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep4 = ({ onNext, onBack, profile }: OnboardingStep4Props) => {
  const [formData, setFormData] = useState({
    technical_skills: profile?.technical_skills || [],
    soft_skills: profile?.soft_skills || [],
    languages: profile?.languages || [],
    certifications: profile?.certifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const commonTechnicalSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Git', 'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL', 'Redis',
    'Kubernetes', 'GraphQL', 'REST APIs', 'Machine Learning', 'Data Analysis'
  ];

  const commonSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Adaptability',
    'Time Management', 'Critical Thinking', 'Creativity', 'Project Management',
    'Public Speaking', 'Negotiation', 'Mentoring', 'Strategic Planning'
  ];

  const commonLanguages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean',
    'Portuguese', 'Italian', 'Dutch', 'Russian', 'Arabic', 'Hindi'
  ];

  const addItem = (field: string, item: string, setter: (value: string) => void) => {
    if (item.trim() && !formData[field].includes(item.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], item.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (field: string, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const toggleSkill = (field: string, skill: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(skill)
        ? prev[field].filter(s => s !== skill)
        : [...prev[field], skill]
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
          Tell us about your skills and expertise
        </h3>
        <p className="text-gray-600">
          This helps us match you with roles that fit your capabilities.
        </p>
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Technical Skills</Label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {commonTechnicalSkills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`tech_${skill}`}
                checked={formData.technical_skills.includes(skill)}
                onCheckedChange={() => toggleSkill('technical_skills', skill)}
              />
              <Label htmlFor={`tech_${skill}`} className="text-sm font-normal">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add custom technical skill..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('technical_skills', newSkill, setNewSkill))}
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addItem('technical_skills', newSkill, setNewSkill)}
          >
            Add
          </Button>
        </div>
        {formData.technical_skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.technical_skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeItem('technical_skills', skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Soft Skills</Label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {commonSoftSkills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`soft_${skill}`}
                checked={formData.soft_skills.includes(skill)}
                onCheckedChange={() => toggleSkill('soft_skills', skill)}
              />
              <Label htmlFor={`soft_${skill}`} className="text-sm font-normal">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Add custom soft skill..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('soft_skills', newSoftSkill, setNewSoftSkill))}
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addItem('soft_skills', newSoftSkill, setNewSoftSkill)}
          >
            Add
          </Button>
        </div>
        {formData.soft_skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.soft_skills.map((skill) => (
              <span
                key={skill}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeItem('soft_skills', skill)}
                  className="text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Languages</Label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {commonLanguages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={`lang_${language}`}
                checked={formData.languages.includes(language)}
                onCheckedChange={() => toggleSkill('languages', language)}
              />
              <Label htmlFor={`lang_${language}`} className="text-sm font-normal">
                {language}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add other language..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('languages', newLanguage, setNewLanguage))}
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addItem('languages', newLanguage, setNewLanguage)}
          >
            Add
          </Button>
        </div>
        {formData.languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.languages.map((language) => (
              <span
                key={language}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {language}
                <button
                  type="button"
                  onClick={() => removeItem('languages', language)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label className="text-base font-medium mb-3 block">Certifications</Label>
        <div className="flex gap-2">
          <Input
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="e.g. AWS Certified Solutions Architect..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('certifications', newCertification, setNewCertification))}
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => addItem('certifications', newCertification, setNewCertification)}
          >
            Add
          </Button>
        </div>
        {formData.certifications.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.certifications.map((cert) => (
              <span
                key={cert}
                className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {cert}
                <button
                  type="button"
                  onClick={() => removeItem('certifications', cert)}
                  className="text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
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

export default OnboardingStep4;
