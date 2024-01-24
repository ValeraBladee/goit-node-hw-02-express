const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const dataContactList = await Contact.find({}, "-createdAt -updatedAt");
  console.log("dataContactList: ", dataContactList);
  res.status(200).json(dataContactList);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactInfoById = await Contact.findById(contactId);
  if (!contactInfoById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contactInfoById);
};

const addContact = async (req, res, next) => {
  const addContacts = await Contact.create(req.body);
  res.status(201).json(addContacts);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "missing fields");
  }
  res.status(200).json(result);
};

const deletedContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "missing fields");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deletedContact: ctrlWrapper(deletedContact),
};
