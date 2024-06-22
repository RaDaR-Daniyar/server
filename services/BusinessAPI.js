import StoreService from "./storeService.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

async function makeApiRequest() {
    try {
        const products = await StoreService.getProducts();
        return products;
    } catch (error) {
        console.error("Ошибка:", error.message);
    }
}

async function send(data) {

    let products = []
    let added = await Order.getOrderItems({ where: { order_id: data.id }})
    for(let item of added) {
        products.push(item)
    }
  
    if(products.length) {
        let partnerId
        const getPartner = await StoreService.getPartnerByPhone(data.phone)

        if(getPartner.length) {
            const partner = getPartner[0]
            partnerId = partner.result.id
        } else {
            const partner = await StoreService.createPartner(data.name, data.phone, data.email)
            partnerId = partner.result.id
        }
        const order = await StoreService.createOrder(1, 'maguapay', partnerId, data.address, data.comment, products, null)
        console.log(order)
        return order
    }
}
  
export { makeApiRequest, send };