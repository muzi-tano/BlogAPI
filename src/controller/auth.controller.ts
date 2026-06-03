import { RequestHandler } from "express";
import { error } from "node:console";
import { z } from "zod";
import { createUser } from "../services/user.service";
export const signIn: RequestHandler = (req, res) => {
// Lógica para autenticar o usuário
}
export const signUp: RequestHandler = async (req, res) => {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const data = schema.safeParse(req.body)
    if (!data.success) {
        return res.status(400).json({ error: data.error.flatten().fieldErrors})
    }

    const newUser = await createUser(data.data) as any;
    if (!newUser) {
        return res.status(400).json({ error: 'Email já cadastrado' })
    }

const token = '123'
    res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        },
        token
    })
}

export const validate: RequestHandler = (req, res) => {
    // Lógica para validar o token de autenticação
}