module.exports = {
    order_bags: async (parent, { orderBy }, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }
        return await prisma.order({id: parent.id}).order_bags({ orderBy });
    }, 

    customer: async (parent, _, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }
        return await prisma.order({id: parent.id}).customer();
    },

    vendor: async (parent, _, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }
        return await prisma.order({id: parent.id}).vendor();
    }
}