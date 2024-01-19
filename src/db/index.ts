import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

// class DatabaseService {
//     private
// }

export const connectToDatabase = async () => {
  return openDatabase(
    {
      name: 'EmployeeManagment.db',
      location: 'default',
    },
    () => {
      console.log('==connected to db==>');
    },
    error => {
      console.log('Could not connect to db', error);
    },
  );
};

export const createTable = async () => {
  try {
    const create_query = `
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            names TEXT NOT NULL,
            job TEXT NOT NULL,
            type TEXT NOT NULL,
            status TEXT NOT NULL
        )
        `;

    const db = await connectToDatabase();
    await db.executeSql(create_query);
    console.log('===db===>', JSON.stringify(db, null, 2));
  } catch (error) {
    console.log({error});
  }
};
