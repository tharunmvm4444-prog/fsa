import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Explore = () => {
    const [businesses, setBusinesses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/businesses');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };
        fetchBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter(b =>
        (category === 'All' || b.category === category) &&
        (b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const categories = ['All', 'Handloom Weaver', 'Home Baker', 'Pottery Artisan'];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-12 bg-primary/5 rounded-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Local Mastery</h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Support talented artisans and small businesses directly. No middlemen, just authentic craftsmanship.
                </p>
            </section>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search businesses or locations..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-primary text-white shadow-soft' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Business Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((b, idx) => (
                    <motion.div
                        key={b._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card group cursor-pointer"
                    >
                        <Link to={`/business/${b._id}`}>
                            <div className="relative mb-4 overflow-hidden rounded-2xl aspect-video bg-primary/10">
                                <img
                                    src={b.logo || 'https://via.placeholder.com/400x225?text=Artisan+Store'}
                                    alt={b.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                    {b.category}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{b.name}</h3>
                            <div className="flex items-center text-slate-500 text-sm gap-1 mb-3">
                                <MapPin className="w-4 h-4" />
                                {b.location}
                            </div>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                {b.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-top border-slate-50">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {b.followersCount} Followers
                                </span>
                                <span className="text-primary font-bold text-sm">View Channel →</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
