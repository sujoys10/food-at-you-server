const orderBagSubscribe = (_, { filter }, { prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated');
    }
    
    const node = filter ? {
        order: {
            customer: {
                email: filter.customer
            },
            vendor: {
                email: filter.vendor
            }
        },
        id: filter.id
    }: {}
    
    return prisma.$subscribe.orderBag({
         mutation_in: ['CREATED', 'UPDATED'],
         node
    }).node()
}

const orderSubscribe = (_, { filter }, { prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated');
    }
    const node = filter ? {   
        vendor: {
            email: filter.vendor
        }
    }: {}
    return prisma.$subscribe.order(
        { mutation_in: ['CREATED', 'UPDATED']},
        node
    ).node()
}

const itemSubscribe =  (_, { filter }, { prisma, user }) => {
    if(!user){
        throw new Error('Not Authenticated');
    }
    const node = filter ? {
        id: filter.id,
        vendor: {
            id: filter.vendor
        }
    }: {}
    
    let removedItem =  prisma.$subscribe.item(
        { 
            mutation_in: ['CREATED', 'UPDATED'],
            node
        }
    ).node()
    //console.log('rs',{removedItem})
   /*  removedItem = prisma.$subscribe.item(
        { 
            mutation_in: ['DELETED'],
            node
        }
    ).previousValues()

    console.log('rr',{removedItem}) */
    return removedItem;
}

const subscribeToOrderBag = {
    subscribe: orderBagSubscribe,
    resolve: payload => {
        return payload
    }
}

const subscribeToOrder = {
    subscribe: orderSubscribe,
    resolve: payload => {
        return payload
    }
}

const subscribeToItem = {
    subscribe: itemSubscribe,
    resolve: payload => {
        return payload
    }
}

module.exports = {
    subscribeToOrderBag,
    subscribeToOrder,
    subscribeToItem
}

