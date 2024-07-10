
// this route is exclusive to root user, this route is to create new elections

const Election = require('../model/Election');

// Route to create new elections
const election =  async (req, res) => {
    try {
        // Validate request body
        const { title, description, status, parties} = req.body;
        if (!title || !description || !parties) {
            //|| !startDate || !endDate ||
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new election
        const votingEndTime = new Date(Date.now() +   10 * 60 * 1000);
        
        const election = await Election.create({
            title,
            description,
            parties,
            status,
            votingEndTime,
            createdBy: "Root" 
        });

        res.status(201).json({ message: 'Election created successfully', election });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = election;


// problem -> 
// when the type of created by is equal to types.objectId then, it is showing many errors. But when the createdBy
// has already been given the value "Root", then it is working properly