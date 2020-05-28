const $ = require("yup");
const assert = require("assert");

const schema = $.object().shape({
    email: $.string().email().required(),
    name: $.string().min(2).required(),
    lastName: $.string().min(2).required(),
    password: $.string().required().min(6),
    verification: $.string().required().min(6),
});

module.exports = async (data) => {
    const valid = await schema.validate(data, {
        abortEarly: false,
    });

    assert(data.password === data.verification, "Senhas diferentes");
    return valid;
};
