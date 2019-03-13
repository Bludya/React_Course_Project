const Question = require('../models/Question');
const Tag = require('../models/Tag');
const Answer = require('../models/Answer');
const User = require('../models/User');

async function addTags(tags){
  let tagIds = [];
  
  if(tags && Array.isArray(tags)){
    for(let tagName of tags){
      try{
        let tag = await Tag.findOne({name: tagName.toLowerCase()}).exec();

        if(tag){
          tagIds.push(tag);
          continue;
        }

        tag = await Tag.create({name: tagName.toLowerCase()});
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
    console.log(text);
    console.log(tags);

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
    .then((q)=>{
      User.findById(author)
        .then(user => {
          user.questions.push(q._id);
        });
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

      let author = req.token ? req.token.userId : null;
      console.log("Author is: " + author);
      answerBody.author = author;

      Question.findById(questionId)
      .then(q => {
        answerBody.question = q._id;
        Answer.create(answerBody)
          .then(a => {
            User.findById(author)
              .then(user => {
                if(user){
                  user.answers.push(a._id);
                  user.save();
                }
              });
            q.answers.push(a._id);
            q.save();
            res.status(200)
              .json({message: 'Answer added successfully.', answer: a});
          })
          .catch(e => {
              console.log(e);
                res.status(500)
                  .json({message: 'Answer not added.'})
          })
      })
      .catch(e => {
        console.log(e);
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

      Question.findOne(query).skip(random).populate('author tags')
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
  },
  getQuestionsByUser: (req, res) => {
    let userId = req.token ? req.token.userId : null;

    Question.find({'author': userId}).populate('author tags answers')
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
  getAnswersByQuestion: (req, res) => {
    let questionId = req.params.id;

    if(!questionId){
      res.status(404)
        .json({'message': 'No question Id given.'})
    }

    Answer.find({'question': questionId})
      .populate('author')
      .then(answers => {
        res.status(200)
          .json(answers);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  getAnswersByUser: (req, res) => {
    let userId = req.token ? req.token.userId : null;

    Answer.find({'author': userId})
      .then(answers => {
        res.status(200)
          .json(answers);
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  deleteAnswer: (req, res) => {
    let id = req.params.id;
    Answer.findOneAndDelete({'_id':id})
      .then((a) => {
        User.findById(a.author)
          .then(u =>{
            u.answers.remove(a._id);
            u.save();
          })
        Question.findById(a.question)
          .then(q =>{
            q.answers.remove(a._id);
            q.save();
          })
        res.json({'message': 'Answer ' + id + ' deleted successfully.'})
      })
      .catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  rateAnswer: (req, res) => {
    let answerId = req.params.id;
    let rate = req.body.rating;
    let userId = req.token ? req.token.userId : null;

    Answer.findById(answerId)
      .then(a => {
        if(!a){
          res.status(404)
            .json({message: 'Answer not found.'});
        }
        if(rate === 'up'){
          if(a.ups.indexOf(userId) < 0){
            a.downs.remove(userId);
            a.ups.push(userId);
          }
        }else {
          if(a.downs.indexOf(userId) < 0){
            a.downs.push(userId);
            a.ups.remove(userId);
          }
        }

        a.save();

        res.status(200)
          .json({message:'Answer rated.', answer: a});
      }).catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  rateQuestion: async (req, res) => {
    let questionId = req.params.id;
    let rate = req.body.rating;
    let userId = req.token ? req.token.userId : null;

    Question.findById(questionId).populate('author tags')
      .then(q => {
        if(!q){
          res.status(404)
            .json({message: 'Question not found.'});
        }

        if(rate === 'up'){
          if(q.ups.indexOf(userId) < 0){
           q.downs.remove(userId);
           q.ups.push(userId);
          }
        }else {
          if(q.downs.indexOf(userId) < 0){
            q.downs.push(userId);
            q.ups.remove(userId);
          }
        }


        q.save();

        res.status(200)
          .json({message:'Question rated.', question: q});
      }).catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  },
  approveQuestion: (req, res) => {
    let questionId = req.params.id;

    Question.findById(questionId)
      .then(q => {
        if(!q){
          res.status(404)
            .json({message: 'Question not found.'});
        }
        q.approved = true;
        q.save();

        res.status(200)
          .json({message:'Question aproved.', question: q});
      }).catch(e => {
        console.error(e);
        res.status(500)
          .json({message: 'Server error.'})
      })
  }
}
