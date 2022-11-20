const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;
const app = require("../app");
let idGateway;

/**
 * Initial gateway object.
 */
const gateway = {
  serial: Math.random(1, 200),
  name: "Gateway 1",
  ipv4: "127.0.0.1",
};

/**
 * Connecting to database
 */
beforeAll(async () => {
  await mongoose.connect(url);
});

/**
 * Closing to database
 */
afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST: /api/gateways", () => {
  it("POST: Insert gateway successfully", async () => {
    const response = await request(app).post("/api/gateways").send(gateway);
    expect(response.statusCode).toBe(201);
  });

  it("POST: Error inserting gateway with same serial", async () => {
    const response = await request(app).post("/api/gateways").send(gateway);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.serial).toBe(
      "Gateway serial already exist."
    );
  });

  it("POST: Error inserting gateway with no serial", async () => {
    const response = await request(app)
      .post("/api/gateways")
      .send({
        ...gateway,
        serial: "",
      });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.serial).toBe(
      "Gateway serial is required."
    );
  });

  it("POST: Error inserting gateway with no ipv4", async () => {
    const response = await request(app)
      .post("/api/gateways")
      .send({
        ...gateway,
        ipv4: "",
      });
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.ipv4).toBe("Invalid IPv4 format.");
    expect(response.statusCode).toBe(400);
  });

  it("POST: Error inserting gateway with no name", async () => {
    const response = await request(app)
      .post("/api/gateways")
      .send({
        ...gateway,
        name: "",
      });
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.name).toBe(
      "Gateway name is required."
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("GET: /api/gateways", () => {
  it("should return all gateways", async () => {
    const response = await request(app).get("/api/gateways");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    expect(response.body.length).toBeGreaterThan(0);
    const item = response.body.find((item) => item.name === "Gateway 1");
    idGateway = item.id;
    expect(item.name).toBe("Gateway 1");
  });

  it("GET: Recieve specific gateway", async () => {
    const response = await request(app).get(`/api/gateways/${idGateway}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
  });

  it("GET: Error fetching non-existent gateway", async () => {
    const response = await request(app).get("/api/gateways/anynumber");
    expect(response.statusCode).toBe(404);
  });
});

describe("PUT /api/gateways/:idGateway", () => {
  it("Updating specific gateway successfully", async () => {
    const response = await request(app)
      .put(`/api/gateways/${idGateway}`)
      .send({
        ...gateway,
        name: "Gateway Change Name",
      });
    expect(response.statusCode).toBe(200);
  });

  it("PUT: Error updating gateway with no serial", async () => {
    const response = await request(app)
      .put(`/api/gateways/${idGateway}`)
      .send({
        ...gateway,
        serial: "",
      });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.serial).toBe(
      "Gateway serial is required."
    );
  });

  it("PUT: Error updating gateway with no ipv4", async () => {
    const response = await request(app)
      .put(`/api/gateways/${idGateway}`)
      .send({
        ...gateway,
        ipv4: "",
      });
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.ipv4).toBe("Invalid IPv4 format.");
    expect(response.statusCode).toBe(400);
  });

  it("PUT: Error updating gateway with no name", async () => {
    const response = await request(app)
      .put(`/api/gateways/${idGateway}`)
      .send({
        ...gateway,
        name: "",
      });
    expect(JSON.parse(response.text).message).toBe(
      "#400: Gateway validation error."
    );
    expect(JSON.parse(response.text).fields.name).toBe(
      "Gateway name is required."
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /api/gateways/:idGateway", () => {
  it("should return all gateways", async () => {
    const response = await request(app).delete(`/api/gateways/${idGateway}`);
    expect(response.statusCode).toBe(204);
  });
});
