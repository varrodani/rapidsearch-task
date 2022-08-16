import express, {Request, Response} from 'express';
import SecretService from "../services/secret.service";
const router = express.Router();

router.get('/secret/:hash', async (req: Request, res: Response) => {
    try {
        const secretObject = await SecretService.getSecret(req.params.hash)
        return res.json(secretObject);
    } catch (e) {
        return res.status(404).send('Secret not found');
    }
});

router.post('/secret', async (req: Request, res: Response) => {
    try {
        const secret = req.body.secret;
        const expire = req.body.expireAfter;
        const secretObject = await SecretService.createSecret(secret, expire)
        return res.json(secretObject);
    } catch (e) {
        return res.status(405).send('Invalid input');
    }
});

export default router;