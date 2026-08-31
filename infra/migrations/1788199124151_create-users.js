exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(254)", // https://stackoverflow.com/a/1199238
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(60)", // https://www.npmjs.com/package/bcrypt#hash-info
      notNull: true,
    },
    created_at: {
      type: "timestamptz", // https://justatheory.com/2012/04/postgres-use-timestamptz/
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
