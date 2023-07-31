import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default( async()  => {
    try {
        const db = await mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connecto to ${db.connection.name}`);     
    } catch (error) {
        console.error(error.message);
    }
})();