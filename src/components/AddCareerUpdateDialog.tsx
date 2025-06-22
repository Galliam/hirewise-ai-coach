
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCareerUpdates } from "@/hooks/useCareerUpdates";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const AddCareerUpdateDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    update_type: '',
    title: '',
    description: '',
    company: ''
  });
  
  const { addCareerUpdate } = useCareerUpdates();
  const { toast } = useToast();

  const updateTypes = [
    { value: 'job_change', label: 'New Job' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'skill_added', label: 'New Skill' },
    { value: 'certification', label: 'Certification' }
  ];

  const handleSubmit = async () => {
    if (!formData.update_type || !formData.title) {
      toast({
        title: "Error",
        description: "Please fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const result = await addCareerUpdate({
      update_type: formData.update_type as any,
      title: formData.title,
      description: formData.description || undefined,
      company: formData.company || undefined
    });
    
    if (result?.success) {
      toast({
        title: "Career Update Added",
        description: "Your career update has been shared with interested recruiters.",
      });
      setOpen(false);
      setFormData({
        update_type: '',
        title: '',
        description: '',
        company: ''
      });
    } else {
      toast({
        title: "Error",
        description: result?.error || "Failed to add career update. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Career Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Career Update</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Update Type *
            </label>
            <Select 
              value={formData.update_type} 
              onValueChange={(value) => setFormData({...formData, update_type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select update type" />
              </SelectTrigger>
              <SelectContent>
                {updateTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Title *
            </label>
            <Input
              placeholder="e.g., Senior Software Engineer at TechCorp"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Company
            </label>
            <Input
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Description
            </label>
            <Textarea
              placeholder="Additional details about this update..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Update"}
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

export default AddCareerUpdateDialog;
