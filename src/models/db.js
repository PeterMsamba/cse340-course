import { Pool } from 'pg'; //[cite: 3]

/**
 * Connection pool for PostgreSQL database.
 * 
 * A connection pool maintains a set of reusable database connections
 * to avoid the overhead of creating new connections for each request.
 * This improves performance and reduces load on the database server.
 * 
 * Uses a connection string from environment variables for simplified setup.
 * The connection string format is:
 * postgresql://username:password@host:port/database
 */
const pool = new Pool({
  connectionString: process.env.DB_URL, //[cite: 3]
  // FIXED: Updated from ssl: true to the object configuration required by Render[cite: 3]
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Common SSL Issue:
 *
 * You may encounter SSL connection errors depending on your operating system, Node.js
 * version, or PostgreSQL server settings. If you have confirmed your credentials are
 * correct but still see SSL errors, try updating the 'ssl' property in the Pool
 * configuration above to:
 *
 * ssl: {
 *     rejectUnauthorized: false
 * }
 */

/**
 * Since we will modify the normal pool object in development mode, we need to create and
 * export a reference to the pool object. This allows us to use the same name for the
 * export regardless of whether we are in development or production mode.
 */
let db = null; //[cite: 3]

if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SQL_LOGGING === 'true') { //[cite: 3]
  /**
   * In development mode, we wrap the pool to provide query logging.
   * This helps with debugging by showing all executed queries in the console.
   * 
   * The wrapper also adds timing information to help identify slow queries
   * and tracks the number of rows affected by each query.
   */
  db = { //[cite: 3]
    async query(text, params) { //[cite: 3]
      try { //[cite: 3]
        const start = Date.now(); //[cite: 3]
        const res = await pool.query(text, params); //[cite: 3]
        const duration = Date.now() - start; //[cite: 3]
        console.log('Executed query:', { //[cite: 3]
          text: text.replace(/\s+/g, ' ').trim(), //[cite: 3]
          duration: `${duration}ms`, //[cite: 3]
          rows: res.rowCount //[cite: 3]
        }); //[cite: 3]
        return res; //[cite: 3]
      } catch (error) { //[cite: 3]
        console.error('Error in query:', { //[cite: 3]
          text: text.replace(/\s+/g, ' ').trim(), //[cite: 3]
          error: error.message //[cite: 3]
        }); //[cite: 3]
        throw error; //[cite: 3]
      }
    },

    async close() { //[cite: 3]
      await pool.end(); //[cite: 3]
    }
  };
} else { //[cite: 3]
  // In production, export the pool directly without logging overhead
  db = pool; //[cite: 3]
}

/**
 * Tests the database connection by executing a simple query.
 */
const testConnection = async () => { //[cite: 3]
  try { //[cite: 3]
    const result = await db.query('SELECT NOW() as current_time'); //[cite: 3]
    console.log('Database connection successful:', result.rows[0].current_time); //[cite: 3]
    return true; //[cite: 3]
  } catch (error) { //[cite: 3]
    console.error('Database connection failed:', error.message); //[cite: 3]
    throw error; //[cite: 3]
  }
};

export { db as default, testConnection }; //[cite: 3]