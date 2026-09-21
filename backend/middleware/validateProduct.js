export const validateProduct = (req, res, next) => {
    const { name, price, description } = req.body;
    if (isNaN(price)) {
        return res.status(400).json({ message: 'Price must be a Number' })

    }
    if (price < 0) {
        return res.status(400).json({
            message: "Price cannot be negative"
        });
    }
    if (!name || price == null || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    

    next();
}
export const validateupdateProduct = (req, res, next) => {
    const { name, price, description } = req.body;
    if (isNaN(price)) {
        return res.status(400).json({ message: 'Price must be a Number' })

    }
    if (price < 0) {
        return res.status(400).json({
            message: "Price cannot be negative"
        });
    }
    if ( !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    if (!name  ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    if ( price == null ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    

    next();
}
