import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import z from "zod";
import { handleCover, createPostSlug, createPost} from "../services/post.service";
import { getUserById } from "../services/user.service";
import { id } from "zod/locales";
import { coverToUrl } from "../utils/cover.to.url";
export const addPost = async (req: ExtendedRequest, res: Response) => {
   if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
   }

   const schema = z.object({
      title: z.string(),
      tags: z.string(),
      body: z.string(),
   });
  
   const data = schema.safeParse(req.body);
   if (!data.success) {
      return res.status(400).json({ error: data.error.flatten().fieldErrors });
   }

   if (!req.file) {
      return res.status(400).json({ error: 'Cover image is required.' });
   }

   const coverName = await handleCover(req.file);
   if (!coverName) {
      return res.status(500).json({ error: 'Failed to process cover image.' });
   }

   
   const slug = await createPostSlug(data.data.title); 

   const newPost = ({
    authorId: req.user.id,
    slug,
    title: data.data.title,
    tags: data.data.tags,
    body: data.data.body,
    cover: coverName

   })
   const author = await  getUserById((newPost.authorId));
   return res.status(201).json({ 
    post: { 
    id: newPost.authorId,
      title: newPost.title,
      tags: newPost.tags,
      body: newPost.body,
      cover: coverToUrl(newPost.cover),
      slug: newPost.slug,
      author: author?.name || 'Unknow'
    }
  
   });
}


export const editPost: RequestHandler = async (req, res) => {
    return res.json({ message: 'Post atualizado com sucesso.' });
}

export const deletePost: RequestHandler = async (req, res) => {
    return res.json({ message: 'Post deletado com sucesso.' });
}

export const getAllPosts: RequestHandler = async (req, res) => {
    return res.json({ message: 'Buscando todos os posts...' });
}

export const getPost: RequestHandler = async (req, res) => {
    return res.json({ message: 'Buscando um post específico...' });
}