import { Router } from "express";
import * as adminController from '../controller/admin.controller'
export const adminRoutes = Router();

adminRoutes.post('/posts', adminController.addPost);
adminRoutes.put('/posts/:slug', adminController.editPost);
adminRoutes.delete('/posts/:slug', adminController.deletePost);
adminRoutes.get('/posts', adminController.getAllPosts);
adminRoutes.get('/posts/:slug', adminController.getPost);