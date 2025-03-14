import * as jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const auth_header = req.headers["authorization"];
    if (auth_header) {
        const token = auth_header.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: "Token not provided" });
    }
}
