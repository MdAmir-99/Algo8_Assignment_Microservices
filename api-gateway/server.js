const gateway = require( 'fast-gateway' );
const PORT = 5000;


const server = gateway( {
    routes: [
        {
            prefix: '/city',
            target: 'http://localhost:8080/'
        }
    ]
} )

server.start( PORT ).then( server => console.log( `API Gateway started @ http://localhost:${ PORT }` ) );