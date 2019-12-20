const supertest = require("supertest");
const server = require("./students-router");

describe("server.js", function(){
    


    describe("GET /", function() {
        it("should return a 200 OK", function(){
            return supertest(server)
                .get("/")
                .then(res => expect(res.status).toBe(200))
        })
        
        it("should register", function(){
            return supertest(server)
                .post("/register")
                .send({username: "test", password: "test"})
                .then(res => expect(res.status).toBe(201))
        })

        // it("should login", function(){
        //     return 
        // })
    })
  
})