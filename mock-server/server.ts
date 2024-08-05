import express, { Request, Response } from "express"
import fs from "fs"
import path from "path"
import cors from "cors"

const app = express()
const PORT = 9000
let data

app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, "db.json")

try {
    data = JSON.parse(fs.readFileSync(dbPath, "utf8"))
} catch (error) {
    console.error("Failed to read or parse db.json:", error)
    process.exit(1)
}

interface CheckItemWithId extends CheckItem {
    id: number
}

export interface CheckItem {
    isAvailable?: boolean
    domain?: string
    isPremium?: boolean
    discountCode?: "DISCOUNT_20" | "DISCOUNT_50" | "RENEWAL_DISCOUNT_90"
}

interface DB {
    check: CheckItemWithId[]
}

// Endpoint to check domain availability
app.get("/check", (req: Request, res: Response) => {
    const domainName = req.query.domain as string
    const db: DB = data

    if (!domainName) {
        return res
            .status(400)
            .json({ error: "Domain query parameter is required" })
    }

    const result = db.check.find(item => item.domain === domainName)

    if (result) {
        const { domain, isAvailable, isPremium, discountCode } = result
        return res.json({ domain, isAvailable, isPremium, discountCode })
    } else {
        return res.status(404).json({})
    }
})

app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`)
})
