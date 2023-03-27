import { connect, connection } from 'mongoose';

const url = process.env.MONGO_URL || '';

export const dBconnect = async () => {
    let dBconnection;
    try {
        dBconnection = await connect(url);
    } catch (error) {
        connection.close();
        console.log(JSON.stringify(error));
        return "DB connection failed!"
    }
    return dBconnection;
}