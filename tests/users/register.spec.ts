import request from "supertest";
import app from "../../src/app";

describe("POST /auth/register", () => {
    describe("Given all fields", () => {
        it("should return the 201 status code", async () => {
            //TODO: Follow Three's AAA method
            // Arrange Act Assert
            //Arrange
            const userData = {
                firstName: "Siddhant",
                lastName: "Jain",
                email: "sidjain8000@gmail.com",
                password: "siddhant",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //Assert
            expect(response.status).toBe(201);
        });
        it("should return valid json response", async () => {
            //TODO: Follow Three's AAA method
            // Arrange Act Assert
            //Arrange
            const userData = {
                firstName: "Siddhant",
                lastName: "Jain",
                email: "sidjain8000@gmail.com",
                password: "siddhant",
            };
            //Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            //Assert
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });
    });
    describe("Fields are missing", () => {});
});
