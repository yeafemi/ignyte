import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface SectionEditorProps {
  sectionKey: string;
  data: any;
  onSave: (data: any) => void;
  onReset: () => void;
  isSaving: boolean;
}

export function SectionEditor({
  sectionKey,
  data,
  onSave,
  onReset,
  isSaving,
}: SectionEditorProps) {
  const [formData, setFormData] = useState<any>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (arrayKey: string, index: number, field: string | null, value: any) => {
    const newArray = [...formData[arrayKey]];
    if (field) {
      newArray[index] = { ...newArray[index], [field]: value };
    } else {
      newArray[index] = value;
    }
    handleChange(arrayKey, newArray);
  };

  const addArrayItem = (arrayKey: string, template: any) => {
    const newArray = [...formData[arrayKey], template];
    handleChange(arrayKey, newArray);
    toast.info(`Added new item to ${arrayKey}`);
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    const newArray = formData[arrayKey].filter((_: any, i: number) => i !== index);
    handleChange(arrayKey, newArray);
    toast.warning(`Removed item from ${arrayKey}`);
  };

  const moveItem = (arrayKey: string, index: number, direction: 'up' | 'down') => {
    const newArray = [...formData[arrayKey]];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newArray.length) return;
    
    [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]];
    handleChange(arrayKey, newArray);
  };

  const renderField = (key: string, value: any) => {
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    // Handle nested objects (only 1 level for now)
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      return (
        <div key={key} className="space-y-6 p-6 rounded-3xl border border-border/40 bg-white/5 backdrop-blur-sm">
          <h3 className="text-lg font-bold tracking-tight text-brand-cyan">{label}</h3>
          <div className="grid gap-6">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={`${key}-${subKey}`}>
                {renderField(`${key}.${subKey}`, subValue)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle Arrays
    if (Array.isArray(value)) {
      const isStringArray = value.length > 0 ? typeof value[0] === "string" : false;
      const template = isStringArray ? "" : (value.length > 0 ? Object.fromEntries(Object.keys(value[0]).map(k => [k, ""])) : {});
      
      return (
        <div key={key} className="space-y-6 pt-10 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-brand" />
              <Label className="text-xl font-bold tracking-tight">{label}</Label>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground">{value.length} items</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10"
              onClick={() => addArrayItem(key, template)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="grid gap-6">
            {value.map((item, idx) => (
              <div key={`${key}-${idx}`} className="group/item relative overflow-hidden p-6 rounded-3xl border border-border/40 bg-white/5 backdrop-blur-sm transition-all hover:border-brand-magenta/30 hover:bg-white/[0.07]">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => moveItem(key, idx, 'up')} disabled={idx === 0}><ChevronUp className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => moveItem(key, idx, 'down')} disabled={idx === value.length - 1}><ChevronDown className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-brand-red hover:bg-brand-red/10" onClick={() => removeArrayItem(key, idx)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                
                <div className="space-y-5">
                  {isStringArray ? (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Point {idx + 1}</Label>
                      <Input 
                        value={formData[key][idx] ?? ""}
                        onChange={(e) => handleArrayChange(key, idx, null, e.target.value)}
                        className="bg-background/40 border-border/20 focus:border-brand-magenta/50 text-sm h-11 rounded-xl"
                      />
                    </div>
                  ) : (
                    Object.entries(item).map(([itemKey, itemValue]) => (
                      <div key={`${key}-${idx}-${itemKey}`} className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">{itemKey}</Label>
                        {typeof itemValue === "string" && (itemValue.length > 50 || itemKey.toLowerCase().includes("desc") || itemKey.toLowerCase().includes("quote") || Array.isArray(itemValue)) ? (
                          Array.isArray(itemValue) ? (
                            <div className="p-4 rounded-xl bg-background/20 border border-dashed border-border/40 text-center">
                              <p className="text-[10px] text-muted-foreground uppercase font-black">Nested List Not Supported Here</p>
                            </div>
                          ) : (
                            <Textarea 
                              value={(formData[key][idx] as any)[itemKey] ?? ""}
                              onChange={(e) => handleArrayChange(key, idx, itemKey, e.target.value)}
                              className="bg-background/40 border-border/20 focus:border-brand-magenta/50 text-sm rounded-xl min-h-[80px]"
                            />
                          )
                        ) : (
                          <Input 
                            value={(formData[key][idx] as any)[itemKey] ?? ""}
                            onChange={(e) => handleArrayChange(key, idx, itemKey, e.target.value)}
                            className="bg-background/40 border-border/20 focus:border-brand-magenta/50 text-sm h-11 rounded-xl"
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle Strings (Basic Fields)
    if (typeof value === "string") {
      const isLarge = value.length > 50 || key.toLowerCase().includes("body") || key.toLowerCase().includes("subtitle") || key.toLowerCase().includes("intro");
      const parts = key.split('.');
      const currentVal = parts.length > 1 ? formData[parts[0]][parts[1]] : formData[key];

      return (
        <div key={key} className="space-y-3 group/field">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within/field:text-brand-cyan transition-colors ml-1">
            {label}
          </Label>
          {isLarge ? (
            <Textarea
              value={currentVal ?? ""}
              onChange={(e) => {
                if (parts.length > 1) {
                  const newParent = { ...formData[parts[0]], [parts[1]]: e.target.value };
                  handleChange(parts[0], newParent);
                } else {
                  handleChange(key, e.target.value);
                }
              }}
              className="min-h-[120px] rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all resize-none p-4"
            />
          ) : (
            <Input
              value={currentVal ?? ""}
              onChange={(e) => {
                if (parts.length > 1) {
                  const newParent = { ...formData[parts[0]], [parts[1]]: e.target.value };
                  handleChange(parts[0], newParent);
                } else {
                  handleChange(key, e.target.value);
                }
              }}
              className="h-12 rounded-xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all px-4"
            />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-cyan">
            Section Editor
          </div>
          <h2 className="font-display text-4xl font-black capitalize tracking-tight">
            {sectionKey} <span className="text-gradient-brand">Settings</span>
          </h2>
          <p className="text-muted-foreground">
            Manage titles, copy, and list elements for the {sectionKey} section.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onReset} 
            className="rounded-full border-border/60 hover:bg-white/5 px-8 transition-all active:scale-95"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button 
            size="lg" 
            onClick={() => onSave(formData)} 
            disabled={isSaving} 
            className="rounded-full bg-gradient-brand px-10 font-black uppercase tracking-widest shadow-glow hover:scale-105 active:scale-95 transition-all text-xs"
          >
            <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-12 max-w-4xl pb-20">
        {Object.entries(formData).map(([key, value], i) => (
          <div 
            key={key} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
          >
            {renderField(key, value)}
          </div>
        ))}
      </div>
    </div>
  );
}
