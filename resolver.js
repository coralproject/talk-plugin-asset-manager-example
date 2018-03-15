// We'll need to modify the behavior of how assets are
// "resolved" in Talk, so we override the base asset resolver
// for the RootQuery type.
module.exports = {
  RootQuery: {
    asset: async (root, args, ctx) => {
      // We'll grab the id of the asset being requested
      // such that we'll be able to lookup the asset.
      const { id } = args;
      if (!id) {
        // If the ID isn't provided, we don't want to do
        // anything.
        return null;
      }

      // A mouthful for sure, but we need to use the loader
      // that is available on the graph context in order to
      // lookup the asset by ID.
      const asset = await ctx.loaders.Assets.getByID.load(id);
      if (!asset) {
        // If the asset can't be found, we don't want to do
        // anything.
        return null;
      }

      // Send the asset back.
      return asset;
    },
  },
};
