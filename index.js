// This is the entrypoint to our plugin.

// We will import the pieces of the plugin that we are using so we can export
// them with the right field names. See the
// https://docs.coralproject.net/talk/reference/server/ for the plugin api for
// the server.
const resolver = require('./resolver');
const router = require('./router');

module.exports = { resolver, router };
