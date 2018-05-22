module.exports = {
  session: {
    secret: 'bziondik', // secret for app session
    name: 'Training Project', // name of the app session
    ttl: 30 * 24 * 60 * 60, // store sessions for a month,
    touchAfter: 24 * 3600, // re-save sessions every 24 hours
  },
  database: 'mongodb://root:12345@ds227110.mlab.com:27110/tp',
};
