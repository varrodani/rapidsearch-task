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
const express_1 = __importDefault(require("express"));
const secret_service_1 = __importDefault(require("../services/secret.service"));
const router = express_1.default.Router();
router.get('/secret/:hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretObject = yield secret_service_1.default.getSecret(req.params.hash);
        return res.json(secretObject);
    }
    catch (e) {
        return res.status(404).send('Secret not found');
    }
}));
router.post('/secret', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = req.body.secret;
        const expire = req.body.expireAfter;
        const secretObject = yield secret_service_1.default.createSecret(secret, expire);
        return res.json(secretObject);
    }
    catch (e) {
        return res.status(405).send('Invalid input');
    }
}));
exports.default = router;
