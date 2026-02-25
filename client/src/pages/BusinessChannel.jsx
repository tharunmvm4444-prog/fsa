import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Star, Calendar, ShoppingBag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BusinessChannel = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bizRes, listingsRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/businesses/${id}`),
                    axios.get(`http://localhost:5001/api/listings/business/${id}`)
                ]);
                setBusiness(bizRes.data);
                setListings(listingsRes.data);
            } catch (error) {
                console.error('Error fetching business details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="text-center py-20 font-medium text-slate-500">Loading Masterpiece...</div>;
    if (!business) return <div className="text-center py-20">Business not found.</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {/* Channel Header */}
            <section className="relative">
                <div className="h-48 md:h-64 bg-primary/10 rounded-3xl overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1200&h=400&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30 grayscale"
                        alt="header background"
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 -mt-16 md:-mt-20 px-8">
                    <img
                        src={business.logo || 'https://via.placeholder.com/150'}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white shadow-lg object-cover bg-white"
                        alt={business.name}
                    />
                    <div className="text-center md:text-left pt-4 md:pt-16 space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold">{business.name}</h1>
                            {business.verified && <CheckCircle className="text-primary w-6 h-6 fill-primary/10" />}
                        </div>
                        <p className="text-slate-600 font-medium italic">{business.category}</p>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {business.location}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {business.yearsActive}+ Years Active</span>
                            <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {business.ratings.average || 'New'}</span>
                        </div>
                    </div>
                    <div className="md:ml-auto pt-4 md:pt-20">
                        <button className="btn-primary flex items-center gap-2">
                            Follow Channel
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* About Section */}
                <section className="lg:col-span-1 space-y-6">
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">About the Artisan</h2>
                        <p className="text-slate-600 leading-relaxed italic">
                            {business.description}
                        </p>
                        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Subscriber Count</span>
                            <span className="font-bold text-slate-700">{business.followersCount} Followers</span>
                        </div>
                    </div>
                </section>

                {/* Listings Section */}
                <section className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Latest Pieces</h2>
                        <span className="text-slate-400 text-sm font-medium">{listings.length} items available</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {listings.map((item, idx) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-primary/5">
                                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-xl font-bold text-primary">₹{item.price}</div>
                                    <button className="flex items-center gap-2 text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:bg-primary/10 hover:text-primary transition-all">
                                        <ShoppingBag className="w-4 h-4" />
                                        Buy Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BusinessChannel;
