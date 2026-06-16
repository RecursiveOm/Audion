require("dotenv").config()

const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../app")

const userModel = require("../models/user.model")


beforeAll(async()=>{

    await mongoose.connect(
        process.env.MONGODB_CONNECT_URL
    )


    // clean old test users
    await userModel.deleteMany({
        email:{
            $regex:"test"
        }
    })

})


afterAll(async()=>{

    await userModel.deleteMany({
        email:{
            $regex:"test"
        }
    })

    await mongoose.connection.close()

})




describe("Auth API Tests",()=>{


    // REGISTER SUCCESS
    test("should register a new user", async()=>{


        const response = await request(app)

            .post("/api/auth/register")

            .send({

                username:"testuser",

                email:"test@gmail.com",

                password:"123456",

                role:"user"

            })


        expect(response.statusCode)
            .toBe(201)


        expect(response.body.user.email)
            .toBe("test@gmail.com")

    })





    // DUPLICATE USER
    test("should reject duplicate user", async()=>{


        const response = await request(app)

            .post("/api/auth/register")

            .send({

                username:"testuser",

                email:"test@gmail.com",

                password:"123456"

            })


        expect(response.statusCode)
            .toBe(409)


    })





    // VALIDATION TEST
    test("should fail without email", async()=>{


        const response = await request(app)

            .post("/api/auth/register")

            .send({

                username:"abc",

                password:"123456"

            })


        expect(response.statusCode)
            .toBe(400)

    })





    // LOGIN SUCCESS
    test("should login existing user", async()=>{


        const response = await request(app)

            .post("/api/auth/login")

            .send({

                email:"test@gmail.com",

                password:"123456"

            })


        expect(response.statusCode)
            .toBe(200)


        expect(
            response.headers["set-cookie"]
        ).toBeDefined()


    })





    // WRONG PASSWORD
    test("should reject wrong password", async()=>{


        const response = await request(app)

            .post("/api/auth/login")

            .send({

                email:"test@gmail.com",

                password:"wrongpassword"

            })


        expect(response.statusCode)
            .toBe(401)

    })





    // LOGOUT
    test("should logout user", async()=>{


        const response = await request(app)

            .get("/api/auth/logout")


        expect(response.statusCode)
            .toBe(200)


        expect(response.body.message)
            .toBe("User logged out successfully")


    })


})