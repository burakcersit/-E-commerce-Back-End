const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
        {
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
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

  // find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: [
        'id',
        'product_name',
      'price',
      'stock',
    ]
    }
  }) .then(data => {
    if (!data) {
        res.status(404).json({ message: 'invalid tag with this is' });
        return;
    }
    res.json(data);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});



  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(data) {
      res.status(404).json({message: 'No Tag found with this id please try again'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if (!data) {
      res.status(404).json({message: 'No tag found with this id please try again'});
      return;
    }
    res.json(data);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
