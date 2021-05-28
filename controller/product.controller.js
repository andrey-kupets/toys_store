const { productService } = require ( '../service' );

module.exports = {
  getProducts : async (req, res) => {
    const { query } = req;

    try {
      const products = await productService.findProducts(query);

      res.status(200).json(products);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },
};
