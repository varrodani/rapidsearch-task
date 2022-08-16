"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secret_model_1 = __importDefault(require("../models/secret.model"));
const crypto_1 = __importDefault(require("crypto"));
class SecretService {
    getSecret(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = yield secret_model_1.default.findOne({ hash: hash }).exec();
            if (secret.expiresAt > 0 && new Date().getTime() > secret.expiresAt) {
                throw new Error("Secret expired");
            }
            return {
                "hash": secret.hash,
                "secretText": secret.secretText,
                "createdAt": new Date(secret.createdAt),
                "expiresAt": secret.expiresAt > 0 ? new Date(secret.expiresAt) : 'never'
            };
        });
    }
    createSecret(secret, expire) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = crypto_1.default.createHash('md5').update(secret).digest('hex').toString();
            return secret_model_1.default.create({
                hash,
                secretText: secret,
                createdAt: new Date().getTime(),
                expiresAt: expire
            })
                .then((data) => {
                return {
                    "hash": data.hash,
                    "secretText": data.secretText,
                    "createdAt": new Date(data.createdAt),
                    "expiresAt": data.expiresAt > 0 ? new Date(data.expiresAt) : 'never'
                };
            })
                .catch(() => {
                throw new Error("Error at create secret");
            });
        });
    }
}
exports.default = new SecretService();
