const filterItems = require('../utils/filterItems');

const createOrder = async (_, {input: {orderedItems, total, customer, vendor, order_date, delivery_address, shipper, payment_details}}, {prisma, user}) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const allItems = [];

    orderedItems.map(item => {
        let obj = {
           item: {
               connect: { id: item.item }
           },
           type: item.type,
           quantity: item.quantity,
           delivery_date: item.delivery_date 
        }
        allItems.push(obj)
    })

    const bagItems = filterItems(allItems);

    //delivery bag => grouping items as per type
    const bag = [];

    for(let items in bagItems){
        bagItems[items].length !== 0 &&
            bagItems[items].map(item => {
                let obj = {
                    type: item.type,
                    delivery_date: item.delivery_date,
                    items: {
                        create: bagItems[items]
                    }
                }
                console.log({obj}, bagItems[items])
                bag.push(obj);
            })
    }
    //console.log({bag})
    
    const order = await prisma.createOrder({
        order_bags: {
            create: bag
        },
        customer: {
            connect: { email: customer}
        },
        vendor: {
            connect: { id : vendor}
        },
        total,
        order_date,
        delivery_address,
        shipper,
        payment_details
    })

    return order;
}

const updateOrder = async (_, {id, input: {status}}, {prisma, user}) => {
    if(!user){
        throw new Error('Not Authenticated')
    }

    const updatedOrder = await prisma.updateOrder({
        data: {
            status
        },
        where: {
            id
        }
    })

    return updatedOrder;
}

module.exports = {
    createOrder,
    updateOrder
}