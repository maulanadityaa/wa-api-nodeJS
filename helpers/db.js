const {Client} = require('pg')
const { query } = require('express-validator');

const client = new Client({
    connectionString : 'postgres://drdbaarbvsvytx:dad143bddf11e5dab3036887812058e5949f07cf8dedb1dcd9dba5721afce005@ec2-18-215-44-132.compute-1.amazonaws.com:5432/d1abcv7lgeig4t',
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

const readSession = async () => {
    try {
      const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1');
      if (res.rows.length) return res.rows[0].session;
      return '';
    } catch (err) {
      throw err;
    }
  }
  
  const saveSession = (session) => {
    client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
      if (err) {
        console.error('Failed to save session!', err);
      } else {
        console.log('Session saved!');
      }
    });
  }
  
  const removeSession = () => {
    client.query('DELETE FROM wa_sessions', (err, results) => {
      if (err) {
        console.error('Failed to remove session!', err);
      } else {
        console.log('Session deleted!');
      }
    });
  }
  
  module.exports = {
    readSession,
    saveSession,
    removeSession
  }