module.exports = {
    items: async (parent, _, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }

        return await prisma.orderBag({id: parent.id}).items();
    }
}