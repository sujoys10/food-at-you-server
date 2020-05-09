module.exports = {
    vendor: async (parent, _, {prisma}) => {
        return await prisma.item({id: parent.id}).vendor();
    }
}