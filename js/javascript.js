
// pour representer les produits

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product; 
        this.quantity = quantity; 
    }

     // calculer le prix total

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Representer un element du panier
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Pour ajouter un produit

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; 
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem); 
        }
        this.displayItems(); 
    }

     // suprimer un element du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId); 
        this.displayItems(); 
    }
    // pour obtenir le total des elements dans un panier

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // pour afficher les elements du panier

    displayItems() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = ''; 
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `${item.product.name} - Quantité: ${item.quantity} - Prix total: ${item.getTotalPrice()} CFA 
                <button onclick="removeFromCart(${item.product.id})">Supprimer</button>`;
            cartItemsDiv.appendChild(itemDiv);
        });
        document.getElementById('total').innerText = `Total du panier: ${this.getTotal()} CFA`;
    }
}

const cart = new ShoppingCart();

function addToCart(id, name, price) {
    const product = new Product(id, name, price);
    cart.addItem(product, 1);
}

function removeFromCart(productId) {
    cart.removeItem(productId);
}
