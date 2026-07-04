import database from "infra/database.js"; // também é posível usar /infra para ir direto ao root path (e aí não precisa do jsconfig.json)

async function status(request, response) {
  const result = await database.query("SELECT 1 + 2 AS sum;");
  console.log(result.rows);
  response.status(200).json({ key: "value" });
}

export default status;
