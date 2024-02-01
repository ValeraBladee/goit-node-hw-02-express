const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers/contacts");
const {
  isValidId,
  isEmptyBody,
  authenticate,
} = require("../../middlewares/index");
const { validateBody } = require("../../decorators/index");
const {
  contactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contact-schemas");

router.get("/", authenticate, contactsController.getAllContacts);

router.get("/:contactId", authenticate, isValidId, contactsController.getById);

router.post(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(contactSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(contactSchema),
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
