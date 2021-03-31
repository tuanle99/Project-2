const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            created_by: req.session.user_id,
        });

        res.status(200).json(newTask);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, (req, res) => {
    // update a category by its `id` value
    Task.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((updatedTask) => res.json(updatedTask))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!taskData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
