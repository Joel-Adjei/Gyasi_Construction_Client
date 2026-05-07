import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Star, X, Upload, ImagePlus, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getServices, saveServices, getSettings, uploadToCloudinary } from "@/lib/store";
import type { Service, ServiceProcess } from "@/lib/type";

const MAX_IMAGES = 3;

function ImageSlot({
  url,
  index,
  uploading,
  onUpload,
  onRemove,
}: {
  url?: string;
  index: number;
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = "";
  };

  if (url) {
    return (
      <div className="relative group aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
        <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={onRemove}
            className="h-9 w-9 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {index === 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur">
            Primary
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-accent bg-muted/40 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-xs font-medium">Uploading…</span>
          </>
        ) : (
          <>
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">
              {index === 0 ? "Add primary image" : `Add image ${index + 1}`}
            </span>
          </>
        )}
      </button>
    </>
  );
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(() => getServices());
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);

  const settings = getSettings();
  const cloudinaryReady = settings.cloudinaryCloudName && settings.cloudinaryUploadPreset;

  const persist = (updated: Service[]) => {
    setServices(updated);
    saveServices(updated);
  };

  const startNew = () => {
    setEditing({
      id: "",
      title: "",
      desc: "",
      longDesc: "",
      category: "",
      startingPrice: "",
      duration: "",
      projectsCompleted: 0,
      features: [],
      process: [],
      date: new Date().toISOString().slice(0, 10),
      featured: false,
      images: [],
    });
    setOpen(true);
  };

  const startEdit = (s: Service) => {
    setEditing({
      ...s,
      longDesc: s.longDesc ?? "",
      category: s.category ?? "",
      startingPrice: s.startingPrice ?? "",
      duration: s.duration ?? "",
      projectsCompleted: s.projectsCompleted ?? 0,
      features: s.features ?? [],
      process: s.process ?? [],
    });
    setOpen(true);
  };

  const handleImageUpload = async (file: File, slot: number) => {
    if (!editing) return;
    if (!cloudinaryReady) {
      toast.error("Cloudinary not configured", {
        description: "Go to Settings → Cloudinary Integration to add your credentials.",
      });
      return;
    }
    setUploadingSlot(slot);
    try {
      const url = await uploadToCloudinary(
        file,
        settings.cloudinaryCloudName,
        settings.cloudinaryUploadPreset,
      );
      const imgs = [...(editing.images ?? [])];
      imgs[slot] = url;
      setEditing({ ...editing, images: imgs.filter(Boolean) });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed", { description: "Check your Cloudinary settings and try again." });
    } finally {
      setUploadingSlot(null);
    }
  };

  const removeImage = (slot: number) => {
    if (!editing) return;
    const imgs = [...(editing.images ?? [])];
    imgs.splice(slot, 1);
    setEditing({ ...editing, images: imgs });
  };

  const addFeature = () =>
    setEditing((e) => e && { ...e, features: [...(e.features ?? []), ""] });

  const updateFeature = (i: number, val: string) =>
    setEditing((e) => {
      if (!e) return e;
      const features = [...(e.features ?? [])];
      features[i] = val;
      return { ...e, features };
    });

  const removeFeature = (i: number) =>
    setEditing((e) => e && { ...e, features: (e.features ?? []).filter((_, j) => j !== i) });

  const addStep = () =>
    setEditing((e) => e && { ...e, process: [...(e.process ?? []), { title: "", desc: "" }] });

  const updateStep = (i: number, patch: Partial<ServiceProcess>) =>
    setEditing((e) => {
      if (!e) return e;
      const process = [...(e.process ?? [])];
      process[i] = { ...process[i], ...patch };
      return { ...e, process };
    });

  const removeStep = (i: number) =>
    setEditing((e) => e && { ...e, process: (e.process ?? []).filter((_, j) => j !== i) });

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const cleaned: Service = {
      ...editing,
      features: (editing.features ?? []).filter((f) => f.trim()),
      process: (editing.process ?? []).filter((p) => p.title.trim()),
      projectsCompleted: Number(editing.projectsCompleted) || 0,
    };
    if (cleaned.id) {
      persist(services.map((s) => (s.id === cleaned.id ? cleaned : s)));
      toast.success("Service updated");
    } else {
      persist([{ ...cleaned, id: crypto.randomUUID() }, ...services]);
      toast.success("Service created");
    }
    setOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    persist(services.filter((s) => s.id !== deleteId));
    toast.success("Service deleted");
    setDeleteId(null);
  };

  const slots = Array.from({ length: MAX_IMAGES });

  return (
    <div>
      <header className="h-20 border-b border-border bg-card flex items-center justify-between px-8">
        <div>
          <h1 className="font-display font-bold text-xl">Services</h1>
          <p className="text-xs text-muted-foreground">Manage your service catalog</p>
        </div>
        <Button
          onClick={startNew}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </header>

      <div className="p-8">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">Description</th>
                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-muted overflow-hidden shrink-0">
                        {s.images?.[0] && (
                          <img src={s.images[0]} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{s.title}</div>
                        {s.category && (
                          <div className="text-xs text-muted-foreground">{s.category}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell max-w-md truncate">
                    {s.desc}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">{s.date}</td>
                  <td className="px-6 py-4">
                    {s.featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent">
                        <Star className="h-3 w-3 fill-current" /> Featured
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(s)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(s.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editing?.id ? "Edit service" : "New service"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <form onSubmit={save} className="space-y-6">

              {/* Images */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">
                    Images
                    <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                      (up to {MAX_IMAGES} — first is primary)
                    </span>
                  </Label>
                  {!cloudinaryReady && (
                    <span className="text-xs text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                      Configure Cloudinary in Settings
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {slots.map((_, i) => (
                    <ImageSlot
                      key={i}
                      index={i}
                      url={editing.images?.[i]}
                      uploading={uploadingSlot === i}
                      onUpload={(file) => handleImageUpload(file, i)}
                      onRemove={() => removeImage(i)}
                    />
                  ))}
                </div>
                {(editing.images?.length ?? 0) > 0 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Upload className="h-3 w-3" />
                    {editing.images.length} of {MAX_IMAGES} image
                    {editing.images.length !== 1 ? "s" : ""} added
                  </p>
                )}
              </div>

              {/* Basic info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    placeholder="e.g. Commercial Construction"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g. Commercial, Industrial"
                    value={editing.category ?? ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  />
                </div>
              </div>

              {/* Short description */}
              <div className="space-y-2">
                <Label htmlFor="desc">Short description *</Label>
                <Textarea
                  id="desc"
                  required
                  rows={2}
                  className="resize-none"
                  placeholder="One or two sentences shown on the services listing…"
                  value={editing.desc}
                  onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                />
              </div>

              {/* Long description */}
              <div className="space-y-2">
                <Label htmlFor="longDesc">Full description</Label>
                <Textarea
                  id="longDesc"
                  rows={5}
                  className="resize-none"
                  placeholder="Detailed description shown on the service detail page…"
                  value={editing.longDesc ?? ""}
                  onChange={(e) => setEditing({ ...editing, longDesc: e.target.value })}
                />
              </div>

              {/* At-a-glance stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startingPrice">Starting price</Label>
                  <Input
                    id="startingPrice"
                    placeholder="e.g. From $500K"
                    value={editing.startingPrice ?? ""}
                    onChange={(e) => setEditing({ ...editing, startingPrice: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Typical duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g. 6–18 months"
                    value={editing.duration ?? ""}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectsCompleted">Projects completed</Label>
                  <Input
                    id="projectsCompleted"
                    type="number"
                    min={0}
                    placeholder="e.g. 47"
                    value={editing.projectsCompleted || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, projectsCompleted: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              {/* Key features */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Key features
                  <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                    (bullet list on the detail page)
                  </span>
                </Label>
                <div className="space-y-2">
                  {(editing.features ?? []).map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={f}
                        placeholder={`Feature ${i + 1}`}
                        onChange={(e) => updateFeature(i, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(i)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="mt-1"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add feature
                  </Button>
                </div>
              </div>

              {/* Process steps */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Process steps
                  <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                    ("How we work" section on the detail page)
                  </span>
                </Label>
                <div className="space-y-3">
                  {(editing.process ?? []).map((step, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-border bg-muted/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Step {i + 1}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeStep(i)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Step title"
                        value={step.title}
                        onChange={(e) => updateStep(i, { title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Step description"
                        rows={2}
                        className="resize-none"
                        value={step.desc}
                        onChange={(e) => updateStep(i, { desc: e.target.value })}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                    className="mt-1"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add step
                  </Button>
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div>
                  <Label htmlFor="featured" className="cursor-pointer font-semibold">
                    Featured service
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Highlighted on the homepage</p>
                </div>
                <Switch
                  id="featured"
                  checked={editing.featured ?? false}
                  onCheckedChange={(v) => setEditing({ ...editing, featured: v })}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploadingSlot !== null}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {editing.id ? "Save changes" : "Create service"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The service will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
