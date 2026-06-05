function createCart() {
    let items = [];
    let currentDiscount = { type: "none", value: 0 };

    return {
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (currentDiscount.type === "percentage") {
                return subTotal * (1 - currentDiscount.value);
            } else if (currentDiscount.type === "fixed") {
                return Math.max(0, subTotal - currentDiscount.value);
            }
            return subTotal;
        },

        applyDiscount(code) {
            if (code === "SALE10") {
                currentDiscount = { type: "percentage", value: 0.1 };
            } else if (code === "SALE20") {
                currentDiscount = { type: "percentage", value: 0.2 };
            } else if (code === "FREESHIP") {
                currentDiscount = { type: "fixed", value: 30000 };
            } else {
                currentDiscount = { type: "none", value: 0 };
            }
        },

        printCart() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = this.getTotal();

            console.log("┌" + "─".repeat(70) + "┐");
            console.log(`│ ${"#".padEnd(3)} │ ${"Sản phẩm".padEnd(20)} │ ${"SL".padEnd(4)} │ ${"Đơn giá".padEnd(15)} │ ${"Tổng".padEnd(15)} │`);
            console.log("├" + "─".repeat(70) + "┤");

            items.forEach((item, index) => {
                const stt = (index + 1).toString().padEnd(3);
                const name = item.name.padEnd(20);
                const qty = item.quantity.toString().padEnd(4);
                const price = item.price.toLocaleString("vi-VN").padEnd(15);
                const itemTotal = (item.price * item.quantity).toLocaleString("vi-VN").padEnd(15);
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${itemTotal} │`);
            });

            console.log("├" + "─".repeat(70) + "┤");
            
            if (currentDiscount.type !== "none") {
                console.log(`│ Tạm tính:${subTotal.toLocaleString("vi-VN").padStart(57)}đ │`);
                let discountText = "";
                if (currentDiscount.type === "percentage") {
                    discountText = `-${(currentDiscount.value * 100)}%`;
                } else {
                    discountText = `-${currentDiscount.value.toLocaleString("vi-VN")}đ`;
                }
                console.log(`│ Giảm giá (${discountText}):${(subTotal - total).toLocaleString("vi-VN").padStart(46)}đ │`);
            }
            
            console.log(`│ Tổng cộng:${total.toLocaleString("vi-VN").padStart(56)}đ │`);
            console.log("└" + "─".repeat(70) + "┘");
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            currentDiscount = { type: "none", value: 0 };
        }
    };
}

const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());