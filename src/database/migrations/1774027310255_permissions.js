import { commonColumns } from '../migration-utils.js';

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
  pgm.createTable('permissions', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    slug: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    group: {
      type: 'varchar(255)',
      notNull: true,
    },
    ...commonColumns(pgm),
  });

  pgm.createTable('role_permissions', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    role_id: {
      type: 'uuid',
      notNull: true,
      references: 'roles(id)',
    },
    permission_id: {
      type: 'uuid',
      notNull: true,
      references: 'permissions(id)',
      onDelete: 'CASCADE',
    },
    ...commonColumns(pgm),
  });

  pgm.createTable('staff_permissions', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    staff_id: {
      type: 'uuid',
      notNull: true,
      references: 'staff(id)',
    },
    permission_id: {
      type: 'uuid',
      notNull: true,
      references: 'permissions(id)',
    },
    allowed: {
      type: 'boolean',
      default: true,
    },
    ...commonColumns(pgm),
  });

  pgm.sql(`
    INSERT INTO permissions (slug, "group") VALUES
    ('staff.management', 'account'),
    ('members.view', 'members'),
    ('members.update', 'members'),
    ('members.settings', 'members'),
    ('members.checkin', 'members'),
    ('view.invoice', 'members'),
    ('payment.list', 'billing'),
    ('payment.modify', 'billing'),
    ('billing.settings', 'billing'),
    ('functionality.front-desk', 'functionality'),
    ('functionality.reports', 'functionality'),
    ('gym.settings', 'gym'),
    ('gym.schedule', 'gym'),
    ('create.sale','point-of-sale'),
    ('manage.products','point-of-sale'),
    ('sale.settings','point-of-sale')
    ON CONFLICT (slug) DO NOTHING;
  `);

  pgm.sql(`
    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id 
    FROM roles r, permissions p 
    WHERE r.name = 'manager';

    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id 
    FROM roles r, permissions p 
    WHERE r.name = 'trainer' 
    AND p.slug IN ('members.view', 'gym.schedule', 'members.checkin');

    INSERT INTO role_permissions (role_id, permission_id)
    SELECT r.id, p.id 
    FROM roles r, permissions p 
    WHERE r.name = 'front desk' 
    AND p.slug IN ('members.checkin','functionality.front-desk');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
