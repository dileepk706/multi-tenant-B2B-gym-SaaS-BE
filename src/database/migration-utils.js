/**
 * Utility to provide common timestamp columns for migration tables
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const commonColumns = (pgm) => ({
  created_at: {
    type: 'timestamp with time zone',
    notNull: true,
    default: pgm.func('now()'),
  },
  updated_at: {
    type: 'timestamp with time zone',
    notNull: true,
    default: pgm.func('now()'),
  },
  created_on: {
    type: 'bigint',
    notNull: true,
    default: pgm.func('(extract(epoch from now()) * 1000)::bigint'),
  },
  updated_on: {
    type: 'bigint',
    notNull: true,
    default: pgm.func('(extract(epoch from now()) * 1000)::bigint'),
  },
});

/**
 * Utility to attach the set_updated_at trigger to a table
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 * @param {string} tableName
 */
export const addTimestampTrigger = (pgm, tableName) => {
  pgm.createTrigger(tableName, 'set_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    function: 'set_updated_at',
  });
};
