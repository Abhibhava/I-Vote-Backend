const Election = require("../model/Election");

const getInfo = async(req,res)=>{
    try {
        const data = await Election.find({createdBy: 'Root'});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = getInfo;