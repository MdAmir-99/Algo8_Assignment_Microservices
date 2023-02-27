const mongoose = require( 'mongoose' );

const citySchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    transitProviders: [
        {
            name: {
                type: String,
                required: true
            },
            website: {
                type: String,
                required: true
            }
        }
    ],
    weather: {
        temperature: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
} );


module.exports = mongoose.model( 'City', citySchema );

