import express from 'express';
import path from 'path';


const defaultRouter = express.Router();

defaultRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default defaultRouter;
