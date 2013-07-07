module.exports = {
    production: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Youtaan'
      },
      db: 'mongodb://localhost/youtaan',
      facebook: {
          clientID: "218653468281618"
        , clientSecret: "e9ed96b98332b642807e217a3adaf84a"
        , callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
          clientID: "CONSUMER_KEY"
        , clientSecret: "CONSUMER_SECRET"
        , callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID'
        , clientSecret: 'APP_SECRET'
        , callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/google/callback"
      }
    }
  , test: {

    }
  , dev: {

    }
}
