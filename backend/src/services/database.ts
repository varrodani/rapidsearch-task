import { connect } from 'mongoose';

export function connectDB(db: string) {
    // @ts-ignore
    connect(db, { useNewUrlParser: true })
        .then(() => {
            return console.info(`Successfully connected to ${db}`);
        })
        .catch(error => {
            console.error('Error connecting to database: ', error);
        });
}