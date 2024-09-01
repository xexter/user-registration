export const validatePassword = (req, res, next) => {
    const { password } = req.body;
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
  
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.',
      });
    }
  
    next();
  };