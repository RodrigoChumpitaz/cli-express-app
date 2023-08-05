import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        return res.json(await User.find().populate({ path: 'role', populate: { path: 'permissions', select:"name" }, select: 'name' }));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}