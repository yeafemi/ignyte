import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Filter,
  Upload,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PortfolioItem {
  id?: string;
  title: string;
  tag: string;
  client?: string;
  status?: string;
  slug?: string;
  subtitle?: string;
  funder?: string;
  year?: string;
  location?: string;
  coverImage?: string;
  description?: string;
}

interface PortfolioManagerProps {
  items: PortfolioItem[];
  onSave: (items: PortfolioItem[]) => void;
}

export function PortfolioManager({ items, onSave }: PortfolioManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newItem, setNewItem] = useState<PortfolioItem>({
    title: "",
    tag: "Business Advisory Services (BAS)",
    client: "",
    status: "Published",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size allowed is 5MB.");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to 'portfolio' storage bucket
      const { data, error } = await supabase.storage
        .from("Portfolio")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        if (error.message.includes("Bucket not found")) {
          throw new Error("Storage bucket 'portfolio' not found. Please create a public bucket named 'portfolio' in your Supabase Dashboard Storage section.");
        }
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("Portfolio")
        .getPublicUrl(filePath);

      setNewItem(prev => ({ ...prev, coverImage: publicUrl }));
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload image. Make sure a public 'portfolio' storage bucket exists.");
    } finally {
      setUploading(false);
      // Reset input value to allow uploading the same file again
      e.target.value = "";
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onSave(newItems);
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  const handleTitleChange = (title: string) => {
    const slug = slugify(title);
    setNewItem(prev => ({ ...prev, title, slug }));
  };

  const handleAdd = () => {
    onSave([...items, newItem]);
    setIsOpen(false);
    setNewItem({
      title: "",
      slug: "",
      tag: "Business Advisory Services (BAS)",
      client: "",
      status: "Published",
      subtitle: "",
      funder: "",
      year: "",
      location: "",
      coverImage: "",
      description: "",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Portfolio <span className="text-brand-magenta">Projects</span></h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your agency's work, track records, and case studies.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-gradient-brand shadow-glow self-start sm:self-auto px-8 font-bold hover:scale-105 active:scale-95 transition-all">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] rounded-3xl border-border/40 bg-card/95 backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-bold">New portfolio</DialogTitle>
              <DialogDescription>
                Fill in the project details for this portfolio entry.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Title <span className="text-brand-red">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Enter project title" 
                  className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50"
                  value={newItem.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Slug (URL)</Label>
                  <Input 
                    id="slug" 
                    placeholder="project-slug" 
                    className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50" 
                    value={newItem.slug || ""}
                    onChange={(e) => setNewItem({...newItem, slug: slugify(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                  <Select defaultValue={newItem.tag} onValueChange={(v) => setNewItem({...newItem, tag: v})}>
                    <SelectTrigger className="rounded-xl bg-background/50 border-border/40 h-11 focus:ring-brand-magenta/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/40 bg-card/95 backdrop-blur-xl">
                      <SelectItem value="Business Advisory Services (BAS)">Business Advisory Services (BAS)</SelectItem>
                      <SelectItem value="Digital Transformation">Digital Transformation</SelectItem>
                      <SelectItem value="Branding & Design">Branding & Design</SelectItem>
                      <SelectItem value="Advertising">Advertising</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Subtitle / Short Tagline</Label>
                <Input 
                  id="subtitle" 
                  placeholder="Brief tagline for the project" 
                  className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50" 
                  value={newItem.subtitle || ""}
                  onChange={(e) => setNewItem({...newItem, subtitle: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Client</Label>
                  <Input 
                    id="client" 
                    placeholder="Client name" 
                    className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50"
                    value={newItem.client}
                    onChange={(e) => setNewItem({...newItem, client: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funder" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Funder</Label>
                  <Input 
                    id="funder" 
                    placeholder="Funding organization" 
                    className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50" 
                    value={newItem.funder || ""}
                    onChange={(e) => setNewItem({...newItem, funder: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Year</Label>
                  <Input 
                    id="year" 
                    placeholder="e.g. 2024" 
                    className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50" 
                    value={newItem.year || ""}
                    onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, Country" 
                    className="rounded-xl bg-background/50 border-border/40 h-11 focus:border-brand-cyan/50" 
                    value={newItem.location || ""}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cover Image</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Paste image URL..." 
                    className="rounded-xl bg-background/50 border-border/40 h-11 flex-1 focus:border-brand-cyan/50" 
                    value={newItem.coverImage || ""}
                    onChange={(e) => setNewItem({...newItem, coverImage: e.target.value})}
                  />
                  <input 
                    type="file" 
                    id="portfolio-image-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    className="rounded-xl border-border/40 h-11 hover:bg-white/5"
                    onClick={() => document.getElementById("portfolio-image-upload")?.click()}
                    disabled={uploading}
                  >
                    <Upload className="mr-2 h-4 w-4" /> {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Project details..." 
                  className="rounded-xl bg-background/40 border-border/40 min-h-[120px] focus:border-brand-cyan/50 resize-none" 
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-6 border-t border-border/40">
              <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-full px-8 hover:bg-white/5">Cancel</Button>
              <Button onClick={handleAdd} className="rounded-full bg-gradient-brand shadow-glow px-10 font-bold hover:scale-105 transition-all">Save Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search portfolios by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-2xl bg-card/90 border-border/40 focus:border-brand-cyan/50 transition-all shadow-inner"
          />
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/40 bg-card/90 hover:bg-white/5 transition-all">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <div className="rounded-3xl border border-border/40 bg-card/90 overflow-hidden shadow-elegant transition-all">
        <Table>
          <TableHeader>
            <TableRow className="border-border/40 bg-white/5 hover:bg-white/5 transition-none">
              <TableHead className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground h-14 pl-8">Project Information</TableHead>
              <TableHead className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground h-14">Category</TableHead>
              <TableHead className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground h-14">Client</TableHead>
              <TableHead className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground h-14">Status</TableHead>
              <TableHead className="text-right font-bold uppercase tracking-widest text-[10px] text-muted-foreground h-14 pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground animate-in fade-in zoom-in-95 duration-500">
                    <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center mb-2">
                      <Search className="h-8 w-8 opacity-20" />
                    </div>
                    <p className="font-medium">No portfolio items found.</p>
                    <p className="text-xs">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item, index) => (
                <TableRow 
                  key={index} 
                  className="group border-border/20 hover:bg-white/[0.03] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <TableCell className="pl-8 py-6">
                    <div className="font-bold text-base tracking-tight group-hover:text-brand-cyan transition-colors line-clamp-1">{item.title}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Project ID</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span className="text-[10px] font-mono font-bold text-brand-cyan/60">#{String(index + 1).padStart(3, '0')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full bg-brand-magenta/5 border-brand-magenta/20 text-brand-magenta text-[9px] uppercase tracking-wider font-extrabold px-3 py-0.5">
                      {item.tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium text-sm">
                    {item.client || "IGNYTE Core"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-green-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="outline" size="sm" className="h-9 rounded-xl border-border/40 bg-background/50 hover:bg-brand-cyan/10 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all px-4">
                        <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl border-border/40 bg-background/50 text-brand-red hover:bg-brand-red/10 hover:border-brand-red/40 transition-all"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
