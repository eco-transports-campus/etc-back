const MODE         = 'debug',
      PORT         = 8737,
      cas          = require('connect-cas2'),
      express      = require('express'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      mongooseDB   = require('mongoose'),
      MemoryStore  = require('session-memory-store')(session);

mongooseDB.connect('mongodb://localhost/etc');
global.Mongoose = mongooseDB;
let base_URL = 'https://eco-transport-campus.firebaseapp.com/';
if(MODE == 'debug') {
    base_URL = "http://localhost:" + PORT;
}

let app = express();
app.use(session({
      name: 'NSESSIONID',
      secret: 'Hello I am a long long long secret',
      store: new MemoryStore()  // or other session store 
}));
  

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

var casClient = new cas({
      debug: false, // remove in production
      ignore: [   // path where no auth is required
          /\/$/, /\/index.html$/, /\/404.html$/, /\/api(\/*)?/
      ],
      match: [],
      servicePrefix: base_URL, // our site URL
      serverPath: 'https://sso.u-psud.fr',    // U-PSUD CAS base URL
      paths: {                                // U-PSUD CAS paths
          validate: '/cas/validate',
          serviceValidate: '/cas/serviceValidate',
          proxy: '/cas/proxy',
          login: '/cas/login',
          logout: '/cas/logout',
          proxyCallback: ''
      },
      redirect: false,
      gateway: false,
      renew: false,
      slo: true,
      cache: {
          enable: false,
          ttl: 5 * 60 * 1000,
          filter: []
      },
      fromAjax: {
          header: 'x-client-ajax',
          status: 418
      }
  });
  
app.use(casClient.core());


app.use(require(__dirname + '/routes'));
  

let server = require('http').Server(app);


console.log('Starting server on port ' + PORT);
server.listen(PORT);
