const express = require( 'express' );
const mongoose = require( 'mongoose' );
const routes = require( './routes/cityRoute' );
const dotenv = require( 'dotenv' );


dotenv.config( { path: './config.env' } );

const app = express();
const PORT = 8080;

app.use( express.json() );


mongoose.set( 'strictQuery', false );

mongoose.connect( process.env.DB_CON, { useNewUrlParser: true } )
    .then( () => console.log( 'DB connected successfully !' ) )
    .catch( err => console.log( err ) )


app.use( '/', routes )

app.listen( PORT, ( req, res ) => console.log( `city service running @ http://localhost:${ PORT }` ) )