import User from "../models/userModel.js";

export default async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // console.log("I am called " + bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];

        try {
            const user = await User.findOne({ token: bearerToken, });

            if (!user) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();


        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}