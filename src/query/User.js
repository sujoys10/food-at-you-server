module.exports = {
    orders: async (parent, { orderBy }, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }
        return await prisma.user({id: parent.id}).orders({ orderBy })
    }
}