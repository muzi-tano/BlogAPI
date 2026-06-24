import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import z from "zod";
import { handleCover } from "../services/post.service";

export const addPost = async (req: ExtendedRequest, res: Response) => {
   if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
   }

   const schema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string(),
   })
  
   const data = schema.safeParse(req.body)
   if (!data.success) {
    return res.status(400).json({ error: data.error.flatten().fieldErrors });
   }

   if(!req.file) {
    return res.status(400).json({ error: 'Cover image is required.' });
   }

   const coverName = await handleCover(req.file);

   // TODO: create the post using data.data and coverName, e.g. save to DB
   return res.status(201).json({ message: 'Post created successfully.', cover: coverName });
}

export const editPost: RequestHandler = async (req, res) => {
    // Lógica para editar um post existente
    return res.json({ message: 'Post atualizado com sucesso.' });
}

export const deletePost: RequestHandler = async (req, res) => {
    // Lógica para deletar um post
    return res.json({ message: 'Post deletado com sucesso.' });
}

export const getAllPosts: RequestHandler = async (req, res) => {
    // Lógica para buscar todos os posts
    return res.json({ message: 'Buscando todos os posts...' });
}

export const getPost: RequestHandler = async (req, res) => {
    // Lógica para buscar um post específico pelo slug
    return res.json({ message: 'Buscando um post específico...' });
}