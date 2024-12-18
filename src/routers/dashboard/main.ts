import { Router } from "express";
import roomRoutes from "./room";

const dashboardRoutes = Router();

dashboardRoutes.use("/room", roomRoutes);

export default dashboardRoutes;
