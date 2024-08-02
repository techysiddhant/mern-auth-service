import createJWKSMock from "mock-jwks";
import { DataSource } from "typeorm";
import bcrypt from "bcrypt";
import request from "supertest";
import { AppDataSource } from "../../src/config/data-source";
import app from "../../src/app";
import { User } from "../../src/entity/User";
import { Roles } from "../../src/constants";
describe("POST /users", () => {
    let connection: DataSource;
    let jwks: ReturnType<typeof createJWKSMock>;
    beforeAll(async () => {
        jwks = createJWKSMock("http://localhost:5501");
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        jwks.start();
        await connection.dropDatabase();
        await connection.synchronize();
    });
    afterEach(() => {
        jwks.stop();
    });
    afterAll(async () => {
        await connection.destroy();
    });

    describe("Given all fields", () => {
        it("should persist the user in the database", async () => {
            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });
            //register user
            // Arrange
            const userData = {
                firstName: "Siddhant",
                lastName: "Jain",
                email: "sid@test.com",
                password: "password",
                tenantId: 1,
                role: Roles.MANAGER,
            };

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // await userRepository.save({
            //     ...userData,
            //     password: hashedPassword,
            //     role: Roles.CUSTOMER,
            // });
            // Act
            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send({
                    ...userData,
                    password: hashedPassword,
                });

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            // assert
            expect(users).toHaveLength(1);
            expect(users[0].email).toBe(userData.email);
        });
        it("should create a manager user", async () => {
            // Create tenant
            // const tenant = await createTenant(connection.getRepository(Tenant));

            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });

            // Register user
            const userData = {
                firstName: "Rakesh",
                lastName: "K",
                email: "rakesh@mern.space",
                password: "password",
                // tenantId: tenant.id,
                role: Roles.MANAGER,
            };

            // Add token to cookie
            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send(userData);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            expect(users[0].role).toBe(Roles.MANAGER);
        });
        it.todo("should return 403 if non admin user tries to create a user");
    });
});
