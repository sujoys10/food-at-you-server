module.exports = {
    users: async (_, { filter, orderBy }, { prisma, user }) => {
        if(!user){
            throw new Error('Not Authenticated')
        }
        const where = filter ? {
            id: filter.id,
            email: filter.email
        } : {}

        const users = await prisma.users({
            where,
            orderBy
        })

        return users;
    },

    vendors: async (_, { filter, orderBy }, { prisma, user: vendor }) => {
        if(!vendor){
            throw new Error('Not Authenticated')
        }

        const where = filter ? {
            id: filter.id,
            email: filter.email,
            name_contains: filter.searchTerm
        } : {}
        const vendors = await prisma.vendors({
            where,
            orderBy
        })

        return vendors
    },

    items: async (_, {filter, orderBy}, {prisma}) => {
        const where = filter ? {
           id: filter.id,
           id_in: filter.idList,
           name: filter.name,
           category: filter.category,
           type: filter.type,
           vendor: { 
               id: filter.vendorID,
               email: filter.vendorEmail
            }
        } : {}

        const items = await prisma.items({
            where,
            orderBy
        })
        return items;
    },

    orders: async (_, {filter, orderBy}, {prisma, user}) => {
        if(!user){
            throw new Error('Not Authenticated')
        }

        const where = filter ? {
            id: filter.id,
            order_number: filter.order_number,
            status: filter.status,
            customer: filter.customer,
            vendor: filter.vendor,
            order_date: filter.order_date,
            delivery_date: filter.delivery_date,
            shipper: filter.shipper 
        } : {}

        const orders = await prisma.orders({
            where, 
            orderBy
        })

        return orders;
    },
    orderBags: async (_, {filter, orderBy, first}, {prisma, user}) => {
        if(!user){
            throw new Error('Not Authenticated')
        }
        const d = new Date();            
        const delivery_date_gt = d.toISOString().split('T')[0];
        d.setDate(d.getDate() + 1);
        const delivery_date_lt = d.toISOString().split('T')[0];

        const where = filter ? {
           order: {
            vendor: {
                email: filter.vendor
            },
            customer: {
                email: filter.customer
            }  
           }, 
           type: filter.type,
           status: filter.status,
           delivery_date: filter.delivery_date,
           delivery_date_lt,
           delivery_date_gt
        } : {}
        const orderBags = await prisma.orderBags({
            where,
            orderBy,
            first
        })
        
        return orderBags;
    },

    deliveryBag: async (_, {filter, orderBy, first}, {prisma, user}) => {
        if(!user){
            throw new Error('Not Authenticated')
        }
        const d = new Date();            
        const delivery_date_gt = d.toISOString();
        d.setHours(23);
        d.setMinutes(59);
        d.setSeconds(59);
        const delivery_date_lt = d.toISOString();


        const where = filter ? {
           order: {
            vendor: {
                email: filter.vendor
            },
            customer: {
                email: filter.customer
            }  
           },
           OR: [
               {
                   status: 'PLACED'
               },
               {
                   status: 'ACCEPTED'
               }
           ], 
           type: filter.type,
           delivery_date: filter.delivery_date,
           delivery_date_lt,
           delivery_date_gt
        } : {}

        const deliveryBag = await prisma.orderBags({
            where,
            orderBy,
            first
        })
        
        return deliveryBag;
    },

    orderedItems: async (_, { orderBy }, {prisma, user}) => {
        if(!user){
            throw new Error('Not Authenticated')
        }

        const orderedItems = await prisma.orderedItems({
            orderBy
        })

        return orderedItems;
    }
}

