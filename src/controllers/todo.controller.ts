import {Request, Response} from 'express';
import { Todo } from '../models/Todo';

export const getAll = async (req: Request, res: Response) => {
    try {

        const list = await Todo.findAll();
        res.json({"Listando todas as tarefas": list});

    } catch (error) {
        console.error("Ocorreu um erro: ", error)
        res.status(500).json({error: 'Ocorreu um erro'});
    }
}

export const addTask = async (req: Request, res: Response) => {
    try {
        
        if(req.body && req.body.title){
            await Todo.create({
                title: req.body.title
            })

            res.status(201).json({message: "Tarefa criada com sucesso!"})
        } else {
            res.status(400).json({error: "Insira um título para sua tarefa."});
        }
        
    } catch (error) {
        console.error("Erro ao adicionar tarefa: ", error);
        res.status(500).json({error: "Erro ao adicionar tarefa"});
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    try {

        let todo = await Todo.findByPk(id);

        if(todo){

            if(req.body){
                if(req.body.title){
                    todo.title = req.body.title;
                }

                if(typeof req.body.done === 'boolean'){
                    todo.done = req.body.done;
                }
            }

            await todo.save()
            res.json({message: "Tarefa atualizada com sucesso!"})

        } else {
            res.status(404).json({error: "Tarefa não encontrada"});
        }
    } catch (error) {
        console.error("Erro ao atualizar a tarefa: ", error)
        res.status(500).json({error: "Erro ao atualizar a tarefa"});
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    try {

        let todo = await Todo.findByPk(id);

        if(todo){
            await todo.destroy();
            res.json({message: 'Tarefa excluida com sucesso!'})
        } else {
            res.status(404).json({error: 'Tarefa não existe'});
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa: ', error);
        res.status(500).json({error: 'Erro ao excluir tarefa.'})
    }
}