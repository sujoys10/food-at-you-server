"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Vendor",
    embedded: false
  },
  {
    name: "Item",
    embedded: false
  },
  {
    name: "CartItem",
    embedded: false
  },
  {
    name: "OrderBag",
    embedded: false
  },
  {
    name: "OrderedItem",
    embedded: false
  },
  {
    name: "Order",
    embedded: false
  },
  {
    name: "ItemType",
    embedded: false
  },
  {
    name: "OrderStatus",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://192.168.99.100:4466/`
});
exports.prisma = new exports.Prisma();
