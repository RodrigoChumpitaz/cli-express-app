import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Permission from '../models/Permission.js';
import Role from '../models/Role.js';
import User from '../models/User.js';
dotenv.config();

export default( async()  => {
    try {
        const db = await mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const permissionExist = await Permission.exists({ name: "create" });
        const roleExist = await Role.exists({ name: "admin" });
        const userExist = await User.exists({ name: "user admin" });
  
        if(!permissionExist && !roleExist && !userExist){
            const permission = new Permission({ name: "create" });
            const role = new Role({ name: "admin", permissions: [permission._id] });
            const user = new User({ name: "user admin", email: "prueba@gmail.com", password: "123456", role: role._id })
            await Promise.all([permission.save(), role.save(), user.save()]);
        }
        
        console.log(`Connect to ${db.connection.name}`);     
    } catch (error) {
        console.error(error.message);
    }
});