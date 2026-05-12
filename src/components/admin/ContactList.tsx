import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Eye,
  MessageSquare,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ContactList() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch leads");
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("contacts")
      .update({ status })
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Marked as ${status}`);
      fetchContacts();
      if (selectedContact) setSelectedContact({...selectedContact, status});
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete enquiry");
    } else {
      toast.success("Enquiry deleted");
      fetchContacts();
      setSelectedContact(null);
    }
  };

  const filtered = contacts.filter(c => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Client <span className="text-brand-magenta">Inquiries</span></h2>
          <p className="text-sm text-muted-foreground mt-1">Review and manage general leads and support requests.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leads by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 rounded-2xl bg-card/30 border-border/40 backdrop-blur-xl focus:border-brand-magenta/50 transition-all shadow-inner"
        />
      </div>

      <div className="rounded-3xl border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden shadow-elegant">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 bg-white/5">
              <TableHead className="font-bold text-[10px] uppercase tracking-widest pl-8">Inquirer</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Subject</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Date</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center text-muted-foreground">Loading inquiries...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center text-muted-foreground">No inquiries found.</TableCell></TableRow>
            ) : (
              filtered.map((c) => (
                <TableRow key={c.id} className="group border-border/20 hover:bg-white/[0.03] transition-all">
                  <TableCell className="pl-8 py-5">
                    <div className="font-bold text-foreground">{c.full_name}</div>
                    <div className="text-xs text-muted-foreground">{c.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium line-clamp-1">{c.subject}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3 w-3" /> {new Date(c.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full text-[9px] uppercase tracking-widest px-2 ${
                      c.status === 'read' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-brand-magenta/10 text-brand-magenta border-brand-magenta/20'
                    }`}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedContact(c)}
                      className="h-9 rounded-xl border-border/40 hover:bg-brand-magenta/10 hover:text-brand-magenta"
                    >
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] bg-card/95 backdrop-blur-2xl border-border/40">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Inquiry Details</DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-8 py-4">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem icon={Mail} label="Email" value={selectedContact.email} />
                  <DetailItem icon={Phone} label="Phone" value={selectedContact.phone || "N/A"} />
                </div>
                <DetailItem icon={MessageSquare} label="Subject" value={selectedContact.subject} />
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-border/40">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Message</Label>
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/40">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateStatus(selectedContact.id, 'read')}
                    disabled={selectedContact.status === 'read'}
                    className="rounded-full border-green-500/30 text-green-500 hover:bg-green-500/10"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Read
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteContact(selectedContact.id)}
                    className="rounded-full border-red-500/30 text-brand-red hover:bg-brand-red/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => setSelectedContact(null)} className="rounded-full">Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 text-brand-magenta shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
