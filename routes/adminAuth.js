const router = require("express").Router()
const jwt = require("jsonwebtoken")

// ADMIN LOGIN USING .ENV
router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body

        // Compare with .env values
        if (username !== process.env.ADMIN_USER) {
            return res.status(400).json("Admin not found")
        }

        if (password !== process.env.ADMIN_PASS) {
            return res.status(400).json("Wrong password")
        }

        // Create token
        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            message: "Login success",
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json("Server error")
    }
})

module.exports = router
