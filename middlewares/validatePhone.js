export const validatePhone = (req, res, next) => {
    const { phone } = req.body;
  
    if (!phone || phone.length < 10) {
      return res.status(400).json({ error: 'Phone number must be at least 10 digits' });
    }
  
    next();
  };
  