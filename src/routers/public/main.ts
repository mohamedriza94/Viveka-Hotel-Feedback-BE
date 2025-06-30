import { Router } from "express";
import roomRoutes from "./room";
import feedbackRoutes from "./feedback";
import guestRoutes from "./guest";

const publicRoutes = Router();

publicRoutes.use("/room", roomRoutes);
publicRoutes.use("/guest", guestRoutes);
publicRoutes.use("/feedback", feedbackRoutes);

export default publicRoutes;
