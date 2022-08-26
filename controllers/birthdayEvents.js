const birthdayEventsService = require("../services/birthdayEvents");

const getAllBirthdayEvents = async (req, res, next) => {
  const { userId } = req.params;
  try {
    if(!userId) {
        const error = new Error("You have to pass your user id in order to get events!");
        error.status = 400;
        throw error;
    }
    const allEvents = await birthdayEventsService.getAllBirthdayEvents(userId);
    if (allEvents == null) {
      res.status(404).json();
    } else {
      res.status(200).json(allEvents);
    }
  } catch (error) {
    next(error);
  }
};

const addNewEvent = async (req, res, next) => {
  const { birthdayPersonId, participants, eventCreatorId, notes } = req.body;
  try {
    const foundEventWithTheSameBirthdayPerson =
      await birthdayEventsService.getEventByBirthdayPersonId(birthdayPersonId);
    if (foundEventWithTheSameBirthdayPerson != null) {
      const error = new Error("Birthday event for this person already exists!");
      error.status = 400;
      throw error;
    } else if (!birthdayPersonId || !participants || !eventCreatorId) {
      const error = new Error("Check the forwarded data!");
      error.status = 400;
      throw error;
    } else if (birthdayPersonId == eventCreatorId) {
      const error = new Error("You cannot create birthday event for yourself!");
      error.status = 400;
      throw error;
    } else {
      const newEvent = await birthdayEventsService.addNewEvent(
        birthdayPersonId,
        participants,
        eventCreatorId,
        notes
      );
      res.status(201).json(newEvent);
    }
  } catch (error) {
    next(error);
  }
};

const addNewParticipant = async (req, res, next) => {
  const birthdayEventId = req.params.id;
  const { participantId } = req.body;
  try {
    if (!birthdayEventId) {
      const error = new Error("Missing a birthday event id!");
      error.status = 400;
      throw error;
    } else if (!participantId) {
      const error = new Error("Missing a participant id!");
      error.status = 400;
      throw error;
    } else {
      const updatedBirthdayEvent =
        await birthdayEventsService.addNewParticipant(
          birthdayEventId,
          participantId
        );
      res.status(200).json(updatedBirthdayEvent);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBirthdayEvents,
  addNewEvent,
  addNewParticipant,
};
