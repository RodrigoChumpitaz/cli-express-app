import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        const setUser = new User({ name: "Jhon", email: "jhondoe@mail.com", password: "1234" });
        await setUser.save();
        return res.json(await User.find());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}