import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/lead-api";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadFormDialog = ({ open, onOpenChange }: LeadFormDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    siteLocation: "",
    remarks: "",
    role: "",
    material: "",
    timeline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLead(formData);

      toast({
        title: "Enquiry Submitted!",
        description: "Thank you! Our team will contact you shortly.",
      });
      setFormData({
        name: "",
        contactNumber: "",
        siteLocation: "",
        remarks: "",
        role: "",
        material: "",
        timeline: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-heading">Get a Free Quote</DialogTitle>
          <DialogDescription>Fill in your details and we'll get back to you shortly.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="tel"
            placeholder="Contact Number"
            required
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
          <Input
            placeholder="Site Location"
            required
            value={formData.siteLocation}
            onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
          />
          <Textarea
            placeholder="Remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          />

          <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Your Role in the Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Owner">Owner</SelectItem>
              <SelectItem value="Architect">Architect</SelectItem>
              <SelectItem value="Builder">Builder</SelectItem>
              <SelectItem value="Contractor">Contractor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formData.material} onValueChange={(v) => setFormData({ ...formData, material: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Preferred Fabrication Material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uPVC">uPVC</SelectItem>
              <SelectItem value="Classic Aluminium">Classic Aluminium</SelectItem>
              <SelectItem value="Slim-Series Aluminium">Slim-Series Aluminium</SelectItem>
              <SelectItem value="System-Series Aluminium">System-Series Aluminium</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })}>
            <SelectTrigger>
              <SelectValue placeholder="When do you plan to start?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Urgent Requirement">Urgent Requirement</SelectItem>
              <SelectItem value="Planning Phase">Planning Phase</SelectItem>
              <SelectItem value="Future Project">Future Project</SelectItem>
              <SelectItem value="Just Exploring">Just Exploring</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-primary-foreground font-heading font-bold">
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
