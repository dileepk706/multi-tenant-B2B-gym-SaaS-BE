export const queryBuilder = (table: string, filters: object, select: string[] = ['*']) => {
  const filteredData = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null),
  );
  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);

  const fields = keys.map((key, index) => `"${key}" = $${index + 1}`).join(' AND ');

  const query = `SELECT ${select.join(', ')} FROM ${table} WHERE ${fields}`;

  return { query, values };
};

export const insertQueryBuilder = (table: string, data: Partial<any>) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== null),
  );
  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);

  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;

  return { query, values };
};

export const updateQueryBuilder = (table: string, id: string, data: Partial<any>) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== null),
  );
  const keys = Object.keys(filteredData);
  const values = Object.values(filteredData);
  const fields = keys.map((key, index) => `"${key}" = $${index + 1}`).join(', ');

  const query = `UPDATE ${table} SET ${fields} WHERE id = $${keys.length + 1} RETURNING *`;

  return { query, values: [...values, id] };
};
