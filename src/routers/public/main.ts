import { Router } from "express";
import roomRoutes from "./room";
import feedbackRoutes from "./feedback";

const publicRoutes = Router();

publicRoutes.use("/room", roomRoutes);
publicRoutes.use("/feedback", feedbackRoutes);

export default publicRoutes;
