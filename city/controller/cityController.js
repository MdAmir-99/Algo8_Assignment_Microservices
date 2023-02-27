const cityModel = require( '../model/cityModel' );
const mongoose = require( 'mongoose' );
const ObjectId = mongoose.Types.ObjectId;


                        //<---------Get a specific City Document----------->

const getCity = async ( req, res ) =>
{

    try
    {
        const { cityID } = req.params;
        if ( !ObjectId.isValid( cityID ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid cityID !!' } )

        const cityDoc = await cityModel.aggregate( [
            { $match: { _id: ObjectId( cityID ) } }
        ] )

        if ( cityDoc.length == 0 )
            return res.status( 404 ).send( { status: false, message: "No City Found !!" } )
        // const cityDoc = await cityModel.findById( cityID )
        return res.status( 200 ).send( { status: true, data: cityDoc[ 0 ] } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}

                        //<---------Add a city----------->

const addCity = async ( req, res ) =>
{

    try
    {
        const data = req.body;
        if ( Object.keys( data ).length === 0 )
            return res.status( 400 ).send( { status: false, message: "Please Enter Mandetory Data !" } )

        const cityDoc = await cityModel.aggregate( [
            { $match: { name: data.name } }
        ] )

        if ( cityDoc.length > 0 )
            return res.status( 409 ).send( { status: false, message: `< ${ data.name } > is already exist in DB !!` } )

        await cityModel.create( data );

        return res.status( 201 ).send( { status: true, message: "City Data Added Successfully !" } )

    } catch ( error )
    {
        console.log( error )
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


                    //<------------Fetch Average of city------------->

const getAverage = async ( req, res ) =>
{
    try
    {
        const { cityID } = req.params;
        if ( !ObjectId.isValid( cityID ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid cityID !!' } );

        const pipeline = [
            { $match: { _id: ObjectId( cityID ) } },
            {
                $group: {
                    _id: "$name",
                    average: { $avg: "$population" }
                }
            }
        ]

        const cityAvg = await cityModel.aggregate( pipeline );

        return res.status( 200 ).send( { status: true, data: cityAvg } )


    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}

                    //<---------Get Top Cities----------->

const getTopCities = async ( req, res ) =>
{

    try
    {
        const pipeline = [
            { $sort: { population: -1 } },
            { $limit: 10 } ]

        const topCities = await cityModel.aggregate( pipeline )

        if ( !topCities.length )
        {
            return res.status( 404 ), send( { status: false, message: "No City Found !" } )
        }

        return res.status( 200 ).send( { status: true, data: topCities } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


                //<-----------Get Weather of the city------------>
const getWeather = async ( req, res ) =>
{
    try
    {
        const { cityID } = req.params;

        if ( !ObjectId.isValid( cityID ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid cityID !!' } );

        const cityWeatherDoc = await cityModel.aggregate( [
            { $match: { _id: ObjectId( cityID ) } },
            { $project: { _id: 0, name: 1, country: 1, weather: 1, } }
        ] )

        if ( cityWeatherDoc.length == 0 )
            return res.status( 404 ).send( { status: false, message: "Invalid CityID !!" } )

        return res.status( 200 ).send( { status: true, data: cityWeatherDoc[ 0 ] } );


    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


                //<-------------Fetch TransitProviders Details-------------->
const getTransitProvider = async ( req, res ) =>
{
    try
    {

        const { cityID } = req.params;

        if ( !ObjectId.isValid( cityID ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid cityID !!' } );

        const cityTransitProvider = await cityModel.aggregate( [
            { $match: { _id: ObjectId( cityID ) } },
            { $project: { _id: 0, name: 1, country: 1, transitProviders: 1, } }
        ] )

        if ( cityTransitProvider.length == 0 )
            return res.status( 404 ).send( { status: false, message: "Invalid CityID !!" } )

        return res.status( 200 ).send( { status: true, data: cityTransitProvider[ 0 ] } );

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


                    //<------------Add A TransitProvider-------------->
const addTransitProvider = async ( req, res ) =>
{
    try
    {
        const { cityID } = req.params;
        const data = req.body;

        if ( !ObjectId.isValid( cityID ) )
            return res.status( 400 ).send( { status: false, message: 'Invalid cityID !!' } );

        if ( Object.keys( data ).length === 0 )
            return res.status( 400 ).send( { status: false, message: "Please Enter Mandetory Data !" } )

        const doc = await cityModel.findOneAndUpdate(
            { _id: cityID },
            { $push: { transitProviders: data } }
        )

        return res.status( 200 ).send( { status: true, message: "transitProvider Added Successfully !!" } )

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}





module.exports = {
    getCity, addCity,
    getAverage, getTopCities,
    getWeather, getTransitProvider,
    addTransitProvider
};