const updateOrderBag = async (_, {id, input: { status }}, { prisma, user}) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const vendorExists = await prisma.$exists.vendor({
        email: user.email
    })

    if(!vendorExists){
        throw new Error('Not Authorized to update')
    }

    const updatedOrderBag = await prisma.updateOrderBag({
        data: {
            status
        },
        where: {
            id
        }
    })

    return updatedOrderBag;
}

module.exports = {
    updateOrderBag
}