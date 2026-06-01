import { Router } from "express";
import * as mainController from "../controller/main.controller";
export const mainRoutes = Router();

mainRoutes.get("/teste", (req, res) => {
    res.json({ message: 'API funcionando!' });
});

mainRoutes.get('/posts', mainController.getAllPosts);
mainRoutes.get('/posts/:slug', mainController.getPost);
mainRoutes.get('/posts/:slug/related', mainController.getRelatedPosts);