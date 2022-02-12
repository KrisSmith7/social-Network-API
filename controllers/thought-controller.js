// /api/thoughts
const {Thought, Reaction} = require ('../models')

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        // .populate({
        //   path: 'comments',
        //   select: '-__v'
        // })
        // .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        // .populate({
        //   path: 'comments',
        //   select: '-__v'
        // })
        // .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createThought
    createThought({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
  
    // update thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // delete thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
  };
  
  module.exports = thoughtController;
  