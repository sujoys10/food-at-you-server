const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (_, {input: {email, name, password}}, { prisma }) => {
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.createUser({
        name,
        email,
        password: hash
    })

    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '180 Days' });

    return {
        user,
        token
    }
}

const loginUser = async (_, {input: {email, password}}, { prisma }) => {
    const user = await prisma.user({ email });
    if(!user){
        throw new Error('Invalid Login');
    }

    const passwordMatched = bcrypt.compareSync(password, user.password);
    if(!passwordMatched){
        throw new Error('Invalid Login');
    }

    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '180 Days' });

    return {
        user,
        token
    }
}

const updateUser = async (_, {id, input: {name, address, phone}}, { prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const updatedUser = await prisma.updateUser({
        data: {
            name,
            address,
            phone
        },
        where: {
            id
        }
    });


    return updatedUser;
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}