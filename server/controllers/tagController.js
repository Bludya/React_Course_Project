const Tag = require('../models/Tag');
const Question = require('../models/Question');

module.exports = {
  add: async (req, res) => {
    let tagNames = req.body;

    if(!tagNames || !Array.isArray(tagNames)){
      res.status(400)
        .json({error: 'No tags sent.'})
    }

    let createdTags = [];

    for(let tagName of tagNames){
      try{
        let tag = await Tag.findOne({'name': tagName.toLowerCase()}).exec();

        if(tag){
          continue;
        }

        tag = await Tag.create({'name': tagName.toLowerCase()});

        createdTags.push(tag);
      }catch(e){
        console.error(e);
      }
    }

    res.status(200)
      .json({createdTags})
  },
  findByName: (req, res) => {
    let name = req.params.name;

    Tag.findOne({'name':{ "$regex": name, "$options": "i" }})
      .then(tag => {
        res.status(200)
          .json(tag);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'});
      })
  },
  deleteByName: (req, res) => {
    let name = req.params.name;

    Tag.findOneAndDelete({'name':{ "$regex": name, "$options": "i" }})
      .then((tag) => {
        if(!tag){
          res.status(404)
            .hson({message: 'Tag not found.'})
            return;
        }

        Question.find({tags:tag._id})
          .then(questions => {
            for(let question of questions){
              question.tags.remove(tag._id);
              question.save();
            }
          })
          .catch(e => {
            console.error(e);
            res.status(500)
              .json({message: 'Server error.'})
          })

        res.status(200)
          .json({message: 'Tag deleted.'})
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'});
      })
  }
}
