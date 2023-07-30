import express, { Router } from "express";

const router: Router = express.Router();
const apiRoutes: Router = express.Router();

router.use("/v1", apiRoutes);

export default router;
