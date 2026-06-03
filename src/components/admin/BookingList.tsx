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
  Calendar, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function BookingList() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to fetch bookings");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Booking marked as ${status}`);
      fetchBookings();
      if (selectedBooking) setSelectedBooking({...selectedBooking, status});
    }
  };

  const filtered = bookings.filter(b => 
    b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Consultation <span className="text-brand-cyan">Bookings</span></h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and respond to client consultation requests.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bookings by name, email, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 rounded-2xl bg-card/90 border-border/40 focus:border-brand-cyan/50 transition-all shadow-inner"
        />
      </div>

      <div className="rounded-3xl border border-border/40 bg-card/90 overflow-hidden shadow-elegant">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 bg-white/5">
              <TableHead className="font-bold text-[10px] uppercase tracking-widest pl-8">Client</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Service</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Date / Method</TableHead>
              <TableHead className="font-bold text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-right font-bold text-[10px] uppercase tracking-widest pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center text-muted-foreground">Loading bookings...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center text-muted-foreground">No bookings found.</TableCell></TableRow>
            ) : (
              filtered.map((b) => (
                <TableRow key={b.id} className="group border-border/20 hover:bg-white/[0.03] transition-all">
                  <TableCell className="pl-8 py-5">
                    <div className="font-bold text-foreground">{b.full_name}</div>
                    <div className="text-xs text-muted-foreground">{b.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan text-[9px] uppercase tracking-wider px-2">
                      {b.service}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <Calendar className="h-3 w-3 text-brand-cyan" /> {b.preferred_date || "Not specified"}
                    </div>
                    <div className="text-[10px] text-muted-foreground ml-5">{b.meeting_method}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full text-[9px] uppercase tracking-widest px-2 ${
                      b.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      b.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
                    }`}>
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedBooking(b)}
                      className="h-9 rounded-xl border-border/40 hover:bg-brand-cyan/10 hover:text-brand-cyan"
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

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] bg-card/95 backdrop-blur-2xl border-border/40">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-8 py-4">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <DetailItem icon={Clock} label="Submitted" value={new Date(selectedBooking.created_at).toLocaleString()} />
                  <DetailItem icon={Mail} label="Email" value={selectedBooking.email} />
                  <DetailItem icon={Phone} label="Phone" value={selectedBooking.phone || "N/A"} />
                </div>
                <div className="space-y-4">
                  <DetailItem icon={Calendar} label="Preferred Date" value={selectedBooking.preferred_date || "TBD"} />
                  <DetailItem icon={CheckCircle2} label="Service" value={selectedBooking.service} />
                  <DetailItem icon={Globe} label="Method" value={selectedBooking.meeting_method} />
                </div>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-border/40">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Project Description</Label>
                <p className="text-sm leading-relaxed text-foreground/90">{selectedBooking.description}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/40">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateStatus(selectedBooking.id, 'completed')}
                    className="rounded-full border-green-500/30 text-green-500 hover:bg-green-500/10"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Complete
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                    className="rounded-full border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => setSelectedBooking(null)} className="rounded-full">Close</Button>
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
      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 text-brand-cyan shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
