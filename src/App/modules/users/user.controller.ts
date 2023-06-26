import { NextFunction, Request, Response } from 'express'
import { usersService } from './user.service'
import { z } from 'zod'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserZodSchama = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchama.parseAsync(req)

    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      sucess: true,
      message: 'successfully create a user',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
