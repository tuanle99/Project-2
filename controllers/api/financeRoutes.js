const router = require('express').Router();
const { finance, Category, Tag, ProductTag } = require('../../models');

// The `/api/finance` endpoint

// get all family details like finance and subscription
router.get('/', async(req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const finances = await Finance.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(finances)
  } catch (err) {
    res.status(500).json(err)
  }
});

// get one subscription by month
router.get('/:id', async(req, res) => {
  // find a single child finance by its `id`
 
  try{
    const finance = await Finance.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });
    if(!finance){
      
      res.status(404).json({ message: "No finance info Found."})
      return;
    }
    res.status(200).json(finance)
  } catch (err) {
    res.status(500).json(err
      )
  }
});

// create new finance
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      finance_name: "Basketball",
      price: 50.00,
      subscription: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's finance tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(financeTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(finance);
    })
    .then((productTagIds) => res.status(200).json(financeTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update finance details
router.put('/:id', (req, res) => {
  // update finance data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((finance) => {
      // find all associated tags from ProductTag
      return FinanceTag.findAll({ where: { finance_id: req.params.id } });
    })
    .then((financeTags) => {
      // get list of current tag_ids
      const financeTagIds = financeTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !financeTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            finance_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const financeTagsToRemove = financeTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        FinanceTag.destroy({ where: { id: productTagsToRemove } }),
        FinanceTag.bulkCreate(newFinanceTags),
      ]);
    })
    .then((updatedFinanceTags) => res.json(updatedFinanceTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
