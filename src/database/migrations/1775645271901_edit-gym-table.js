/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.addColumns('gyms', {
    gym_url: { type: 'varchar(255)', unique: true },
  });

  // Populate existing rows with a unique value to avoid NOT NULL and UNIQUE constraint volation
  pgm.sql('UPDATE gyms SET gym_url = id::text');

  pgm.alterColumn('gyms', 'gym_url', { notNull: true });

  pgm.alterColumn('gyms', 'city', { notNull: false });
  pgm.alterColumn('gyms', 'state', { notNull: false });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns('gyms', ['gym_url']);
  pgm.alterColumn('gyms', 'city', { notNull: true });
  pgm.alterColumn('gyms', 'state', { notNull: true });
};
