import { createContext, useContext, useState, ReactNode } from "react";
import LeadFormDialog from "@/components/LeadFormDialog";

interface LeadFormContextType {
  openLeadForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextType>({ openLeadForm: () => {} });

export const useLeadForm = () => useContext(LeadFormContext);

export const LeadFormProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <LeadFormContext.Provider value={{ openLeadForm: () => setOpen(true) }}>
      {children}
      <LeadFormDialog open={open} onOpenChange={setOpen} />
    </LeadFormContext.Provider>
  );
};
