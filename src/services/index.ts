import {User} from '../db/data';
import {connectToDatabase} from '../db';

export const addEmployees = async (employee: User) => {
  const insertQuery = `
        INSERT INTO employees (names, job, type, status)
        VALUES (?, ?, ?, ?)
    `;
  const values = [employee.names, employee.job, employee.type, employee.status];
  try {
    const db = await connectToDatabase();
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.log('insert-error', error);
  }
};

export const getEmployees = async (): Promise<User[]> => {
  const users: User[] = [];
  try {
    const db = await connectToDatabase();
    const results = await db.executeSql('SELECT * FROM employees');

    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });

    return users;
  } catch (error) {
    console.log('select-error', error);
    return users;
  }
};

export const updateEmployee = async (employee: User) => {
  const updateQuery = `
        UPDATE employees
        SET names = ?, job = ?, type = ?, status = ?
        WHERE id = ?
    `;
  const values = [
    employee.names,
    employee.job,
    employee.type,
    employee.status,
    employee.id,
  ];
  try {
    const db = await connectToDatabase();
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.log('update-error', error);
  }
};

export const deleteEmployee = async (id: number) => {
  const deleteQuery = `
        DELETE FROM employees
        WHERE id = ?
    `;
  try {
    const db = await connectToDatabase();
    return db.executeSql(deleteQuery, [id]);
  } catch (error) {
    console.log('delete-error', error);
  }
};
