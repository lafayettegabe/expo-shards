async function getSchema() {
  const schema = [
    {
      name: "test",
      columns: [
        { name: "id", type: "INTEGER PRIMARY KEY NOT NULL" },
        { name: "data", type: "TEXT" },
      ],
    },
  ];

  return schema;
}

export { getSchema };
