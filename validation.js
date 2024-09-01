// User Registration Route
app.post('/register', (req, res, next) => {
    const { firstName, lastName, password, email, phone } = req.body;
    
    // Validate First Name and Last Name
    if (!/^[A-Z][a-z]*$/.test(firstName)) {
        return next({ message: 'First name must start with a capital letter and contain only letters.', status: 400 });
    }
    if (!/^[A-Z][a-z]*$/.test(lastName)) {
        return next({ message: 'Last name must start with a capital letter and contain only letters.', status: 400 });
    }

    // Validate Password
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return next({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one numeric character.', status: 400 });
    }

    // Validate Email Address
    if (!/@/.test(email)) {
        return next({ message: 'Email address must contain "@" symbol.', status: 400 });
    }

    // Validate Phone Number
    if (phone.length < 10) {
        return next({ message: 'Phone number must be at least 10 digits long.', status: 400 });
    }

    // If all validations pass
    res.status(200).json({ message: 'User registered successfully!' });
});