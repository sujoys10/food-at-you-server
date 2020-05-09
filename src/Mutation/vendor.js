const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createVendor = async (_, {input: {email, name, password}}, { prisma }) => {
    const hash = await bcrypt.hash(password, 10);

    const vendor = await prisma.createVendor({
        name: name.toLowerCase(),
        email,
        password: hash
    })

    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '180 Days' });

    return {
        vendor,
        token
    }
}

const loginVendor = async (_, {input: {email, password}}, { prisma }) => {
    const vendor = await prisma.vendor({ email });
    if(!vendor){
        throw new Error('Invalid Login');
    }

    const passwordMatched = bcrypt.compareSync(password, vendor.password);
    if(!passwordMatched){
        throw new Error('Invalid Login');
    }

    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '180 Days' });

    return {
        vendor,
        token
    }
}

const updateVendor = async (_, {id, input: {name, address, phone}}, { prisma, user: vendor }) => {
    if(!vendor){
        throw new Error('Not Authenticated')
    }

    const updatedvendor = await prisma.updateVendor({
        data: {
            name,
            address,
            phone
        },
        where: {
            id
        }
    });

    return updatedvendor;
}

module.exports = {
    createVendor,
    loginVendor,
    updateVendor
}