const isValidPrice = (price) => {
return (
price !== undefined &&
price !== null &&
price !== "" &&
Number.isFinite(Number(price)) &&
Number(price) >= 0
);
};

const hasLocalizedValue = (value) => {
return (
value &&
typeof value === "object" &&
(value.ar?.trim?.() || value.en?.trim?.())
);
};

export const validateProduct = (req, res, next) => {
const {
name,
description,
price,
} = req.body || {};

if (!hasLocalizedValue(name)) {
return res.status(400).json({
message: "Product name is required",
});
}

if (!hasLocalizedValue(description)) {
return res.status(400).json({
message: "Product description is required",
});
}

if (!isValidPrice(price)) {
return res.status(400).json({
message: "Price must be a valid positive number",
});
}

next();
};

export const validateupdateProduct = (req, res, next) => {
const {
name,
description,
price,
} = req.body || {};

if (
name !== undefined &&
!hasLocalizedValue(name)
) {
return res.status(400).json({
message: "Product name is invalid",
});
}

if (
description !== undefined &&
!hasLocalizedValue(description)
) {
return res.status(400).json({
message: "Product description is invalid",
});
}

if (
price !== undefined &&
!isValidPrice(price)
) {
return res.status(400).json({
message: "Price must be a valid positive number",
});
}

next();
};
