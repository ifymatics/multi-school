import { generateKeyPairSync, privateDecrypt, constants } from "crypto"
import { NextFunction, Request, Response } from "express";

interface KeyObject {
    [key: string]: string;
}

const keyObj: KeyObject = {};

export class ApiKeyController {
    static async createApiKeys(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'my-passphrase'
            }
        });

        keyObj[publicKey] = privateKey;

        res.status(200).json({ name, publicKey, privateKey });
    }

    static async verifyKey(req: Request, res: Response, next: NextFunction) {
        const { encryptedData, userPublicKey } = req.body;

        const decryptedData = privateDecrypt(
            {
                key: keyObj[userPublicKey],
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
                passphrase: "my-passphrase"
            },
            Buffer.from(encryptedData, 'base64')
        ).toString();

        res.json({ message: 'Payment processed successfully', data: decryptedData });
    }
}