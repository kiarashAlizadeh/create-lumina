import mongoose from 'mongoose';

async function DBConnect() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env file');
    return;
  }

  // Connecting to the database
  mongoose.connect(DATABASE_URL);

  // Storing the database connection instance
  const db = mongoose.connection;

  // Handling database connection errors
  db.on('error', (error) => console.error(error));
  // Once connected to the database, execute once
  db.once('open', () => console.log('successfully connected to the DataBase!'));
}

// lumina port
const port = 8080;

export { port, DBConnect };
