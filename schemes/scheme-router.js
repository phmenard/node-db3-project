const express = require('express');
const { orWhereNotExists } = require('../data/config.js');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const schemes = await Schemes.find()
    res.json(schemes)
  } catch (err) {
    //res.status(500).json({ message: 'Failed to get schemes' });
    next(err)
  }

});

router.get('/:id', async (req, res, next) => {
  try {
    const scheme = await Schemes.findById(req.params.id)
    res.status(200).json(scheme)
  } catch (err) {
    //res.status(404).json({ message: 'Could not find scheme with given id.' })
    next(err)
  }

});

router.get('/:id/steps', async (req, res, next) => {
  try {
    const steps = await Schemes.findSteps(req.params.id)
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })

    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
    //next(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const schemeData = req.body;
    const id = await Schemes.add(schemeData)
    const scheme = await Schemes.findById(id)
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new scheme' });
    //next(err)
  }
});

router.post('/:id/steps', async (req, res, next) => {
  try {
    const stepData = req.body;
    const { id } = req.params;

    const scheme = await Schemes.findById(id)
    if (scheme) {

      const step = {
        step_number: stepData.step_number,
        instructions: stepData.instructions,
        scheme_id: id
      }

      const newStep = await Schemes.addStep(step)
      res.status(201).json(newStep);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new step' });
    next(err)
  }

});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const scheme = await Schemes.findById(id)
    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id)
      res.json(updatedScheme);

    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update scheme' });
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Schemes.remove(id)
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to delete scheme' });
    next(error)
  }

});

module.exports = router;