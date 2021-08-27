import * as bcrypt from "bcryptjs";

export class HashManager {
    public async hash(textToHide: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)

        return bcrypt.hash(textToHide, salt)
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash)
    }
}