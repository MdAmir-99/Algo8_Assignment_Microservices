const router = require( 'express' ).Router();
const { getCity, addCity,
    getAverage, getTopCities,
    getWeather, getTransitProvider,
    addTransitProvider } = require( '../controller/cityController' );


                            //<--------API Routes------------->
                            
router.get( '/city/:cityID', getCity )
    .get( '/city/:cityID/averages', getAverage )
    .get( '/topCities', getTopCities )
    .get( '/city/:cityID/weather', getWeather )
    .get( '/city/:cityID/transitProvders', getTransitProvider );

router.post( '/city', addCity )
    .post( '/city/:cityID/transitProvders', addTransitProvider );

router.all( '/*', ( req, res ) =>
{
    try
    {
        return res.status( 404 ).send( { status: false, message: 'Page not Found !' } )
    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
} )

module.exports = router;