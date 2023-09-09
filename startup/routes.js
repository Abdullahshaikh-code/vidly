const movie= require("../raoutes/movie");
const authentication= require("../raoutes/authentication");
const genre= require("../raoutes/genres");
const customers=require("../raoutes/customers");
const user=require("../raoutes/users")
const rentals= require("../raoutes/rentals");
const returns=require("../raoutes/returns")
const errHandler=require("../MiddleWare/errHandler")

module.exports=function(app){
    app.use("/api/user",user);
    app.use("/api/auth",authentication);
    app.use("/api/rentals",rentals);
    app.use("/api/movies",movie);
    app.use("/api/genres",genre);
    app.use("/api/customers",customers);
    app.use("/api/returns",returns);
    app.use(errHandler)
}