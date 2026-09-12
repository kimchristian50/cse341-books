// 1) Implicit any
function greet(name: string): string {
    return `Hello, ${name.toUpperCase()}`;
}

// 2) Wrong return type (return the proper type using the reduce function using the items array)
function total(items: number[]): number {
    return items.reduce((sum, item) => sum + item, 0);
}

// 3) Property does not exist on type
type Product = { id: number; title: string; price: number };
const p: Product = { id: 1, title: "Notebook", price: 5 };
console.log(p.price);

// 4) Unsafe union usage
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase())
    } else {
        console.log(id);
    }
}

// 5) Optional property used without a check
type User = { name: string; email?: string };
function emailDomain(user: User) {
    if (user.email) {
        return user.email.split("@")[1];
    }
    return null;
}

interface CartItem {
    name?: string;
    price: number;
    qty: number;
}

interface CartSummary {
    subtotal: number;
    tax: number;
    total: number;
}

export function formatCartTotal(CartItem[], taxRate: number) : CartSummary {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * taxRate;
    return {
        subtotal,
        tax,
        total: subtotal + tax
    };
}