const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

// Defines the variables
const url = process.env.DB_URL;
const app = require("../app");
let idGateway;
let idPeripheral;

/**
 * Initial gateway object.
 */
const gateway = {
  serial: Math.random(1, 200),
  name: "Gateway 1",
  ipv4: "127.0.0.1",
};

const peripheral = {
  uid: 123,
  vendor: "Musala",
  status: false,
};

/**
 * Connecting to database before each test.
 */
beforeAll(async () => {
  await mongoose.connect(url);

  await request(app).post("/api/gateways").send(gateway);

  const responseA = await request(app).get("/api/gateways");
  const item = responseA.body.find((item) => item.name === "Gateway 1");
  idGateway = item.id;
});

/**
 * Closing to database after each test.
 */
afterAll(async () => {
  await request(app).delete(`/api/gateways/${idGateway}`);
  await mongoose.connection.close();
});

describe("POST: /api/gateways/:id/peripherals", () => {
  it("POST: Insert peripheral successfully", async () => {
    const response = await request(app)
      .post(`/api/gateways/${idGateway}/peripherals`)
      .send(peripheral);
    expect(response.statusCode).toBe(201);
  });

  it("POST: Error inserting peripheral with no uid", async () => {
    const response = await request(app)
      .post(`/api/gateways/${idGateway}/peripherals`)
      .send({
        ...peripheral,
        uid: null,
      });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(
      "#400: Peripheral validation error."
    );
    expect(JSON.parse(response.text).fields.uid).toBe(
      "Peripheral uid is required."
    );
  });

  //   POST: Error inserting peripheral with no vendor
  it("POST: Error inserting peripheral with no vendor", async () => {
    const response = await request(app)
      .post(`/api/gateways/${idGateway}/peripherals`)
      .send({
        ...peripheral,
        vendor: "",
      });
    expect(JSON.parse(response.text).message).toBe(
      "#400: Peripheral validation error."
    );
    expect(JSON.parse(response.text).fields.vendor).toBe(
      "Peripheral vendor is required."
    );
    expect(response.statusCode).toBe(400);
  });

  //  POST: Error inserting more than 10 peripherals
  it("POST: Error inserting more than 10 peripherals", async () => {
    let response;
    for (let i = 0; i < 11; i++) {
      response = await request(app)
        .post(`/api/gateways/${idGateway}/peripherals`)
        .send(peripheral);
    }

    expect(JSON.parse(response.text).message).toBe(
        "#400: Peripheral limit exceeded."
    );   
    expect(response.statusCode).toBe(400);
  });

  // it("POST: Error inserting peripheral with no status", async () => {
  //   const response = await request(app)
  //   .post(`/api/gateways/${idGateway}/peripherals`)
  //     .send({
  //       ...peripheral,
  //       status: null,
  //     });
  //   expect(JSON.parse(response.text).message).toBe(
  //     "#400: Peripheral validation error."
  //   );
  //   expect(JSON.parse(response.text).fields.status).toBe(
  //     "Peripheral status is required."
  //   );
  //   expect(response.statusCode).toBe(400);
  // });
});

describe("GET: /api/gateways/:idGateway/peripherals", ()=>{
    it("GET: Insert peripheral successfully", async () => {
        const response = await request(app)
          .get(`/api/gateways/${idGateway}/peripherals`);
          idPeripheral = response.body.peripherals.find(item => item.uid === peripheral.uid)._id;
        expect(response.statusCode).toBe(200);
      });
});

describe("DELETE: /api/gateways/:idGateway/peripherals/:idPeripheral", ()=>{
    it("DELETE: delete a peripheral successfully", async () => {
        const response = await request(app)
          .delete(`/api/gateways/${idGateway}/peripherals/${idPeripheral}`)
        expect(response.statusCode).toBe(204);
      });
});
