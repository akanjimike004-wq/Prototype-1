import React from "react";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { Property } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export const AdminPanel = () => {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentProperty, setCurrentProperty] = React.useState<Partial<Property> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [newFeature, setNewFeature] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProperty) return;

    if (!currentProperty.images || currentProperty.images.length < 5) {
      alert("Please upload at least 5 images for this property.");
      return;
    }

    const method = currentProperty.id ? "PUT" : "POST";
    const url = currentProperty.id ? `/api/properties/${currentProperty.id}` : "/api/properties";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProperty),
      });

      if (res.ok) {
        fetchProperties();
        setIsEditing(false);
        setCurrentProperty(null);
      }
    } catch (err) {
      console.error("Failed to save property", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) fetchProperties();
    } catch (err) {
      console.error("Failed to delete property", err);
    }
  };

  const openEdit = (property: Property | null = null) => {
    setCurrentProperty(property || {
      title: "",
      price: 0,
      location: "",
      beds: 0,
      baths: 0,
      sqft: 0,
      type: "House",
      image: "",
      images: [],
      description: "",
      features: []
    });
    setIsEditing(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.urls) {
        const newImages = [...(currentProperty?.images || []), ...data.urls];
        setCurrentProperty({
          ...currentProperty,
          images: newImages,
          image: currentProperty?.image || data.urls[0]
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (!currentProperty?.images) return;
    const newImages = currentProperty.images.filter((_, i) => i !== index);
    setCurrentProperty({
      ...currentProperty,
      images: newImages,
      image: newImages[0] || ""
    });
  };

  const addFeature = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newFeature.trim()) {
      e.preventDefault();
      const features = [...(currentProperty?.features || []), newFeature.trim()];
      setCurrentProperty({ ...currentProperty, features });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const features = currentProperty?.features?.filter((_, i) => i !== index);
    setCurrentProperty({ ...currentProperty, features });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Admin Dashboard</h1>
            <p className="text-black/40 text-sm mt-1">Manage your luxury property portfolio</p>
          </div>
          <button
            onClick={() => openEdit()}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-black/80 transition-all shadow-xl shadow-black/10"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-black/40">Property</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-black/40">Location</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-black/40">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-black/40">Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-black/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <span className="font-bold text-sm">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-black/60">{p.location}</td>
                    <td className="px-6 py-4 text-sm font-bold">₦{(p.price / 1000000).toFixed(1)}M</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-black/5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 hover:bg-black/5 rounded-lg text-black/60 hover:text-black transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && currentProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{currentProperty.id ? "Edit Property" : "Add New Property"}</h2>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Title</label>
                    <input
                      required
                      value={currentProperty.title || ""}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, title: e.target.value })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                  </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-black/40">Price (₦)</label>
                      <input
                        required
                        type="number"
                        value={currentProperty.price || ""}
                        onChange={(e) => setCurrentProperty({ ...currentProperty, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                      />
                    </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Location</label>
                    <input
                      required
                      value={currentProperty.location || ""}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, location: e.target.value })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Type</label>
                    <div className="relative">
                      <input
                        list="property-types"
                        value={currentProperty.type || ""}
                        onChange={(e) => setCurrentProperty({ ...currentProperty, type: e.target.value })}
                        className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                        placeholder="Select or type a type..."
                      />
                      <datalist id="property-types">
                        <option value="House" />
                        <option value="Apartment" />
                        <option value="Villa" />
                        <option value="Penthouse" />
                        <option value="Duplex" />
                        <option value="Mansion" />
                        <option value="Terrace" />
                      </datalist>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Status</label>
                    <select
                      value={currentProperty.status || "Sale"}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, status: e.target.value as any })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    >
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Beds</label>
                    <input
                      type="number"
                      value={currentProperty.beds || ""}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, beds: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Baths</label>
                    <input
                      type="number"
                      value={currentProperty.baths || ""}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, baths: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Sqft</label>
                    <input
                      type="number"
                      value={currentProperty.sqft || ""}
                      onChange={(e) => setCurrentProperty({ ...currentProperty, sqft: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-black/40">Property Images (Min 5 recommended)</label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                      Upload Images
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {currentProperty.images?.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-black/5">
                        <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {(!currentProperty.images || currentProperty.images.length < 5) && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 text-black/20 hover:text-black/40 hover:border-black/20 transition-all"
                      >
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase">Add Photo</span>
                      </button>
                    )}
                  </div>
                  {currentProperty.images && currentProperty.images.length < 5 && (
                    <p className="text-[10px] text-red-400 font-medium italic">Please add at least {5 - currentProperty.images.length} more images to reach the minimum of 5.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black/40">Features (Press Enter to add)</label>
                  <div className="space-y-4">
                    <input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={addFeature}
                      placeholder="e.g. Swimming Pool, Gym, Smart Home"
                      className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all"
                    />
                    <div className="flex flex-wrap gap-2">
                      {currentProperty.features?.map((feature, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full"
                        >
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-black/40">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={currentProperty.description || ""}
                    onChange={(e) => setCurrentProperty({ ...currentProperty, description: e.target.value })}
                    className="w-full px-4 py-3 bg-black/5 border border-transparent focus:border-black/10 rounded-xl outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 text-sm font-bold text-black/60 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-black/80 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Property
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
