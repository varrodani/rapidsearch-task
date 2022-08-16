import SecretModel, {ISecret} from "../models/secret.model";
import crypto from "crypto";

class SecretService {
    async getSecret(hash: string) {
        const secret = <ISecret><unknown>await SecretModel.findOne({hash: hash}).exec()
        if (secret.expiresAt > 0 && new Date().getTime() > secret.expiresAt) {
            throw new Error("Secret expired")
        }
        return {
            "hash": secret.hash,
            "secretText": secret.secretText,
            "createdAt": new Date(secret.createdAt),
            "expiresAt": secret.expiresAt > 0 ? new Date(secret.expiresAt) : 'never'
        };
    }

    async createSecret(secret: string, expire: number): Promise<object> {
        const hash = crypto.createHash('md5').update(secret).digest('hex').toString();
        return SecretModel.create({
            hash,
            secretText: secret,
            createdAt: new Date().getTime(),
            expiresAt: expire
        })
            .then((data: ISecret) => {
                return {
                    "hash": data.hash,
                    "secretText": data.secretText,
                    "createdAt": new Date(data.createdAt),
                    "expiresAt": data.expiresAt > 0 ? new Date(data.expiresAt) : 'never'
                };
            })
            .catch(() => {
                throw new Error("Error at create secret")
            });
    }
}

export default new SecretService();