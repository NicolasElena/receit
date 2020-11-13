import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    // utilizar a secret aqui também (jwt)
    const data = jwt.verify(token, 'receit');

    console.log(data);

    //informação do payload com o id do user

    const { id } = data as TokenPayload;

    //express userId na pasta @types
    request.userId = id;

    return next();
  } catch {
    return response.sendStatus(401);
  }
}
