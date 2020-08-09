import db from '../models';
const tag = db.tags;
const Tag = db.tags;

exports.create = (req, res) => {
    // Validate request
    console.log('req : ', req.body)
    if (!req.body.tag) {
      res.status(400).send({
        message: "Tag can not be empty!"
      });
      return;
    }
  
    // Create a tag
    const tag = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save tag in the database
    tag.create(tag)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the tag."
        });
      });
};