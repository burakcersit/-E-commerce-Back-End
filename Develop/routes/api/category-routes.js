const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    attribute: ['id', 'category_name'],
    include: [{
            model: Product,
            attributes: [
             'id',
             'product_name', 
             'price', 
             'stock', 
             ]
        }
    ]
})
.then(data => {
  if(!data) {
    res.status(404).json({message: 'invalid DATA'});
    return;
  }
  res.json(data);
}) .catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});



// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    attribute: ['id', 'category_name'],
    include: 
      {
      model: Product,
      attribute: ['id', 'product_name', 'price', 'stock' ],
    }
  }).then(data => {
    if(!data) {
      res.status(404).json({message: 'Invalid Category, Please enter new category'});
      return;
    }
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

  // create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  }).then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name}, 
    {
      where: {
        id: req.params.id
    }
  }
  )
  .then(data => {
    if (!data){
      res.status(404).json({message: 'Invalid Category'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});



  // delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy(
    {
    where: {id: req.params.id}
  }
    )
    .then(data => {
      if (!data){
        res.status(404).json({message: 'Invalid Category'});
        return;
      }
      res.json(data);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});


//exports
module.exports = router;
