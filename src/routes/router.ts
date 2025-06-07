import { Request, Response, Router } from "express";

import * as todoController from '../controllers/todo.controller';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true});
});

router.get('/tasks', todoController.getAll);
router.post('/task', todoController.addTask);
router.put('/task/:id', todoController.updateTask);
router.delete('/task/:id', todoController.deleteTask);

export default router;