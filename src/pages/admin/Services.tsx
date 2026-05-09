import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Upload,
  ImagePlus,
  Loader2,
  GripVertical,
} from "lucide-react";
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
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/useServices";
import { useSettings } from "@/hooks/useSettings";
import { uploadToCloudinary } from "@/lib/store";
import type { Service, ServiceProcess } from "@/lib/type";

const MAX_IMAGES = 3;

type ImageSlotData = {
  existingUrl: string | null;
  pendingFile: File | null;
  previewUrl: string | null;
};

const emptySlots = (): ImageSlotData[] =>
  Array(MAX_IMAGES)
    .fill(null)
    .map(() => ({ existingUrl: null, pendingFile: null, previewUrl: null }));

function ImageSlot({
  displayUrl,
  isPending,
  index,
  disabled,
  onSelect,
  onRemove,
}: {
  displayUrl?: string;
  isPending?: boolean;
  index: number;
  disabled: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = "";
  };

  if (displayUrl) {
    return (
      <div className="relative group aspect-4/3 rounded-xl overflow-hidden border border-border bg-muted">
        <img src={displayUrl} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            className="h-9 w-9 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {index === 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur">
            Primary
          </div>
        )}
        {isPending && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500/90 text-white backdrop-blur">
            Pending
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
        disabled={disabled}
        className="aspect-4/3 rounded-xl border-2 border-dashed border-border hover:border-accent bg-muted/40 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ImagePlus className="h-6 w-6" />
        <span className="text-xs font-medium">
          {index === 0 ? "Add primary image" : `Add image ${index + 1}`}
        </span>
      </button>
    </>
  );
}

type EditingService = Omit<Service, "id"> & { id?: string };

export default function AdminServices() {
  const { data: services = [], isLoading } = useServices();
  const { data: settings } = useSettings();
  const { mutate: createService, isPending: creating } = useCreateService();
  const { mutate: updateService, isPending: updating } = useUpdateService();
  const { mutate: deleteService } = useDeleteService();

  const [editing, setEditing] = useState<EditingService | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageSlots, setImageSlots] = useState<ImageSlotData[]>(emptySlots());
  const [isUploading, setIsUploading] = useState(false);

  const isSaving = creating || updating || isUploading;
  const cloudinaryReady =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && settings?.cloudinaryUploadPreset;

  // Revoke object URLs when the dialog closes to avoid memory leaks
  useEffect(() => {
    if (!open) {
      setImageSlots((prev) => {
        prev.forEach((s) => s.previewUrl && URL.revokeObjectURL(s.previewUrl));
        return emptySlots();
      });
    }
  }, [open]);

  const startNew = () => {
    setImageSlots(emptySlots());
    setEditing({
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
    const slots = emptySlots();
    s.images?.forEach((url, i) => {
      if (i < MAX_IMAGES) slots[i].existingUrl = url;
    });
    setImageSlots(slots);
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

  const handleImageSelect = (file: File, slot: number) => {
    setImageSlots((prev) => {
      const next = [...prev];
      if (next[slot].previewUrl) URL.revokeObjectURL(next[slot].previewUrl!);
      next[slot] = { ...next[slot], pendingFile: file, previewUrl: URL.createObjectURL(file) };
      return next;
    });
  };

  const removeImage = (slot: number) => {
    setImageSlots((prev) => {
      const next = [...prev];
      if (next[slot].previewUrl) URL.revokeObjectURL(next[slot].previewUrl!);
      next[slot] = { existingUrl: null, pendingFile: null, previewUrl: null };
      return next;
    });
  };

  const addFeature = () => setEditing((e) => e && { ...e, features: [...(e.features ?? []), ""] });

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

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;

    const hasPending = imageSlots.some((s) => s.pendingFile !== null);
    if (hasPending && !cloudinaryReady) {
      toast.error("Cloudinary not configured", {
        description: "Go to Settings → Cloudinary Integration to add your credentials.",
      });
      return;
    }

    // Upload pending files and collect final image URLs
    let finalImages: string[] = [];
    if (hasPending) {
      setIsUploading(true);
      try {
        for (const slot of imageSlots) {
          if (slot.pendingFile) {
            const url = await uploadToCloudinary(
              slot.pendingFile,
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string,
              settings!.cloudinaryUploadPreset,
            );
            finalImages.push(url);
          } else if (slot.existingUrl) {
            finalImages.push(slot.existingUrl);
          }
        }
      } catch {
        toast.error("Image upload failed", {
          description: "Check your Cloudinary settings and try again.",
        });
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    } else {
      finalImages = imageSlots.map((s) => s.existingUrl).filter(Boolean) as string[];
    }

    const payload = {
      ...editing,
      images: finalImages,
      features: (editing.features ?? []).filter((f) => f.trim()),
      process: (editing.process ?? []).filter((p) => p.title.trim()),
      projectsCompleted: Number(editing.projectsCompleted) || 0,
    };

    if (editing.id) {
      updateService(
        { id: editing.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Service updated");
            setOpen(false);
          },
          onError: () => toast.error("Failed to update service"),
        },
      );
    } else {
      createService(payload, {
        onSuccess: () => {
          toast.success("Service created");
          setOpen(false);
        },
        onError: () => toast.error("Failed to create service"),
      });
    }
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteService(deleteId, {
      onSuccess: () => toast.success("Service deleted"),
      onError: () => toast.error("Failed to delete service"),
    });
    setDeleteId(null);
  };

  const filledSlotCount = imageSlots.filter((s) => s.previewUrl || s.existingUrl).length;

  return (
    <div>
      <header className="h-16 md:h-20 border-b border-border bg-card flex items-center justify-between px-4 sm:px-8">
        <div>
          <h1 className="font-display font-bold text-lg md:text-xl">Services</h1>
          <p className="text-xs text-muted-foreground">Manage your service catalog</p>
        </div>
        <Button
          onClick={startNew}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          size="sm"
        >
          <Plus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Add Service</span>
        </Button>
      </header>

      <div className="p-4 sm:p-8">
        <div className="bg-card border border-border rounded-xl overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">Service</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden xs:table-cell">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted overflow-hidden shrink-0">
                          {s.images?.[0] && (
                            <img src={s.images[0]} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate max-w-[120px] sm:max-w-none">
                            {s.title}
                          </div>
                          {s.category && (
                            <div className="text-xs text-muted-foreground truncate">
                              {s.category}
                            </div>
                          )}
                          {s.featured ? (
                            <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent sm:hidden">
                              <Star className="h-2.5 w-2.5 fill-current" /> Featured
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden md:table-cell max-w-md truncate">
                      {s.desc}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden lg:table-cell">
                      {s.date}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden xs:table-cell">
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
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
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
          )}
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
                  {imageSlots.map((slot, i) => (
                    <ImageSlot
                      key={i}
                      index={i}
                      displayUrl={slot.previewUrl ?? slot.existingUrl ?? undefined}
                      isPending={!!slot.pendingFile}
                      disabled={isSaving}
                      onSelect={(file) => handleImageSelect(file, i)}
                      onRemove={() => removeImage(i)}
                    />
                  ))}
                </div>
                {filledSlotCount > 0 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Upload className="h-3 w-3" />
                    {filledSlotCount} of {MAX_IMAGES} image
                    {filledSlotCount !== 1 ? "s" : ""} added
                    {imageSlots.some((s) => s.pendingFile) && (
                      <span className="text-amber-600">(will upload on save)</span>
                    )}
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
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Highlighted on the homepage
                  </p>
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
                  disabled={isSaving}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Uploading images…
                    </>
                  ) : creating || updating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Saving…
                    </>
                  ) : editing.id ? (
                    "Save changes"
                  ) : (
                    "Create service"
                  )}
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
