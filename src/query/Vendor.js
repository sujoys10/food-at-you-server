module.exports = {
    items: async (parent, _, {prisma, user: vendor}) => {
        if(!vendor){
            throw new Error('Not Authenticated');
        }
        return await prisma.vendor({id: parent.id}).items();
    },

    orders: async (parent, { orderBy }, {prisma, user: vendor}) => {
        if(!vendor){
            throw new Error('Not Authenticated');
        }
        return await prisma.vendor({id: parent.id}).orders({ orderBy });
    },

}