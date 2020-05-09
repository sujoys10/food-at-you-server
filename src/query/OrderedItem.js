module.exports = {
    item: async (parent, _, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated');
        }
        return await prisma.orderedItem({id: parent.id}).item();
    }
}