
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingStep5Props {
  onNext: (data?: any) => void;
  onBack: () => void;
  profile: any;
  isFirst: boolean;
  isLast: boolean;
}

const OnboardingStep5 = ({ onNext, onBack, profile }: OnboardingStep5Props) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const personalityQuestions = [
    {
      id: 'extraversion_1',
      question: 'I enjoy being the center of attention in social situations.',
      trait: 'extraversion'
    },
    {
      id: 'openness_1', 
      question: 'I am always curious about learning new things.',
      trait: 'openness'
    },
    {
      id: 'conscientiousness_1',
      question: 'I like to keep my workspace organized and tidy.',
      trait: 'conscientiousness'
    },
    {
      id: 'agreeableness_1',
      question: 'I try to be cooperative and avoid conflicts.',
      trait: 'agreeableness'
    },
    {
      id: 'neuroticism_1',
      question: 'I often feel anxious about upcoming deadlines.',
      trait: 'neuroticism'
    },
    {
      id: 'extraversion_2',
      question: 'I prefer working in teams rather than alone.',
      trait: 'extraversion'
    },
    {
      id: 'openness_2',
      question: 'I enjoy trying unconventional approaches to problems.',
      trait: 'openness'
    },
    {
      id: 'conscientiousness_2',
      question: 'I always complete tasks well before the deadline.',
      trait: 'conscientiousness'
    },
    {
      id: 'agreeableness_2',
      question: 'I find it easy to understand others\' perspectives.',
      trait: 'agreeableness'
    },
    {
      id: 'neuroticism_2',
      question: 'I remain calm under pressure.',
      trait: 'neuroticism'
    }
  ];

  const workStyleQuestions = [
    {
      id: 'communication_style',
      question: 'What\'s your preferred communication style?',
      options: [
        { value: 'direct', label: 'Direct and straightforward' },
        { value: 'diplomatic', label: 'Diplomatic and considerate' },
        { value: 'casual', label: 'Casual and friendly' },
        { value: 'formal', label: 'Formal and professional' }
      ]
    },
    {
      id: 'leadership_preference',
      question: 'What\'s your preferred role in team dynamics?',
      options: [
        { value: 'lead', label: 'I like to lead and guide others' },
        { value: 'follow', label: 'I prefer following clear direction' },
        { value: 'collaborate', label: 'I work best as an equal collaborator' },
        { value: 'individual_contributor', label: 'I prefer working independently' }
      ]
    }
  ];

  const allQuestions = [...personalityQuestions, ...workStyleQuestions];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [allQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
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
      openness_score: 5,
      conscientiousness_score: 5,
      extraversion_score: 5,
      agreeableness_score: 5,
      neuroticism_score: 5
    };

    // Calculate scores based on answers (simplified scoring)
    personalityQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        const scoreValue = parseInt(answer);
        const trait = q.trait + '_score';
        if (scores[trait] !== undefined) {
          scores[trait] = Math.round((scores[trait] + scoreValue) / 2);
        }
      }
    });

    return scores;
  };

  const getWorkStyleTraits = () => {
    const traits = [];
    const scores = calculateScores();
    
    if (scores.openness_score >= 7) traits.push('innovative', 'creative');
    if (scores.conscientiousness_score >= 7) traits.push('detail_oriented', 'organized');
    if (scores.extraversion_score >= 7) traits.push('collaborative', 'social');
    else traits.push('independent', 'focused');
    if (scores.agreeableness_score >= 7) traits.push('team_player', 'supportive');
    
    return traits;
  };

  const handleComplete = async () => {
    try {
      const scores = calculateScores();
      const workStyleTraits = getWorkStyleTraits();
      
      // Get job seeker profile ID
      const { data: jsProfile } = await supabase
        .from('job_seeker_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (jsProfile) {
        // Save personality assessment
        await supabase
          .from('personality_assessments')
          .insert({
            job_seeker_id: jsProfile.id,
            ...scores,
            work_style_traits: workStyleTraits,
            communication_style: answers.communication_style,
            leadership_preference: answers.leadership_preference,
            assessment_responses: answers
          });
      }

      onNext({});
    } catch (error) {
      console.error('Error saving personality assessment:', error);
      onNext({});
    }
  };

  const currentQ = allQuestions[currentQuestion];
  const isPersonalityQuestion = personalityQuestions.includes(currentQ);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Personality & Work Style Assessment
        </h3>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {allQuestions.length}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h4 className="text-xl font-medium text-gray-900 mb-4">
              {currentQ.question}
            </h4>
            
            {isPersonalityQuestion ? (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {[
                  { value: '1', label: 'Strongly Disagree' },
                  { value: '2', label: 'Disagree' },
                  { value: '3', label: 'Slightly Disagree' },
                  { value: '4', label: 'Neutral' },
                  { value: '5', label: 'Slightly Agree' },
                  { value: '6', label: 'Agree' },
                  { value: '7', label: 'Strongly Agree' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQ.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
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
          {currentQuestion === allQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep5;
