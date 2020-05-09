const createItem = async (_, {input: {name, category, type, url, description, price, is_available, vendor} }, {prisma, user}) => {
    if(!user){
        throw new Error('Not Authenticated')
    }
    const vendorExists = await prisma.$exists.vendor({
        email: user.email
    })


    if(!vendorExists){
        throw new Error('Not Authorized to update')
    }

    const item = await prisma.createItem({
        name,
        category,
        type,
        url,
        description,
        price,
        is_available,
        vendor: {
            connect: { email: vendor }
        }
    });

    return item;
}


const updateItem = async (_, {id, input: {name, category, type, url, description, price, is_available, rating}}, {prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const vendorExists = await prisma.$exists.vendor({
        email: user.email
    })

    if(!vendorExists){
        throw new Error('Not Authorized to update')
    }

    const updatedItem = await prisma.updateItem({
        data: {
            name,
            category,
            type,
            url,
            description,
            price,
            is_available,
            rating
        },
        where: {
            id
        }
        
    });


    return updatedItem;
}

const removeItem = async (_, { id }, { prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const vendorExists = await prisma.$exists.vendor({
        email: user.email
    })

    if(!vendorExists){
        throw new Error('Not Authorized to update')
    }

    const removedItem = await prisma.deleteItem({id});

    return removedItem;
}

module.exports = {
    createItem,
    updateItem,
    removeItem
}