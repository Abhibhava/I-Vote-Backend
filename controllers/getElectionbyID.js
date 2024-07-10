const Election = require('../model/Election');


const getInfobyID = async(req,res)=>{
    try {
        const election = await Election.findById(req.params.id);
        if (!election) {
          return res.status(404).json({ message: 'Election not found' });
        }
        console.log(election);
        res.json(election);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching election details' });
      }
}

module.exports = getInfobyID;