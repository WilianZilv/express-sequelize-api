const bcrypt = require("bcrypt");
const assert = require("assert");

const validateSignIn = require("../validator/signIn");
const validateSignUp = require("../validator/signUp");
const db = require("../database");

const { sign } = require("../factories/userToken");

module.exports.sign_in = async (req) => {
    await validateSignIn(req.body);

    const { email, password } = req.body;

    const user = await db.user.findOne({
        where: {
            email,
        },
    });

    assert(user, "Usuário não encontrado");

    assert(await bcrypt.compare(password, user.password), "Senha incorreta");

    const token = sign({
        id: user.id,
        email,
    });
    return { token, user: { name: user.name } };
};

module.exports.sign_up = async (req) => {
    await validateSignUp(req.body);

    const { name, lastName, email, password } = req.body;

    assert(
        !(await db.user.findOne({
            where: {
                email,
            },
        })),
        "Email já cadastrado"
    );

    const salt = await bcrypt.genSalt(1);
    const hash = await bcrypt.hash(password, salt);
    const user = await db.user.create({
        name,
        lastName,
        email,
        password: hash,
    });
    const token = sign({ id: user.id, email });
    return { token, user: { name } };
};
