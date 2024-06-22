import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = express.Router();

const ALGORITHM = "aes-256-ctr";

function encrypt(plaintext, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + encrypted;
}

export function decrypt(encrypted, key) {
    const iv = Buffer.from(encrypted.slice(0, 32), "hex");
    const encryptedText = encrypted.slice(32);
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        Buffer.from(key, "hex"),
        iv
    );
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
router.get("/instagram-posts", async (req, res) => {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const plaintextAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const encryptedAccessToken = encrypt(plaintextAccessToken, encryptionKey);
    const decryptedAccessToken = decrypt(encryptedAccessToken, encryptionKey);
  
    try {
        const response = await axios.get(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${decryptedAccessToken}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Instagram posts:", error.message);
        res.status(500).json({ message: "Error fetching Instagram posts" });
    }
  });
  
  export default router;