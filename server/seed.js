require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Business = require('./models/Business');
const Listing = require('./models/Listing');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Business.deleteMany({});
        await Listing.deleteMany({});

        // Create a demo owner
        const owner = new User({
            name: 'Artisan Admin',
            email: 'admin@weaveconnect.com',
            password: 'password123',
            role: 'business_owner'
        });
        await owner.save();

        const businesses = [
            {
                ownerId: owner._id,
                name: 'Heritage Handlooms',
                category: 'Handloom Weaver',
                location: 'Varanasi, UP',
                description: 'Traditional silk sarees woven with love.',
                yearsActive: 25,
                logo: 'https://images.unsplash.com/photo-1610116303244-0402ca009973?q=80&w=200&h=200&auto=format&fit=crop'
            },
            {
                ownerId: owner._id,
                name: 'Sweet Crumb Bakery',
                category: 'Home Baker',
                location: 'Bangalore, KA',
                description: 'Freshly baked sourdough and cookies.',
                yearsActive: 3,
                logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&h=200&auto=format&fit=crop'
            },
            {
                ownerId: owner._id,
                name: 'Earth & Fire Pottery',
                category: 'Pottery Artisan',
                location: 'Jaipur, RJ',
                description: 'Handcrafted stoneware for modern homes.',
                yearsActive: 10,
                logo: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?q=80&w=200&h=200&auto=format&fit=crop'
            }
        ];

        for (const bData of businesses) {
            const business = new Business(bData);
            await business.save();

            // Create 4 listings for each
            for (let i = 1; i <= 4; i++) {
                await new Listing({
                    businessId: business._id,
                    title: `${bData.category} Item ${i}`,
                    description: `High quality handcrafted ${bData.category.toLowerCase()} product.`,
                    price: 500 + (i * 100),
                    images: ['https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400&h=400&auto=format&fit=crop'],
                    stock: 10
                }).save();
            }
        }

        console.log('Demo data seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
