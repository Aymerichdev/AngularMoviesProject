import Actor from '../models/actor.js';

// get all actors
const getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ error: 'Error obtaining actors' });
  }
};

// Create an actor
const createActor = async (req, res) => {
  try {
    const { name, birthDate, biography, imgLinks } = req.body;

    const newActor = new Actor({ name, birthDate, biography, imgLinks });
    await newActor.save();
    res.status(201).json(newActor);
  } catch (error) {
    res.status(400).json({ error: 'Error creating actor ', message: error.message });
  }
};

// Obtain an actor by id
const getActorById = async (req, res) => {
  try {
    const { id } = req.params;  // Get the actor's id from the URL

    const actor = await Actor.findById(id);

    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ error: 'Error getting actor' });
  }
};

// Update an actor
const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthDate, biography, imgLinks } = req.body;

    const updatedActor = await Actor.findByIdAndUpdate(
      id,
      { name, birthDate, biography, imgLinks },
      { new: true, runValidators: true }
    );

    if (!updatedActor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    res.status(200).json(updatedActor);
  } catch (error) {
    res.status(400).json({ error: 'Error updating actor' });
  }
};

// Delete an actor
const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActor = await Actor.findByIdAndDelete(id);

    if (!deletedActor) {
      return res.status(404).json({ error: 'Actor not found' });
    }

    res.status(200).json({ message: 'Actor deleted correctly' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting actor' });
  }
};

export { getActors, createActor, updateActor, deleteActor, getActorById };
