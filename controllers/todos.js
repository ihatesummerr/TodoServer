import mongoose from 'mongoose';
import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {}
};

export const createTodo = async (req, res) => {
    const todo = req.body;
    console.log(todo);
    const newTodo = new Todo({ ...todo, done: false, createdAt: new Date() });

    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {}
};

export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'No todo with that id' });
    }

    try {
        await Todo.findByIdAndRemove(id);
        res.send({ message: 'Todo deleted successfully' });
    } catch (error) {}
};

export const updateTodo = async (req, res) => {
    const todo = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'No todo with that id' });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { ...todo, id },
            { new: false }
        );
        res.json(updatedTodo);
    } catch (error) {}
};
