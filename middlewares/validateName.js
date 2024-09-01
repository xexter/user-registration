export const validateName = (req, res, next) => {
    const { firstName, lastName } = req.body;
  
    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }
  
    const isFirstNameValid = firstName[0] === firstName[0].toUpperCase();
    const isLastNameValid = lastName[0] === lastName[0].toUpperCase();
  
    if (!isFirstNameValid || !isLastNameValid) {
      return res.status(400).json({ error: 'First and last name must start with a capital letter' });
    }
  
    next();
  };