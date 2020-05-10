const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        address: String
        phone: Int
        created_at: String!
        orders(orderBy: OrderOrderByInput): [Order!]
    }

    type UserResponse {
        user: User!
        token: String!
    }

    type Vendor {
        id: ID!
        name: String!
        email: String!
        password: String!
        address: String
        phone: Int
        created_at: String!
        payment_details: String
        rating: Int
        items: [Item!]
        orders(orderBy: OrderOrderByInput): [Order!]
    }

    type VendorResponse {
        vendor: Vendor!
        token: String!
    }

    type Item {
        id: ID!
        name: String!
        category: String!
        type: ItemType!
        url: String
        description: String!
        price: Int!
        is_available: Boolean!
        rating: Int
        vendor: Vendor!
    }


    type Order {
        id: ID!
        order_bags(orderBy: OrderBagOrderByInput): [OrderBag!]!
        total: Int!
        customer: User!
        vendor: Vendor!
        order_date: String!
        delivery_address: String!
        shipper: String
        payment_details: String
        status: OrderStatus
    }

    type OrderBag {
        id: ID!
        type: ItemType!
        order: Order
        status: OrderStatus!
        items: [OrderedItem!]!
        delivery_date: String!
    }

    type OrderedItem {
        id: ID!
        item: Item!
        type: ItemType!
        quantity: Int!
        order_bag: OrderBag!
        delivery_date: String
        status: OrderStatus
    }


    type Query {
        users(filter: UserFilterInput, orderBy: UserOrderByInput): [User!]!
        vendors(filter: VendorFilterInput, orderBy: VendorOrderByInput): [Vendor!]!
        items(filter: ItemFilterInput, orderBy: ItemOrderByInput): [Item!]!
        orders(filter: OrderFilterInput, orderBy: OrderOrderByInput): [Order!]!
        orderBags(filter: OrderBagFilterInput, orderBy: OrderBagOrderByInput, first: Int): [OrderBag!]!
        deliveryBag(filter: OrderBagFilterInput, orderBy: OrderBagOrderByInput, first: Int): [OrderBag!]
        orderedItems(orderBy: OrderedItemOrderByInput): [OrderedItem!]!
    }

    type Mutation {
        createUser(input: CreateUserInput!): UserResponse!
        updateUser(id: ID!, input: UpdateUserInput!): User!
        removeUser(id: ID!): User!
        loginUser(input: LoginInput!): UserResponse!

        createVendor(input: CreateVendorInput!): VendorResponse!
        updateVendor(id: ID!, input: UpdateVendorInput!): Vendor!
        removeVendor(id: ID!): Vendor!
        loginVendor(input: LoginInput!): VendorResponse!

        createItem(input: CreateItemInput!): Item!
        updateItem(id: ID!, input: UpdateItemInput!): Item!
        removeItem(id: ID!): Item!

        createOrder(input: CreateOrderInput!): Order!
        updateOrder(id: ID!, input: UpdateOrderInput): Order!
        removeOrder(id: ID!): Order!

        updateOrderBag(id: ID!, input: UpdateOrderBagInput): OrderBag!

    }

    type Subscription {
        subscribeToOrderBag(filter: OrderBagSubscriptionFilterInput): OrderBag
        subscribeToOrder(filter: OrderSubscriptionFilterInput): Order
        subscribeToItem(filter: ItemSubscriptionFilterInput): Item
    }

    enum ItemType {
        BREAKFAST
        LUNCH
        SNACKS
        DINNER
    }

    enum OrderStatus {
        PLACED
        ACCEPTED
        CANCELLED
        PROCESSING
        DELIVERED
        RECEIVED
    }



    enum UserOrderByInput {
        name_ASC
        name_DESC
        created_at_ASC
        created_at_DESC
    }

    enum VendorOrderByInput {
        name_ASC
        name_DESC
        rating_ASC
        rating_DESC
        created_at_ASC
        created_at_DESC
    }

    enum ItemOrderByInput {
        name_ASC
        name_DESC
        type_ASC
        type_DESC
        category_ASC
        category_DESC
        price_ASC
        price_DESC
        is_available_ASC
        is_available_DESC
    }


    enum OrderOrderByInput {
        order_date_ASC
        order_date_DESC
        status_ASC
        status_DESC
    }

    enum OrderBagOrderByInput {
        type_ASC
        type_DESC
        status_ASC
        status_DESC
        delivery_date_ASC
        delivery_date_DESC
    }

    enum OrderedItemOrderByInput {
        delivery_date_ASC
        delivery_date_DESC
    }

     #create
     input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    input CreateVendorInput {
        name: String!
        email: String!
        password: String!
    }

    input CreateItemInput {
        name: String!
        category: String!
        description: String!
        type: String!
        url: String
        price: Int!
        is_available: Boolean!
        vendor: String!
    }

    input CreateOrderInput {
        orderedItems: [CreateOrderItemInput!]!
        total: Int!
        customer: String!
        vendor: String!
        order_date: String!
        delivery_address: String!
        shipper: String
        payment_details: String
    }

    input CreateOrderItemInput{
        item: String
        type: String
        quantity: Int!
        delivery_date: String
    }

    input CreateOrderBagInput {
        type: String!
        items: [CreateOrderItemInput!]!
        delivery_date: String
    }

    #auth
    input LoginInput {
        email: String
        password: String
    }
    #update
    input UpdateUserInput {
        name: String
        address: String
        phone: Int
    }

    input UpdateVendorInput {
        name: String
        address: String
        phone: Int
        payment_details: String
        rating: Int
    }

    input UpdateItemInput {
        name: String
        category: String
        type: String
        url: String
        description: String
        price: Int
        is_available: Boolean
        rating: Int
    }

    input UpdateOrderInput {
        status: OrderStatus!
    }

    input UpdateOrderBagInput {
        status: String!
    }


    #subscription
    input OrderBagSubscriptionFilterInput {
        id: ID
        customer: String
        vendor: String
    }

    input OrderSubscriptionFilterInput {
        vendor: String
    }

    input ItemSubscriptionFilterInput {
        id: ID
        vendor: String
    }

    #filter
    input UserFilterInput {
        id: ID
        email: String
    }

    input VendorFilterInput {
        id: ID
        email: String
        searchTerm: String
    }

    input ItemFilterInput {
        id: ID
        idList: [ID!]
        name: String
        category: String
        type: String
        vendorID: String
        vendorEmail: String
    }

    input OrderFilterInput {
        id: ID
        order_number: Int
        status: OrderStatus
        customer: String
        vendor: String
        order_date: Int
        delivery_date: Int
        shipper: String
    }

    input OrderBagFilterInput {
        vendor: String,
        customer: String,
        type: String,
        status: String,
        delivery_date: String
    }
   
`
module.exports = typeDefs;