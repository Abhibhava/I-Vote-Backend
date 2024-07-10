const Election = require('../model/Election');
const Vote = require('../model/Vote');
const jwt = require('jsonwebtoken');

const castVote = async (req, res) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, 'your_secret_key');
        const userId = decodedToken.userId;

        // Get the election ID from the route parameter
        const electionId = req.params.id;

        // Check if the user has already voted in this election
        const existingVote = await Vote.findOne({ user: userId, election: electionId });
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted in this election' });
        }

        // Get the selected party from the request body
        const { party } = req.body;

        // Create a new Vote document
        const newVote = new Vote({
            user: userId,
            election: electionId,
            party: party
        });

        // Save the new vote to the database
        await newVote.save();

        const election = await Election.findByIdAndUpdate(
            electionId,
            { $inc: { 'parties.$[elem].votes': 1 } },
            { arrayFilters: [{ 'elem.name': party }], new: true }
        );

        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        // Return a success response
        res.status(200).json({ message: 'Vote cast successfully', totalVotes: election.parties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = castVote;



// const Election = require('../model/Election');
// const Vote = require('../model/Vote');
// const jwt = require('jsonwebtoken');

// const castVote = async (req, res) => {
//     try {
//         // Decode the JWT token to get the user ID
//         const token = req.headers['authorization']
//         const decodedToken = jwt.decode(token);
//         const userId = decodedToken.userId;

//         // Get the election ID from the route parameter
//         const electionId = req.params.id;

//         // Check if the user has already voted in this election
//         const existingVote = await Vote.findOne({ user: userId, election: electionId });
//         if (existingVote) {
//             return res.status(400).json({ message: 'You have already voted in this election' });
//         }

//         // Get the selected party from the request body
//         const { party } = req.body;

//         // Create a new Vote document
//         const newVote = new Vote({
//             user: userId,
//             election: electionId,
//             party: party
//         });

//         // Save the new vote to the database
//         await newVote.save();

//         const election = await Election.findByIdAndUpdate(
//             electionId,
//             { $inc: { 'parties.$[elem].votes': 1 } },
//             { arrayFilters: [{ 'elem.name': party }], new: true }
//         );

//         if (!election) {
//             return res.status(404).json({ message: 'Election not found' });
//         }

//         // Return a success response
//         res.status(200).json({ message: 'Vote cast successfully', totalVotes: election.parties });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = castVote;
