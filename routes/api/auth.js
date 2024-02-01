const express = require("express");
const { validateBody } = require("../../decorators/index");
const {
  registerSchema,
  loginSchema,
  updateSubscription,
  emailSchema,
} = require("../../schemas/user-schemas");
const userController = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares/index");

const router = express.Router();

router.post("/register", validateBody(registerSchema), userController.register);

router.get("/verify/:verificationToken", userController.verifyEmail);

router.post(
  "/verify",
  validateBody(emailSchema),
  userController.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), userController.login);

router.get("/current", authenticate, userController.getCurrent);

router.post("/logout", authenticate, userController.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscription),
  userController.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userController.updateAvatar
);

module.exports = router;
