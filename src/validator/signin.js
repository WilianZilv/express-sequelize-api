const $ = require("yup");

const schema = $.object().shape({
    email: $.string().email().required(),
    password: $.string().required(),
});

module.exports = async (data) => {
    const valid = await schema.validate(data, {
        abortEarly: false,
    });

    return valid;
};
