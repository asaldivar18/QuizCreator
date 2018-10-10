const express = require('express');
const router = express.Router();

const Quiz = require('../../Public/Models/Quiz')

// @route GET api/quizzes
router.get('/', (req, res) => {
    Quiz.find()
        .then(items => {
            console.log(res.json(items))
        })
})

// @route POST api/quizzes
router.post('/', (req, res) => {
    Quiz.deleteMany({}).then(() => {
        req.body.forEach(obj => {
            var newQuiz = new Quiz(obj)
            newQuiz.save();
        });
    }).catch(err => { console.log(err) })
})

router.delete('/:id', (req, res) => {
    Quiz.findById(req.params.id)
        .then(quiz => quiz.remove().then(() => res.json({ success: true }))).catch(err => res.status(404).json({ success: false }))
})


module.exports = router;