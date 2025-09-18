// 代码生成时间: 2025-09-18 11:32:17
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// 定义商品接口
interface Product {
  id: string;
  name: string;
  price: number;
}

// 定义购物车接口
interface CartItem {
  productId: string;
  quantity: number;
}

// 定义购物车服务
class ShoppingCartService {
  private products: Product[] = [];
  private cart: CartItem[] = [];

  constructor(products: Product[]) {
    this.products = products;
  }

  // 添加商品到购物车
  public async addToCart(productId: string, quantity: number): Promise<void> {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    this.cart.push({ productId, quantity });
  }

  // 从购物车中移除商品
  public async removeFromCart(productId: string): Promise<void> {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  // 获取购物车中所有商品
  public async getCart(): Promise<CartItem[]> {
    return this.cart;
  }

  // 清空购物车
  public async clearCart(): Promise<void> {
    this.cart = [];
  }
}

// 创建一个路由器
const router = new Router();
const app = new Application();

// 定义一些商品
const products = [
  { id: '1', name: 'Apple', price: 1.0 },
  { id: '2', name: 'Banana', price: 0.5 },
  { id: '3', name: 'Orange', price: 1.2 },
];

// 创建购物车服务实例
const cartService = new ShoppingCartService(products);

// 添加商品到购物车的路由
router.post('/add-to-cart', async (ctx) => {
  const { productId, quantity } = ctx.request.body();
  try {
    await cartService.addToCart(productId, quantity);
    ctx.response.status = 200;
    ctx.response.body = { message: 'Product added to cart' };
  } catch (error) {
    ctx.response.status = 404;
    ctx.response.body = { error: error.message };
  }
});

// 从购物车移除商品的路由
router.post('/remove-from-cart', async (ctx) => {
  const { productId } = ctx.request.body();
  try {
    await cartService.removeFromCart(productId);
    ctx.response.status = 200;
    ctx.response.body = { message: 'Product removed from cart' };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// 获取购物车商品的路由
router.get('/cart', async (ctx) => {
  try {
    const cart = await cartService.getCart();
    ctx.response.status = 200;
    ctx.response.body = { cart };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// 清空购物车的路由
router.post('/clear-cart', async (ctx) => {
  try {
    await cartService.clearCart();
    ctx.response.status = 200;
    ctx.response.body = { message: 'Cart cleared' };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// 添加路由到应用
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
await app.listen({ port: 8000 });
console.log('Server is running on http://localhost:8000');