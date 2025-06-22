
import { Button } from "@/components/ui/button";
import { useRecruiterInterests } from "@/hooks/useRecruiterInterests";
import { useToast } from "@/hooks/use-toast";
import { Clock, Check, X } from "lucide-react";

interface RecruiterInterestCardProps {
  interest: any;
  onStatusUpdate?: () => void;
}

const RecruiterInterestCard = ({ interest, onStatusUpdate }: RecruiterInterestCardProps) => {
  const { updateInterestStatus } = useRecruiterInterests();
  const { toast } = useToast();

  const handleAccept = async () => {
    const result = await updateInterestStatus(interest.id, 'accepted');
    if (result?.success) {
      toast({
        title: "Interest Accepted",
        description: "You've accepted the recruiter's interest. They will now receive updates about your career progress.",
      });
      onStatusUpdate?.();
    } else {
      toast({
        title: "Error",
        description: "Failed to accept interest. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDecline = async () => {
    const result = await updateInterestStatus(interest.id, 'declined');
    if (result?.success) {
      toast({
        title: "Interest Declined",
        description: "You've declined the recruiter's interest.",
      });
      onStatusUpdate?.();
    } else {
      toast({
        title: "Error",
        description: "Failed to decline interest. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = () => {
    switch (interest.status) {
      case 'accepted':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'declined':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (interest.status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">
              {interest.recruiter?.first_name?.[0]}{interest.recruiter?.last_name?.[0]}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {interest.recruiter?.first_name} {interest.recruiter?.last_name}
            </p>
            <p className="text-sm text-gray-600">Recruiter</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {interest.status}
          </span>
        </div>
      </div>
      
      {interest.message && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{interest.message}</p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mb-3">
        {new Date(interest.created_at).toLocaleDateString()}
      </div>
      
      {interest.status === 'pending' && (
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleAccept} className="flex-1 bg-green-600 hover:bg-green-700">
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={handleDecline} className="flex-1">
            Decline
          </Button>
        </div>
      )}
      
      {interest.status === 'accepted' && (
        <div className="text-sm text-green-600 font-medium">
          ✓ This recruiter will receive updates about your career progress
        </div>
      )}
    </div>
  );
};

export default RecruiterInterestCard;
