
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRecruiterInterests } from "@/hooks/useRecruiterInterests";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface ExpressInterestDialogProps {
  candidateId: string;
  candidateName: string;
}

const ExpressInterestDialog = ({ candidateId, candidateName }: ExpressInterestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { expressInterest } = useRecruiterInterests();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    
    const result = await expressInterest(candidateId, message);
    
    if (result?.success) {
      toast({
        title: "Interest Expressed",
        description: `Your interest in ${candidateName} has been sent successfully.`,
      });
      setOpen(false);
      setMessage("");
    } else {
      toast({
        title: "Error",
        description: result?.error || "Failed to express interest. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
          <Heart className="w-4 h-4 mr-2" />
          Express Interest
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Express Interest in {candidateName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Send a message to express your interest in this candidate. If they accept, you'll receive updates about their career progress.
            </p>
            <Textarea
              placeholder="Write a message to the candidate (optional)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? "Sending..." : "Send Interest"}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpressInterestDialog;
