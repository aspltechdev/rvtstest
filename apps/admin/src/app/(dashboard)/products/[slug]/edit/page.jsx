'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Plus, X, Upload, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }) {
    const { register, control, handleSubmit, setValue, reset, watch } = useForm({
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
            certifications: [],
            fusionUrl: ''
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

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch existing data
    useEffect(() => {
        axios.get(`http://localhost:3002/api/products/${params.slug}`)
            .then(res => {
                const p = res.data;
                reset({
                    name: p.name,
                    slug: p.slug,
                    title: p.title,
                    description: p.description,
                    category: p.category || '',
                    whyThisProduct: p.whyThisProduct,
                    whatDoesItDo: p.whatDoesItDo,
                    features: p.features.map(f => ({ value: f })),
                    useCases: p.useCases.map(u => ({ value: u })),
                    sku: p.sku || '',
                    vesa: p.vesa || '',
                    maxWeight: p.maxWeight || '',
                    screenSize: p.screenSize || '',
                    adjustments: p.adjustments || '',
                    technicalDrawing: p.technicalDrawing || '',
                    installationManual: p.installationManual || '',
                    technicalDataSheet: p.technicalDataSheet || '',
                    material: p.material || '',
                    certifications: p.certifications || [],
                    fusionUrl: p.fusionUrl || ''
                });
                setImages(p.images);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to load product");
                router.push('/dashboard');
            })
            .finally(() => setLoading(false));
    }, [params.slug, reset, router]);


    const handleImageUpload = async (e) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
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
            published: true
        };

        try {
            await axios.put(`http://localhost:3002/api/products/${params.slug}`, payload);
            router.push('/dashboard');
        } catch (err) {
            console.error("Submission error", err);
            alert("Failed to update product (Backend might need UPDATE endpoint)");
        }
    };

    if (loading) return <div className="p-8 text-white">Loading product data...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/dashboard" className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h2 className="text-3xl font-bold text-white">Edit Product</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm font-medium">Product Name</label>
                        <input
                            {...register("name")}
                            className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all"
                            placeholder="e.g. Touch Kiosk Pro"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm font-medium">Slug (URL)</label>
                        <input
                            {...register("slug")}
                            className="w-full bg-zinc-900/30 border border-zinc-800 p-3 rounded-lg text-zinc-500 cursor-not-allowed"
                            readOnly
                            title="Slug cannot be changed after creation to avoid breaking links"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-medium">Title (Hero Headline)</label>
                    <input {...register("title")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none" required />
                </div>

                <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-medium">Short Description</label>
                    <textarea {...register("description")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white h-24 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none" required />
                </div>

                {/* Technical Specs */}
                <div className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-white font-bold mb-4 text-lg">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm">SKU / Model Number</label>
                            <input {...register("sku")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. RV-100X" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm">VESA Compatibility</label>
                            <input {...register("vesa")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. 400x400" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm">Max Weight Capacity</label>
                            <input {...register("maxWeight")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. 50kg" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm">Screen Size Range</label>
                            <input {...register("screenSize")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. 32-65 inches" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm">Adjustment Angles</label>
                            <input {...register("adjustments")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. Tilt +/- 15, Swivel 360" />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                         <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Construction Material</label>
                            <input {...register("material")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. Cold-rolled steel" />
                        </div>
                         <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium block mb-2">Certifications</label>
                             <div className="flex flex-wrap gap-4">
                                {["CE", "RoHS", "UL", "TUV"].map((cert) => (
                                    <label key={cert} className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            value={cert} 
                                            {...register("certifications")} 
                                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-brand-red focus:ring-brand-red"
                                        />
                                        <span className="text-zinc-300 text-sm">{cert}</span>
                                    </label>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Visuals & Downloads */}
                <div className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-white font-bold mb-4 text-lg">Visuals & Downloads <span className="text-zinc-500 text-sm font-normal ml-2">(Optional)</span></h3>
                    <p className="text-xs text-zinc-500 mb-6 font-medium">Images will be automatically compressed/optimized. PDFs are stored as-is.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Product Gallery (Moved here) */}
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm block">Product Gallery</label>
                            <div className="w-full min-h-[8rem] border border-zinc-700 rounded-lg p-3 flex flex-wrap gap-3 bg-black/40 items-start content-start">
                                {images.map((url, i) => (
                                    <div key={i} className="relative w-20 h-20 border border-zinc-700 rounded-md overflow-hidden group">
                                        <img src={url} alt="Uploaded" className="object-cover w-full h-full" />
                                        <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-0.5 right-0.5 bg-red-600/90 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-20 h-20 border-2 border-dashed border-zinc-700 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:text-brand-red text-zinc-500 transition-all bg-black/20 hover:bg-brand-red/5">
                                    <Upload size={16} className="mb-1" />
                                    <span className="text-[10px] font-medium">{uploading ? '...' : 'Add'}</span>
                                    <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* Technical Drawing */}
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm block">Technical Drawing (Blueprint)</label>
                            <div className="flex items-center gap-3">
                                {watch('technicalDrawing') ? (
                                    <div className="relative w-full h-32 border border-zinc-700 rounded-lg overflow-hidden group bg-black/40">
                                        <img src={watch('technicalDrawing')} alt="Blueprint" className="object-contain w-full h-full" />
                                        <button type="button" onClick={() => setValue('technicalDrawing', '')} className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-1 opacity-100 transition-opacity">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:text-brand-red text-zinc-500 transition-colors bg-black/40">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-medium">{uploadingBlueprint ? 'Uploading...' : 'Upload Blueprint'}</span>
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'technicalDrawing', setUploadingBlueprint)} className="hidden" accept="image/*" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Installation Manual */}
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm block">Installation Manual (PDF)</label>
                            <div className="flex items-center gap-3">
                                {watch('installationManual') ? (
                                    <div className="w-full h-32 border border-zinc-700 rounded-lg flex flex-col items-center justify-center bg-black/40 text-green-500 p-2 relative">
                                        <span className="text-xs break-all text-center">{watch('installationManual').split('/').pop()}</span>
                                        <button type="button" onClick={() => setValue('installationManual', '')} className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-1 opacity-100 transition-opacity">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:text-brand-red text-zinc-500 transition-colors bg-black/40">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-medium">{uploadingManual ? 'Uploading...' : 'Upload PDF'}</span>
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'installationManual', setUploadingManual)} className="hidden" accept=".pdf" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Technical Data Sheet */}
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm block">Technical Data Sheet (PDF)</label>
                            <div className="flex items-center gap-3">
                                {watch('technicalDataSheet') ? (
                                    <div className="w-full h-32 border border-zinc-700 rounded-lg flex flex-col items-center justify-center bg-black/40 text-green-500 p-2 relative">
                                        <span className="text-xs break-all text-center">{watch('technicalDataSheet').split('/').pop()}</span>
                                        <button type="button" onClick={() => setValue('technicalDataSheet', '')} className="absolute top-1 right-1 bg-red-600/90 text-white rounded-full p-1 opacity-100 transition-opacity">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-red hover:text-brand-red text-zinc-500 transition-colors bg-black/40">
                                        <Upload size={24} className="mb-2" />
                                        <span className="text-xs font-medium">{uploadingSheet ? 'Uploading...' : 'Upload PDF'}</span>
                                        <input type="file" onChange={(e) => handleFileUpload(e, 'technicalDataSheet', setUploadingSheet)} className="hidden" accept=".pdf" />
                                    </label>
                                )}
                            </div>
                        </div>

                    </div>

                   <div className="mt-6 space-y-2">
                        <label className="text-zinc-400 text-sm font-medium">Fusion 3D URL</label>
                        <input {...register("fusionUrl")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:outline-none" placeholder="e.g. https://a360.co/..." />
                   </div>
                </div>

                {/* Rich Content */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Category</label>
                            <select {...register("category")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none" required>
                                <option value="">Select a category...</option>
                                <option value="Displays & video walls">Displays & video walls</option>
                                <option value="Control system">Control system</option>
                                <option value="Video systems">Video systems</option>
                                <option value="Touch screen Kiosk">Touch screen Kiosk</option>
                                <option value="Mounting solutions">Mounting solutions</option>
                                <option value="PTX/Soundbars/Mobile trolley">PTX/Soundbars/Mobile trolley</option>
                                <option value="Cables and accessories">Cables and accessories</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-zinc-400 text-sm font-medium">Why This Product?</label>
                            <textarea {...register("whyThisProduct")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white h-32 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-zinc-400 text-sm font-medium">What Does It Do?</label>
                        <textarea {...register("whatDoesItDo")} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 rounded-lg text-white h-32 focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none" />
                    </div>
                </div>

                {/* Dynamic Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-zinc-900/30 p-5 rounded-xl border border-zinc-800/50">
                        <label className="block text-zinc-400 text-sm font-bold mb-4 uppercase tracking-wider">Features</label>
                        <div className="space-y-3">
                            {featureFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <input {...register(`features.${index}.value`)} className="flex-1 bg-black/50 border border-zinc-700 p-2.5 rounded-lg text-white text-sm focus:border-brand-red focus:outline-none" />
                                    <button type="button" onClick={() => removeFeature(index)} className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-zinc-800 rounded"><X size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => appendFeature({ value: '' })} className="flex items-center gap-2 text-brand-red text-sm mt-4 hover:bg-brand-red/10 px-4 py-2 rounded-lg transition-colors font-medium w-full justify-center border border-brand-red/20 border-dashed"><Plus size={16} /> Add Feature</button>
                    </div>

                    <div className="bg-zinc-900/30 p-5 rounded-xl border border-zinc-800/50">
                        <label className="block text-zinc-400 text-sm font-bold mb-4 uppercase tracking-wider">Use Cases</label>
                        <div className="space-y-3">
                            {useCaseFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <input {...register(`useCases.${index}.value`)} className="flex-1 bg-black/50 border border-zinc-700 p-2.5 rounded-lg text-white text-sm focus:border-brand-red focus:outline-none" />
                                    <button type="button" onClick={() => removeUseCase(index)} className="text-zinc-500 hover:text-red-500 transition-colors p-2 hover:bg-zinc-800 rounded"><X size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => appendUseCase({ value: '' })} className="flex items-center gap-2 text-brand-red text-sm mt-4 hover:bg-brand-red/10 px-4 py-2 rounded-lg transition-colors font-medium w-full justify-center border border-brand-red/20 border-dashed"><Plus size={16} /> Add Use Case</button>
                    </div>
                </div>

                <div className="pt-8 flex justify-end">
                    <button type="submit" className="bg-brand-red text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-brand-red/25 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3">
                        <Save size={20} />
                        SAVE CHANGES
                    </button>
                </div>

            </form>
        </div>
    )
}
