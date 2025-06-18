
import { supabase } from "@/integrations/supabase/client";

export interface JobSeekerProfile {
  id: string;
  desired_job_title?: string;
  desired_location?: string[];
  job_type?: string[];
  salary_min?: number;
  salary_max?: number;
  company_types?: string[];
  company_sizes?: string[];
  industries?: string[];
  work_environment?: string[];
  company_culture?: string[];
  technical_skills?: string[];
  soft_skills?: string[];
  years_experience?: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  skills_required: string[];
  salary_min?: number;
  salary_max?: number;
  company_size?: string;
  industry?: string;
  work_environment?: string[];
  company_culture?: string[];
  experience_required?: number;
}

export interface MatchingPreferences {
  salary_weight: number;
  location_weight: number;
  company_culture_weight: number;
  growth_opportunities_weight: number;
  work_life_balance_weight: number;
  role_responsibilities_weight: number;
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  matchDetails: {
    salaryMatch: number;
    locationMatch: number;
    skillsMatch: number;
    experienceMatch: number;
    cultureMatch: number;
    jobTypeMatch: number;
    industryMatch: number;
    overallMatch: number;
  };
  matchReasons: string[];
}

export class JobMatchingAlgorithm {
  private static calculateSalaryMatch(
    jobSeekerMin?: number,
    jobSeekerMax?: number,
    jobSalaryMin?: number,
    jobSalaryMax?: number
  ): number {
    if (!jobSeekerMin || !jobSalaryMin) return 0.5; // Neutral if data missing
    
    // If job seeker's minimum is within job's range
    if (jobSalaryMin >= jobSeekerMin && (!jobSeekerMax || jobSalaryMin <= jobSeekerMax)) {
      return 1.0;
    }
    
    // Calculate overlap
    const seekerRange = jobSeekerMax ? jobSeekerMax - jobSeekerMin : jobSeekerMin * 0.3;
    const jobRange = jobSalaryMax ? jobSalaryMax - jobSalaryMin : jobSalaryMin * 0.3;
    
    const overlapStart = Math.max(jobSeekerMin, jobSalaryMin);
    const overlapEnd = Math.min(jobSeekerMax || jobSeekerMin * 1.5, jobSalaryMax || jobSalaryMin * 1.5);
    
    if (overlapStart <= overlapEnd) {
      const overlapSize = overlapEnd - overlapStart;
      const averageRange = (seekerRange + jobRange) / 2;
      return Math.min(1.0, overlapSize / averageRange);
    }
    
    return Math.max(0, 1 - Math.abs(jobSeekerMin - jobSalaryMin) / Math.max(jobSeekerMin, jobSalaryMin));
  }

  private static calculateLocationMatch(
    desiredLocations?: string[],
    jobLocation?: string
  ): number {
    if (!desiredLocations || !jobLocation) return 0.5;
    
    // Exact match
    if (desiredLocations.some(loc => 
      loc.toLowerCase().includes(jobLocation.toLowerCase()) || 
      jobLocation.toLowerCase().includes(loc.toLowerCase())
    )) {
      return 1.0;
    }
    
    // Check for remote work preference
    if (desiredLocations.some(loc => loc.toLowerCase().includes('remote')) && 
        jobLocation.toLowerCase().includes('remote')) {
      return 1.0;
    }
    
    // Partial location matching (state/country level)
    const locationWords = jobLocation.toLowerCase().split(/[,\s]+/);
    for (const desired of desiredLocations) {
      const desiredWords = desired.toLowerCase().split(/[,\s]+/);
      const commonWords = locationWords.filter(word => 
        desiredWords.some(dWord => dWord.includes(word) || word.includes(dWord))
      );
      if (commonWords.length > 0) {
        return 0.7;
      }
    }
    
    return 0.2;
  }

  private static calculateSkillsMatch(
    jobSeekerSkills?: string[],
    requiredSkills?: string[]
  ): number {
    if (!jobSeekerSkills || !requiredSkills || requiredSkills.length === 0) return 0.5;
    
    const normalizedJobSeekerSkills = jobSeekerSkills.map(skill => skill.toLowerCase());
    const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());
    
    let matchedSkills = 0;
    let partialMatches = 0;
    
    for (const required of normalizedRequiredSkills) {
      const exactMatch = normalizedJobSeekerSkills.some(skill => 
        skill === required || skill.includes(required) || required.includes(skill)
      );
      
      if (exactMatch) {
        matchedSkills++;
      } else {
        // Check for partial matches (similar skills)
        const partialMatch = normalizedJobSeekerSkills.some(skill => {
          const words1 = skill.split(/\s+/);
          const words2 = required.split(/\s+/);
          return words1.some(w1 => words2.some(w2 => 
            (w1.length > 3 && w2.length > 3) && 
            (w1.includes(w2) || w2.includes(w1))
          ));
        });
        
        if (partialMatch) {
          partialMatches++;
        }
      }
    }
    
    const totalMatch = matchedSkills + (partialMatches * 0.5);
    return Math.min(1.0, totalMatch / normalizedRequiredSkills.length);
  }

  private static calculateExperienceMatch(
    jobSeekerExperience?: number,
    requiredExperience?: number
  ): number {
    if (!jobSeekerExperience || !requiredExperience) return 0.7;
    
    if (jobSeekerExperience >= requiredExperience) {
      // Over-qualified penalty (slight)
      const overQualified = jobSeekerExperience - requiredExperience;
      return Math.max(0.8, 1.0 - (overQualified * 0.05));
    } else {
      // Under-qualified
      const gap = requiredExperience - jobSeekerExperience;
      return Math.max(0, 1.0 - (gap * 0.15));
    }
  }

  private static calculateArrayMatch(
    jobSeekerPrefs?: string[],
    jobAttributes?: string[]
  ): number {
    if (!jobSeekerPrefs || !jobAttributes) return 0.5;
    
    const matches = jobSeekerPrefs.filter(pref => 
      jobAttributes.some(attr => 
        attr.toLowerCase().includes(pref.toLowerCase()) ||
        pref.toLowerCase().includes(attr.toLowerCase())
      )
    );
    
    return matches.length / Math.max(jobSeekerPrefs.length, 1);
  }

  public static calculateJobMatch(
    jobSeeker: JobSeekerProfile,
    job: Job,
    preferences: MatchingPreferences
  ): JobMatch {
    const salaryMatch = this.calculateSalaryMatch(
      jobSeeker.salary_min,
      jobSeeker.salary_max,
      job.salary_min,
      job.salary_max
    );

    const locationMatch = this.calculateLocationMatch(
      jobSeeker.desired_location,
      job.location
    );

    const skillsMatch = this.calculateSkillsMatch(
      [...(jobSeeker.technical_skills || []), ...(jobSeeker.soft_skills || [])],
      job.skills_required
    );

    const experienceMatch = this.calculateExperienceMatch(
      jobSeeker.years_experience,
      job.experience_required
    );

    const cultureMatch = this.calculateArrayMatch(
      jobSeeker.company_culture,
      job.company_culture
    );

    const jobTypeMatch = jobSeeker.job_type?.includes(job.job_type) ? 1.0 : 0.3;

    const industryMatch = jobSeeker.industries?.includes(job.industry || '') ? 1.0 : 0.5;

    // Weighted score calculation
    const weightedScore = (
      (salaryMatch * preferences.salary_weight) +
      (locationMatch * preferences.location_weight) +
      (skillsMatch * preferences.role_responsibilities_weight) +
      (cultureMatch * preferences.company_culture_weight) +
      (jobTypeMatch * preferences.work_life_balance_weight) +
      (experienceMatch * 5) + // Fixed weight for experience
      (industryMatch * 3) // Fixed weight for industry
    ) / (
      preferences.salary_weight +
      preferences.location_weight +
      preferences.role_responsibilities_weight +
      preferences.company_culture_weight +
      preferences.work_life_balance_weight +
      5 + 3
    );

    const overallMatch = Math.round(weightedScore * 100);

    // Generate match reasons
    const matchReasons: string[] = [];
    if (salaryMatch > 0.8) matchReasons.push(`Salary aligns with your ${jobSeeker.salary_min ? `$${jobSeeker.salary_min.toLocaleString()}` : 'desired'} range`);
    if (locationMatch > 0.8) matchReasons.push(`Location matches your preference for ${jobSeeker.desired_location?.join(', ')}`);
    if (skillsMatch > 0.7) matchReasons.push(`Strong skills match (${Math.round(skillsMatch * 100)}% of required skills)`);
    if (experienceMatch > 0.8) matchReasons.push(`Your ${jobSeeker.years_experience} years experience fits well`);
    if (cultureMatch > 0.7) matchReasons.push(`Company culture aligns with your preferences`);
    if (jobTypeMatch > 0.9) matchReasons.push(`Job type matches your ${jobSeeker.job_type?.join(', ')} preference`);

    return {
      job,
      matchScore: overallMatch,
      matchDetails: {
        salaryMatch: Math.round(salaryMatch * 100),
        locationMatch: Math.round(locationMatch * 100),
        skillsMatch: Math.round(skillsMatch * 100),
        experienceMatch: Math.round(experienceMatch * 100),
        cultureMatch: Math.round(cultureMatch * 100),
        jobTypeMatch: Math.round(jobTypeMatch * 100),
        industryMatch: Math.round(industryMatch * 100),
        overallMatch
      },
      matchReasons
    };
  }

  public static async getMatchedJobsForUser(userId: string): Promise<JobMatch[]> {
    try {
      // Fetch job seeker profile
      const { data: profile } = await supabase
        .from('job_seeker_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!profile) return [];

      // Fetch matching preferences
      const { data: preferences } = await supabase
        .from('job_matching_preferences')
        .select('*')
        .eq('job_seeker_id', profile.id)
        .single();

      const defaultPreferences: MatchingPreferences = {
        salary_weight: preferences?.salary_weight || 7,
        location_weight: preferences?.location_weight || 8,
        company_culture_weight: preferences?.company_culture_weight || 6,
        growth_opportunities_weight: preferences?.growth_opportunities_weight || 7,
        work_life_balance_weight: preferences?.work_life_balance_weight || 8,
        role_responsibilities_weight: preferences?.role_responsibilities_weight || 9
      };

      // Fetch all active jobs
      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active');

      if (!jobs) return [];

      // Calculate matches for all jobs
      const jobMatches = jobs
        .map(job => this.calculateJobMatch(profile, job, defaultPreferences))
        .filter(match => match.matchScore >= 85) // Only show 85%+ matches
        .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending

      return jobMatches;
    } catch (error) {
      console.error('Error getting matched jobs:', error);
      return [];
    }
  }

  public static async getApplicationInsights(
    jobId: string,
    applicantId: string
  ): Promise<{
    matchScore: number;
    topStrengths: string[];
    matchBreakdown: any;
  } | null> {
    try {
      // Get job seeker profile
      const { data: profile } = await supabase
        .from('job_seeker_profiles')
        .select('*')
        .eq('user_id', applicantId)
        .single();

      // Get job details
      const { data: job } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (!profile || !job) return null;

      // Get matching preferences
      const { data: preferences } = await supabase
        .from('job_matching_preferences')
        .select('*')
        .eq('job_seeker_id', profile.id)
        .single();

      const defaultPreferences: MatchingPreferences = {
        salary_weight: preferences?.salary_weight || 7,
        location_weight: preferences?.location_weight || 8,
        company_culture_weight: preferences?.company_culture_weight || 6,
        growth_opportunities_weight: preferences?.growth_opportunities_weight || 7,
        work_life_balance_weight: preferences?.work_life_balance_weight || 8,
        role_responsibilities_weight: preferences?.role_responsibilities_weight || 9
      };

      const jobMatch = this.calculateJobMatch(profile, job, defaultPreferences);

      return {
        matchScore: jobMatch.matchScore,
        topStrengths: jobMatch.matchReasons,
        matchBreakdown: jobMatch.matchDetails
      };
    } catch (error) {
      console.error('Error getting application insights:', error);
      return null;
    }
  }
}
