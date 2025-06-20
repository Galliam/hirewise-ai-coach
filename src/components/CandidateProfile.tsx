
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/hooks/useApplications";

interface CandidateProfileProps {
  application: Application;
  onMessage: (candidateId: string) => void;
  onUpdateStatus: (applicationId: string, status: string) => void;
  onClose: () => void;
}

const CandidateProfile = ({ application, onMessage, onUpdateStatus, onClose }: CandidateProfileProps) => {
  const { applicant, job_seeker_profile, application_insights } = application;
  
  const handleStatusUpdate = async (status: string) => {
    await onUpdateStatus(application.id, status);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {applicant.first_name} {applicant.last_name}
          </h2>
          <p className="text-gray-600">{job_seeker_profile?.current_title || 'Professional'}</p>
          <p className="text-sm text-gray-500">{applicant.email}</p>
        </div>
        <Button onClick={onClose} variant="ghost" size="sm">✕</Button>
      </div>

      {/* Match Score */}
      {application_insights?.matchScore && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Match Score</span>
            <span className="text-2xl font-bold text-blue-600">{application_insights.matchScore}%</span>
          </div>
          
          {application_insights.topStrengths && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Top Strengths:</h4>
              <div className="space-y-1">
                {application_insights.topStrengths.slice(0, 3).map((strength: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 text-xs mt-1">✓</span>
                    <span className="text-xs text-gray-600">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Professional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Experience</h3>
          <p className="text-sm text-gray-900">{job_seeker_profile?.years_experience || 0} years</p>
          {job_seeker_profile?.current_company && (
            <p className="text-xs text-gray-500 mt-1">Currently at {job_seeker_profile.current_company}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Salary Expectation</h3>
          {job_seeker_profile?.salary_min && job_seeker_profile?.salary_max ? (
            <p className="text-sm text-gray-900">
              ${job_seeker_profile.salary_min.toLocaleString()} - ${job_seeker_profile.salary_max.toLocaleString()}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Not specified</p>
          )}
        </div>
      </div>

      {/* Skills */}
      {job_seeker_profile?.technical_skills && job_seeker_profile.technical_skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job_seeker_profile.technical_skills.slice(0, 8).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job_seeker_profile.technical_skills.length > 8 && (
              <Badge variant="outline" className="text-xs">
                +{job_seeker_profile.technical_skills.length - 8} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <Button 
          onClick={() => onMessage(applicant.id)}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Message Candidate
        </Button>
        <Button 
          onClick={() => handleStatusUpdate('approved')}
          variant="outline"
          className="flex-1"
        >
          Approve
        </Button>
        <Button 
          onClick={() => handleStatusUpdate('rejected')}
          variant="outline"
          className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default CandidateProfile;
