const app = require("./app");
const db = require("./models");

// App db connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

// Server activation
app.listen(app.get("port"), () => {
  console.info("Server is running on port", app.get("port"));
});
