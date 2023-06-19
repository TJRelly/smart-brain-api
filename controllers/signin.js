const handleSignIn = async (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  try {
    const user = await db
      .select('id', 'name', 'email')
      .from('users')
      .where('email', '=', email)
      .first();
    
    if (user) {
      const isValid = bcrypt.compareSync(password, user.hash);

      if (isValid) {
        res.json(user);
      } else {
        res.status(400).json('wrong credentials');
      }
    } else {
      res.status(400).json('wrong credentials');
    }
  } catch (err) {
    res.status(400).json('wrong credentials');
  }
};

module.exports = {
  handleSignIn
};