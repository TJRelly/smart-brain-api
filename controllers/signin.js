const handleSignIn = async (req, res, bcrypt, db) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json("incorrect form submission")
  }

  try {
    const data = await db
      .select("email", "hash")
      .from("login")
      .where("email", "=", email)
    const isValid = bcrypt.compareSync(password, data[0].hash)

    if (isValid) {
      const user = await db.select("*").from("users").where("email", "=", email)
      res.json(user[0])
    } else {
      res.status(400).json("wrong credentials")
    }
  } catch (err) {
    res.status(400).json("wrong credentials")
  }
}

module.exports = {
  handleSignIn,
}
