// This file we'll create routes that will facilitate asset creation and
// updates.

const authz = require('middleware/authorization');

module.exports = router => {
  // We'll respond to a POST request on the following route where the request
  // must have a valid ADMIN access token.
  router.post(
    '/api/v1/plugin/asset-manager-example',
    authz.needed('ADMIN'),
    async (req, res, next) => {
      // Get the graph context from the request.
      const { context } = req;

      // Grab from the graph context, the AssetModel that we can use to create
      // the new Asset. Lots of object destructuring here, but this lets us keep
      // the important business logic cleaner.
      const { connectors: { models: { Assets } } } = context;

      try {
        // Now we can create the asset that was passed to us in the body of the
        // request as JSON. Check the schema of the Asset model by looking at:
        // https://github.com/coralproject/talk/blob/master/models/asset.js
        await Assets.create(req.body);

        // Let your webhook callback know we got it!
        return res.status(204).end();
      } catch (err) {
        return next(err);
      }
    }
  );
};
