const mongoose = require("mongoose");
const Event = require("../models/birthdayEvents");
const paymentsService = require("../services/userPayments");
const usersService = require("../services/users");

const getAllBirthdayEvents = async (userId) => {
  let filteredEvents = [];
  const allEvents = await Event.find({}).where("birthdayPerson").ne(userId)
    .populate("birthdayPerson")
    .populate("participants")
    .populate("eventCreator")
    .exec();
  // if (open == "open") {
  //   const usersWithUpcomingBirthdays = await usersService.getUsersWithUpcomingBirthdays();
  //   const userIds = usersWithUpcomingBirthdays.map((user) => user._id);
      
  //   const openEvents = await Event.find({}).where("birthdayPerson").in(userIds)
  //   .populate("birthdayPerson")
  //   .populate("participants")
  //   .populate("eventCreator")
  //   .exec();
  //   filteredEvents = openEvents;  
  // } else {
  //   filteredEvents = allEvents;
  // }
  return allEvents;
};

const getEventByBirthdayPersonId = async (birthdayPersonId) => {
  const foundEvent = await Event.find({
    birthdayPerson: birthdayPersonId,
  }).exec();
  return foundEvent.length > 0 ? foundEvent : null;
};

const addNewEvent = async (
  birthdayPersonId,
  participants,
  eventCreatorId,
  notes
) => {
  let totalMoneyAmount = 0;

  for (let participantId of participants) {
    const foundPayment = await paymentsService.getPaymentByUserId(
      participantId
    );
    const amount = foundPayment.amount;

    totalMoneyAmount += amount;
  }

  const newEvent = new Event({
    _id: new mongoose.Types.ObjectId(),
    birthdayPerson: birthdayPersonId,
    participants: participants,
    eventCreator: eventCreatorId,
    totalMoneyAmount: totalMoneyAmount,
    notes: notes,
  });
  await newEvent.save();
  return newEvent;
};

const addNewParticipant = async (birthdayEventId, participantId) => {
  const foundEvent = await Event.findById({ _id: birthdayEventId }).exec();
  foundEvent.participants.push(participantId);
  // Find userPayment with participant Id
  const foundParticipant = await paymentsService.getPaymentByUserId(participantId);
  // Add amount from payment to totalMoneyAmount
  foundEvent.totalMoneyAmount = foundEvent.totalMoneyAmount + foundParticipant.amount;
  // Save new amount
  await foundEvent.save();
  return foundEvent;
};

module.exports = {
  getAllBirthdayEvents,
  getEventByBirthdayPersonId,
  addNewEvent,
  addNewParticipant,
};
