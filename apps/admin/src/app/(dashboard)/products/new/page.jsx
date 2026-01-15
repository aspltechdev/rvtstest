
'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Plus, X, Upload } from 'lucide-react';

export default function AddProductPage() {
    const { register, control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            name: '',
            slug: '',
            title: '',
            description: '',
            whyThisProduct: '',
            whatDoesItDo: '',
            features: [{ value: '' }],
            useCases: [{ value: '' }],
            // New fields
            sku: '',
            vesa: '',
            maxWeight: '',
            screenSize: '',
            adjustments: '',
            technicalDrawing: '',
            installationManual: '',
            technicalDataSheet: '',
            material: '',
            fusionUrl: '',
            certifications: []
        }
    });
    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "features" });
    const { fields: useCaseFields, append: appendUseCase, remove: removeUseCase } = useFieldArray({ control, name: "useCases" });

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Upload states for new files
    const [uploadingBlueprint, setUploadingBlueprint] = useState(false);
    const [uploadingManual, setUploadingManual] = useState(false);
    const [uploadingSheet, setUploadingSheet] = useState(false);

    const router = useRouter();

    const handleImageUpload = async (e) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            // Updated port to 3002
            const res = await axios.post('http://localhost:3002/api/upload', data);
            setImages(prev => [...prev, res.data.url]);
        } catch (err) {
            console.error("Upload failed");
            alert("Upload failed. Make sure backend is running on 3002.");
        } finally {
            setUploading(false);
        }
    };

    const handleFileUpload = async (e, fieldName, setLocalLoading) => {
        if (!e.target.files?.length) return;
        setLocalLoading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await axios.post('http://localhost:3002/api/upload', data);
            setValue(fieldName, res.data.url);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed.");
        } finally {
            setLocalLoading(false);
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            images,
            features: data.features.map((f) => f.value),
            useCases: data.useCases.map((u) => u.value),
            published: true // auto publish for now
        };

        try {
            // Updated port to 3002
            await axios.post('http://localhost:3002/api/products', payload);
            router.push('/dashboard');
        } catch (err) {
            console.error("Submission error", err);
            alert("Failed to save product");
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
            <header className="mb-10">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">New Product</h2>
                <p className="text-gray-500 dark:text-zinc-400">Add a new item to your catalog. All fields marked with * are required.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section 1: Basic Information */}
                        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-brand-red rounded-full"></span>
                                Basic Information
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Product Name <span className="text-red-500">*</span></label>
                                        <input
                                            {...register("name")}
                                            onChange={(e) => {
                                                setValue("name", e.target.value);
                                                const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                setValue("slug", slug);
                                            }}
                                            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg text-gray-900 dark:text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                                            placeholder="e.g. Touch Kiosk Pro"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Slug (Auto-generated)</label>
                                        <input
                                            {...register("slug")}
                                            className="w-full bg-gray-100 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg text-gray-500 dark:text-zinc-500 focus:outline-none cursor-not-allowed"
                                            placeholder="touch-kiosk-pro"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Hero Headline <span className="text-red-500">*</span></label>
                                    <input 
                                        {...register("title")} 
                                        className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg text-gray-900 dark:text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600" 
                                        placeholder="e.g. Revolutionary Interaction for Modern Spaces" 
                                        required 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Short Description <span className="text-red-500">*</span></label>
                                    <textarea 
                                        {...register("description")} 
                                        className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg text-gray-900 dark:text-white h-24 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-zinc-600" 
                                        placeholder="Brief overview explaining the core value..." 
                                        required 
                                    />
                                </div>
                            </div>
                        </section>

             
                        {/* Section 2: Detailed Content */}
                        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-brand-red rounded-full"></span>
                                Product Value
                            </h3>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Why This Product? <span className="text-red-500">*</span></label>
                                    <textarea 
                                        {...register("whyThisProduct")} 
                                        className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-4 rounded-lg text-gray-900 dark:text-white h-32 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600" 
                                        required 
                                        placeholder="Explain the USP and benefits..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">What Does It Do? <span className="text-red-500">*</span></label>
                                    <textarea 
                                        {...register("whatDoesItDo")} 
                                        className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-4 rounded-lg text-gray-900 dark:text-white h-32 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600" 
                                        required 
                                        placeholder="Describe the functionality..."
                                    />
                                </div>
                            </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <label className="block text-gray-700 dark:text-zinc-300 text-sm font-medium mb-3">Key Features</label>
                                    <div className="space-y-3">
                                        {featureFields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2 group">
                                                <input {...register(`features.${index}.value`)} className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2.5 rounded-lg text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none transition-all placeholder:text-gray-400" placeholder="Add a feature..." />
                                                <button type="button" onClick={() => removeFeature(index)} className="text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors p-2"><X size={18} /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => appendFeature({ value: '' })} className="flex items-center gap-2 text-brand-red text-sm font-bold hover:text-red-400 mt-2 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-brand-red/10 flex items-center justify-center border border-brand-red/20"><Plus size={14} /></div>
                                            Add Feature
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 dark:text-zinc-300 text-sm font-medium mb-3">Use Cases</label>
                                    <div className="space-y-3">
                                        {useCaseFields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2 group">
                                                <input {...register(`useCases.${index}.value`)} className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2.5 rounded-lg text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none transition-all placeholder:text-gray-400" placeholder="Add a use case..." />
                                                <button type="button" onClick={() => removeUseCase(index)} className="text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors p-2"><X size={18} /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => appendUseCase({ value: '' })} className="flex items-center gap-2 text-brand-red text-sm font-bold hover:text-red-400 mt-2 transition-colors">
                                           <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-brand-red/10 flex items-center justify-center border border-brand-red/20"><Plus size={14} /></div>
                                           Add Use Case
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Specs & Media */}
                    <div className="space-y-8">

                        {/* Category */}
                        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium mb-2 block">Category <span className="text-red-500">*</span></label>
                            <select {...register("category")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg text-gray-900 dark:text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all" required>
                                <option value="">Select Category</option>
                                <option value="Displays & video walls">Displays & video walls</option>
                                <option value="Control system">Control system</option>
                                <option value="Video systems">Video systems</option>
                                <option value="Touch screen Kiosk">Touch screen Kiosk</option>
                                <option value="Mounting solutions">Mounting solutions</option>
                                <option value="PTX/Soundbars/Mobile trolley">PTX/Soundbars/Mobile trolley</option>
                                <option value="Cables and accessories">Cables and accessories</option>
                            </select>
                        </section>

                        {/* Technical Specs */}
                        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-gray-300 dark:bg-zinc-600 rounded-full"></span>
                                Tech Specs
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">SKU / Model</label>
                                    <input {...register("sku")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="e.g. RV-100X" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">VESA</label>
                                        <input {...register("vesa")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="e.g. 400x400" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">Max Weight</label>
                                        <input {...register("maxWeight")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="e.g. 50kg" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">Screen Size</label>
                                    <input {...register("screenSize")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="e.g. 32-65 inches" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">Material</label>
                                    <input {...register("material")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="e.g. Steel" />
                                </div>

                                <div className="pt-2">
                                    <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold block mb-2">Certifications</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["CE", "RoHS", "UL", "TUV"].map((cert) => (
                                            <label key={cert} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 cursor-pointer hover:border-brand-red transition-colors">
                                                <input 
                                                    type="checkbox" 
                                                    value={cert} 
                                                    {...register("certifications")} 
                                                    className="w-3 h-3 rounded border-gray-400 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-brand-red focus:ring-brand-red"
                                                />
                                                <span className="text-gray-600 dark:text-zinc-300 text-xs font-bold">{cert}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Media Uploads */}
                        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-gray-300 dark:bg-zinc-600 rounded-full"></span>
                                Media & Files
                            </h3>
                            
                            <div className="space-y-5">
                                {/* Gallery */}
                                <div className="space-y-2">
                                    <label className="text-gray-700 dark:text-zinc-300 text-sm font-medium">Images</label>
                                    <div className="grid grid-cols-3 gap-2">
                                         {images.map((url, i) => (
                                            <div key={i} className="relative aspect-square border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden group">
                                                <img src={url} alt="Uploaded" className="object-cover w-full h-full" />
                                                <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X size={20} className="text-white" />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:bg-red-50 dark:hover:bg-brand-red/5 transition-all text-gray-500 dark:text-zinc-500 hover:text-brand-red">
                                            <Upload size={20} className="mb-1" />
                                            <span className="text-[10px] font-bold uppercase">{uploading ? '...' : 'Add'}</span>
                                            <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                                        </label>
                                    </div>
                                </div>

                                {/* Files */}
                                <div className="space-y-3">
                                    {/* Blueprint */}
                                    <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-bold">Blueprint</label>
                                            {watch('technicalDrawing') && <button type="button" onClick={() => setValue('technicalDrawing', '')} className="text-red-500 hover:text-red-400"><X size={14}/></button>}
                                        </div>
                                        {watch('technicalDrawing') ? (
                                            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded text-xs flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Uploaded
                                            </div>
                                        ) : (
                                            <label className="block text-center py-3 border border-dashed border-gray-300 dark:border-zinc-700 rounded cursor-pointer hover:border-gray-400 dark:hover:border-zinc-500 text-gray-500 dark:text-zinc-500 text-xs">
                                                {uploadingBlueprint ? 'Uploading...' : 'Click to Upload'}
                                                <input type="file" onChange={(e) => handleFileUpload(e, 'technicalDrawing', setUploadingBlueprint)} className="hidden" accept="image/*" />
                                            </label>
                                        )}
                                    </div>

                                    {/* Manual */}
                                    <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-bold">Install Manual</label>
                                            {watch('installationManual') && <button type="button" onClick={() => setValue('installationManual', '')} className="text-red-500 hover:text-red-400"><X size={14}/></button>}
                                        </div>
                                         {watch('installationManual') ? (
                                            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded text-xs flex items-center gap-2 truncate">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"/> DOC Ready
                                            </div>
                                        ) : (
                                            <label className="block text-center py-3 border border-dashed border-gray-300 dark:border-zinc-700 rounded cursor-pointer hover:border-gray-400 dark:hover:border-zinc-500 text-gray-500 dark:text-zinc-500 text-xs">
                                                 {uploadingManual ? 'Uploading...' : 'Click to Upload PDF'}
                                                <input type="file" onChange={(e) => handleFileUpload(e, 'installationManual', setUploadingManual)} className="hidden" accept=".pdf" />
                                            </label>
                                        )}
                                    </div>

                                    {/* Data Sheet */}
                                    <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-200 dark:border-zinc-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs text-gray-500 dark:text-zinc-400 uppercase font-bold">Data Sheet</label>
                                            {watch('technicalDataSheet') && <button type="button" onClick={() => setValue('technicalDataSheet', '')} className="text-red-500 hover:text-red-400"><X size={14}/></button>}
                                        </div>
                                         {watch('technicalDataSheet') ? (
                                            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded text-xs flex items-center gap-2 truncate">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"/> DOC Ready
                                            </div>
                                        ) : (
                                            <label className="block text-center py-3 border border-dashed border-gray-300 dark:border-zinc-700 rounded cursor-pointer hover:border-gray-400 dark:hover:border-zinc-500 text-gray-500 dark:text-zinc-500 text-xs">
                                                {uploadingSheet ? 'Uploading...' : 'Click to Upload PDF'}
                                                <input type="file" onChange={(e) => handleFileUpload(e, 'technicalDataSheet', setUploadingSheet)} className="hidden" accept=".pdf" />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1 pt-2">
                                    <label className="text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold">Fusion 3D URL</label>
                                    <input {...register("fusionUrl")} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 p-2 rounded text-gray-900 dark:text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-400" placeholder="https://a360.co/..." />
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 mt-8 flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 rounded-lg bg-brand-red text-white font-bold shadow-lg shadow-brand-red/20 hover:bg-red-600 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300">
                        Publish Product
                    </button>
                </div>

            </form>
        </div>
    );
}
