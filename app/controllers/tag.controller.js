import db from '../models';
const Tag = db.tags;
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    // Validate request
    console.log('req : ', req.body)
    if (!req.body.name) {
      res.status(400).send({
        message: "Tag can not be empty!"
      });
      return;
    }
  
    // Create a tag
    const tag = {
      name: req.body.name
    };
  
    // Save tag in the database
    Tag.create(tag)
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

// Retrieve all Tags from the database.
exports.findAll = (req, res) => {
  
    Tag.findAll({
        include: [
            {
                model: Tutorial,
                as: "tutorials",
                attributes: ["id", "title", "description"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tags."
        });
      });
};

// Find a single Tag with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tag.findByPk(id, { include: [{model: Tutorial, as: "tutorials"}] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id
      });
    });
};

exports.addTutorial = (req, res) => {
    const {tagId, tutorialId} = req.body;
    return Tag.findByPk(tagId)
      .then((tag) => {
        if (!tag) {
            res.status(400).send({
                message: "Tag can not be empty!"
            });
            return;
        }
        console.log("tag : ", tag)
        return Tutorial.findByPk(tutorialId).then((tutorial) => {
          if (!tutorial) {
            res.status(400).send({
                message: "Tutorial can not be empty!"
            });
            return;
          }
  
          tag.addTutorial(tutorial);
          console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
          res.send(tag);
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
};

// Update a Tag by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Tag.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tag was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tag with id=" + id
        });
      });
  };
  
  // Delete a Tag with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tag.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tag was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tag with id=" + id
        });
      });
  };
  
  // Delete all Tags from the database.
  exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tags were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tags."
        });
      });
  };