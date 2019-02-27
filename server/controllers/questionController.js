const Question = require('../models/Question');
const Tag = require('../models/Tag');


async function addTags(tags){
  let tagIds = [];

  if(tags && Array.isArray(tags)){
    for(let tagName in tags){
      try{
        let tag = await Tag.findOne({name: tagName.toLowerCase()}).exec();

        if(tag){
          tagIds.push(tag);
          continue;
        }

        tag = await Tag.create({name: tagName.toLowerCase()}).exec();
        tagIds.push(tag);
      }catch(e){
        console.error(e);
      }
    }
  }

  return tagIds;
}

module.exports = {
  postQuestion: async (req, res) => {
    let {text, tags} = req.body;

    if(!text || text.length < 3){
      res.status(400)
        .json({message: "The question should be at least 3 symbols long."});
        return;
    }

    let question = await Question.findOne({text}).exec();

    if(question){
      res.status(400)
        .json({message: "The question already exists"});
        return;
    }

    let tagIds = await addTags(tags);

    let author = req.token ? req.token.userId : null;

    Question.create({
      text,
      tags: tagIds,
      author
    })
    .then(()=>{
      res.status(200)
        .json({message: 'Question added.'});
    })
    .catch(e => {
      console.error(e);
      res.status(500)
        .json({message: 'Question not added.'});
    })
  },
  editQuestion: async (req, res) => {
    let questionId = req.params.id;
    let questionBody = req.body;

    if(!questionId){
      res.status(400)
        .json({message: 'No id found.'})
    }

    Question.findOneAndUpdate(questionId, questionBody)
      .then(() => {
        res.status(200)
             .json({message: 'Question edited.'});
      })
      .catch(e => {
          res.status(500)
            .json({message: 'Question not edited.'})
      })
  },
  postAnswer: async (req, res) => {
      let questionId = req.params.id;
      let answerBody = req.body;

      if(!questionId){
        res.status(400)
          .json({message: 'No id found.'})
      }

      if(!answerBody){
        res.status(400)
          .json({message: 'No answer found.'})
      }

      Question.findById(questionId)
      .then(q => {
        Answer.create(answerBody)
          .then(a => {
            //TODO: Add user


            q.answers.push(a._id);

          })
      })
      .catch(e => {
          res.status(500)
            .json({message: 'Answer not added.'})
      })
  },
  getOneById: async (req, res) => {
    let id = req.params.id;

    if(!id){
      res.status(400)
        .json({message: 'No id found.'})
    }

    let question = await Question.findById(id).exec();

    if(question){
      res.status(200)
        .json(question);
    }
    else {
        res.status(400)
          .json({message: 'No id found.'});
      }
  },
  getRandomQuestion: async (req, res) => {
    let tagName = req.query.tag;
    let tag;

    if(tagName){
        tag = await Tag.findOne({name: tagName.toLowerCase()}).exec();


      if(!tag){
        res.status(404)
          .json({message: 'No question with that tag.'});
          return;
      }
    }

    let query = {approved: true};

    if(tag){
      query.tags = tag._id;
    }

    Question.countDocuments(query).exec((err, count) => {
      let random = Math.floor(Math.random() * count)

      Question.findOne(query).skip(random).populate('author tags answers')
        .then(q => {

          res.status(200)
            .json({question: q});
        })
        .catch(e=>{
          console.error(e);
          res.status(500)
            .json({message: 'error'})
        })
    })
  },
  getAllUnapproved: (req, res) => {
    Question.find({approved: false})
      .then(questions => {
        res.status(200)
          .json(questions);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  getByTag: async (req, res) => {
    let tagName = req.params.tag.toLowerCase();

    let tag = await Tag.findOne({name: tagName}).exec();

    if(!tag){
      res.status(200)
        .json();
        return;
    }

    Question.find({tags:tag._id})
      .then(questions => {
        res.status(200)
          .json(questions);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  getByText: (req, res) => {
    let text = req.params.text;

    Question.find({'text':{ "$regex": text, "$options": "i" }})
      .then(questions => {
        res.status(200)
          .json(questions);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  }
}
