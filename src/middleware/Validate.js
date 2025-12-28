export const validate = (schema) => (req, res, next) => {
    try {

        console.log("REQ BODY:", req.body); // 🔍 debug

        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query

        });

        next();
    } catch (error) {
        return res.status(400).json({
            message: "validation failed",
            //errors: error.errors
            errors: error.issues,
        })
    }

}