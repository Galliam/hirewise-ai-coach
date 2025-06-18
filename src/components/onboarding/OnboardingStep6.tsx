
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingStep6Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep6 = ({ onNext, onBack, profile }: OnboardingStep6Props) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const skillsQuestions = [
    {
      id: 'problem_solving',
      question: 'How do you typically approach complex problems?',
      options: [
        { value: '8', label: 'I break them down systematically and research thoroughly' },
        { value: '6', label: 'I brainstorm multiple solutions and test them' },
        { value: '4', label: 'I seek input from others before deciding' },
        { value: '2', label: 'I prefer following established procedures' }
      ]
    },
    {
      id: 'communication',
      question: 'How comfortable are you presenting ideas to groups?',
      options: [
        { value: '9', label: 'Very comfortable, I enjoy public speaking' },
        { value: '7', label: 'Comfortable with preparation' },
        { value: '5', label: 'Somewhat comfortable in small groups' },
        { value: '3', label: 'I prefer written communication' }
      ]
    },
    {
      id: 'leadership',
      question: 'When working on team projects, you typically:',
      options: [
        { value: '9', label: 'Take charge and coordinate the team' },
        { value: '7', label: 'Help organize tasks and guide others' },
        { value: '5', label: 'Contribute actively as a team member' },
        { value: '3', label: 'Focus on completing your assigned tasks' }
      ]
    },
    {
      id: 'technical_aptitude',
      question: 'How quickly do you learn new technologies or tools?',
      options: [
        { value: '9', label: 'Very quickly, I love learning new tech' },
        { value: '7', label: 'Fairly quickly with proper resources' },
        { value: '5', label: 'At a moderate pace with training' },
        { value: '3', label: 'I prefer sticking to familiar tools' }
      ]
    },
    {
      id: 'creativity',
      question: 'How often do you come up with innovative solutions?',
      options: [
        { value: '9', label: 'Regularly, I enjoy thinking outside the box' },
        { value: '7', label: 'Often, when the situation calls for it' },
        { value: '5', label: 'Sometimes, with encouragement' },
        { value: '3', label: 'Rarely, I prefer proven methods' }
      ]
    },
    {
      id: 'adaptability',
      question: 'How do you handle sudden changes in priorities?',
      options: [
        { value: '9', label: 'I thrive on change and adapt quickly' },
        { value: '7', label: 'I adjust well after initial planning' },
        { value: '5', label: 'I need some time to adjust but manage' },
        { value: '3', label: 'I prefer stable, predictable environments' }
      ]
    },
    {
      id: 'growth_mindset',
      question: 'How do you view challenges and setbacks?',
      options: [
        { value: '9', label: 'As opportunities to learn and grow' },
        { value: '7', label: 'As problems to solve systematically' },
        { value: '5', label: 'As temporary obstacles to overcome' },
        { value: '3', label: 'As things to avoid when possible' }
      ]
    },
    {
      id: 'learning_style',
      question: 'What\'s your preferred learning style?',
      options: [
        { value: 'visual', label: 'Visual (diagrams, charts, images)' },
        { value: 'auditory', label: 'Auditory (listening, discussions)' },
        { value: 'kinesthetic', label: 'Hands-on (practice, experimentation)' },
        { value: 'reading', label: 'Reading and writing' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [skillsQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < skillsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const scores = {
      problem_solving_score: parseInt(answers.problem_solving) || 5,
      communication_score: parseInt(answers.communication) || 5,
      leadership_score: parseInt(answers.leadership) || 5,
      technical_aptitude_score: parseInt(answers.technical_aptitude) || 5,
      creativity_score: parseInt(answers.creativity) || 5,
      adaptability_score: parseInt(answers.adaptability) || 5,
      growth_mindset_score: parseInt(answers.growth_mindset) || 5
    };

    return scores;
  };

  const getTopStrengths = () => {
    const scores = calculateScores();
    const strengths = [];
    
    if (scores.problem_solving_score >= 7) strengths.push('Problem Solving');
    if (scores.communication_score >= 7) strengths.push('Communication');
    if (scores.leadership_score >= 7) strengths.push('Leadership');
    if (scores.technical_aptitude_score >= 7) strengths.push('Technical Learning');
    if (scores.creativity_score >= 7) strengths.push('Innovation');
    if (scores.adaptability_score >= 7) strengths.push('Adaptability');
    if (scores.growth_mindset_score >= 7) strengths.push('Growth Mindset');

    return strengths.slice(0, 3); // Top 3 strengths
  };

  const getDevelopmentAreas = () => {
    const scores = calculateScores();
    const areas = [];
    
    if (scores.problem_solving_score <= 4) areas.push('Problem Solving');
    if (scores.communication_score <= 4) areas.push('Communication');
    if (scores.leadership_score <= 4) areas.push('Leadership');
    if (scores.technical_aptitude_score <= 4) areas.push('Technical Skills');
    if (scores.creativity_score <= 4) areas.push('Creative Thinking');
    if (scores.adaptability_score <= 4) areas.push('Adaptability');

    return areas.slice(0, 2); // Top 2 development areas
  };

  const handleComplete = async () => {
    try {
      const scores = calculateScores();
      const topStrengths = getTopStrengths();
      const developmentAreas = getDevelopmentAreas();
      const learningStyle = [answers.learning_style];
      
      // Get job seeker profile ID
      const { data: jsProfile } = await supabase
        .from('job_seeker_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (jsProfile) {
        // Save skills assessment
        await supabase
          .from('skills_assessments')
          .insert({
            job_seeker_id: jsProfile.id,
            ...scores,
            top_strengths: topStrengths,
            development_areas: developmentAreas,
            learning_style: learningStyle,
            assessment_responses: answers
          });
      }

      onNext({});
    } catch (error) {
      console.error('Error saving skills assessment:', error);
      onNext({});
    }
  };

  const currentQ = skillsQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Skills & Potential Assessment
        </h3>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {skillsQuestions.length}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-medium text-gray-900 mb-4">
              {currentQ.question}
            </h4>
            
            <RadioGroup
              value={answers[currentQ.id] || ''}
              onValueChange={handleAnswer}
              className="space-y-3 text-left"
            >
              {currentQ.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="font-normal cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={currentQuestion === 0 ? onBack : handlePrevious}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!answers[currentQ.id]}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestion === skillsQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep6;
