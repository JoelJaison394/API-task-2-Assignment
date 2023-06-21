const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');
const { NotFoundError } = require('./errors');
const { getClient } = require('./db');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const router = express.Router();

const upload = multer({ dest: 'uploads/' });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get Event by ID
router.get('/:id', async (req, res, next) => {
  const eventId = req.params.id;
  const objectId = new ObjectId(eventId);
  try {
    const event = await getClient().db().collection('events').findOne({ _id: objectId });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
});

// Get Latest Events with Pagination
router.get('/', async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  try {
    const events = await getClient().db().collection('events')
      .find()
      .sort({ schedule: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Create an Event
router.post('/', upload.single('image'), async (req, res, next) => {
  const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
  const imageFile = req.file;

  try {
    const result = await cloudinary.uploader.upload(imageFile.path);

    const uniqueId = generateUniqueId(name);

    const event = {
      type: 'event',
      uid: `${uniqueId}`,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      image: result.secure_url,
      attendees: [],
    };

    const insertResult = await getClient().db().collection('events').insertOne(event);
    fs.unlinkSync(imageFile.path);

    res.json({ eventId: insertResult.insertedId });
  } catch (error) {
    next(error);
  }
});


// Update an Event
router.put('/:id', async (req, res, next) => {
  const eventId = req.params.id;
  const objectId = new ObjectId(eventId);
  const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;

  try {
    const event = await getClient().db().collection('events').findOne({ _id: objectId});

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const updatedEvent = {
      ...event,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    };

    await getClient().db().collection('events').replaceOne({ _id: objectId }, updatedEvent);

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    next(error);
  }
});

// Delete an Event
router.delete('/:id', async (req, res, next) => {
  const eventId = req.params.id;
  const objectId = new ObjectId(eventId);

  try {
    const event = await getClient().db().collection('events').findOne({_id:objectId });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    await getClient().db().collection('events').deleteOne({ _id: event._id });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
});

function generateUniqueId(name) {
  const alphanumericString = uuidv4().replace(/-/g, '').substr(0, 5);
  return `${name}_${alphanumericString}`;
}

module.exports = router;
