


class CartItem {
    constructor(id, productId, quantity) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;

    }
}

getSubtotal()
{
    return this.quantity * this.price;
}

export default CartItem;