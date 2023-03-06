const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "user",
        password: "password"
    },
    {
        username: "JonnyStaib",
        password: "JonnyPW"
    },
    {
        username: "GarrettWard",
        password: "asdklan"
    },

]

const blogs = [
    {
        title: "Apple sucks!",
        content: "This new iPhone broke after washing it in the machine!",
        userId: 1
    },
    {
        title: "I hate Valorant!",
        content: "Why can't everyone just go back to CS:GO!",
        userId: 1
    },
    {
        title: "Computer Broken",
        content: "Won't turn on",
        userId: 2
    },
    {
        title: "New NVIDIA graphics",
        content: "It blew my power supply up!",
        userId: 3
    },
]

const comments = [
    {
        body: "That stinks!",
        blogId: 1,
        userId: 1
    },
    {
        body: "I agree!",
        blogId: 3,
        userId: 2
    },
    {
        body: "Plug it in!",
        blogId: 4,
        userId: 1
    },
    {
        body: "Should've stuck with the old one!",
        blogId: 2,
        userId: 3
    },

]

const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()