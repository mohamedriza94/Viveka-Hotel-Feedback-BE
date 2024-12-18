import express from "express";
import publicRoutes from "./public/main";
import dashboardRoutes from "./dashboard/main";

const router = express.Router();

router.use("/public", publicRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
