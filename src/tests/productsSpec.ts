import supertest from 'supertest';
import app from '../server';
import { Product, ProductStore } from '../models/products'; // as recommended by Udacity I am importing the model (in contract to the other test cases)

const request = supertest(app);
const store = new ProductStore();

var token: string;
var userId: number;
let productId: string; // variable to hold the newly created productId

/* ===============================================================================
Routes in handler: 
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create); // verifyAuthToken
  app.delete('/products/:id', destroy); // verifyAuthToken
  app.post('/products/:id/products', addProduct); // verifyAuthToken
================================================================================== */

// With this function a new test user is created
async function createUserAndSetToken() {
  try {
    const userData = {
      login: 'npm_test_user',
      firstName: 'Test-user',
      lastName: 'For-npm-run-test',
      password: 'jasmtestusr',
    };

    const response = await request.post('/users').send(userData);
    console.log(`response.body: ${JSON.stringify(response.body)}`);
    token = response.body;
    console.log(`1 function createUserAndSetToken: token ${token}`);
    userId = response.body.id;
  } catch (err: any) {
    console.error('Error creating user:', err);
  }
  console.log(`2 function createUserAndSetToken: token ${token}`);
}

async function deleteUser() {
  try {
    await request
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`); // Pass the token in the headers
  } catch (err: any) {
    console.error('Error delete user:', err);
  }
}

beforeAll(async () => {
  console.log(`Sequence 1`);
  await createUserAndSetToken();
});

afterAll(async () => {
  await deleteUser();
});

xdescribe('PRODUCTS\n------------\n\nTesting products handler', () => {
  it('GET /products --> gets the products index endpoint', async () => {
    const response = await request.get('/products'); // Make API call
    expect(response.status).toBe(200);
  });

  it('GET /products/:id (existing) --> should return the product with the given id', async () => {
    const productId = '1'; // To be an existing product
    const response = await request.get(`/products/${productId}`); // Make API call

    // Tests
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Crampon');
  });

  it('GET /products/:id (not existing) --> should return a 400 status if the product does not exist', async () => {
    const nonExistentId = '99999'; // To be a non-existent product ID
    const response = await request.get(`/products/${nonExistentId}`); // Make the POST request

    // Tests
    expect(response.status).toBe(400);
  });

  it('POST /products[/:id] --> should create a new product', async () => {
    console.log(`Sequence 2`);
    // Create test data
    const productData = {
      title: 'Test Product to be deleted 1',
      description: 'Description for test product 1',
      image_file: 'test.jpg',
      price: 99.99,
      categoryId: 1,
    };

    console.log(`token ${token}`);

    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(productData); // Make API call

    productId = response.body.id; // generated catetory id

    // Tests
    expect(response.status).toBe(200);
    expect(response.body.hasOwnProperty('id')).toBe(true);
  });

  it('DELETE /products[/:id] (existing) --> should delete test product', async () => {
    const response = await request
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`); // Pass the token in the headers

    // Tests
    expect(response.status).toBe(200);
    expect(response.body.hasOwnProperty('id')).toBe(true);
  });

  it('DELETE /products[/:id] (not existing) --> should return a 400 status if the product does not exist', async () => {
    const nonExistentId = '99999'; // To be a non-existent product ID
    const response = await request
      .delete(`/products/${nonExistentId}`) // Make API call
      .set('Authorization', `Bearer ${token}`); // Pass the token in the headers
    // Tests
    expect(response.status).toBe(400);
  });
});

xdescribe('Testing products model', () => {
  it('create and index of products', async () => {
    const product: Product = {
      // Product to be created
      title: 'Test product to be deleted 2',
      description: 'Description for test product 2',
      imageFile: 'laptop.jpg',
      price: 800,
      categoryId: 6,
    };
    const prod = await store.create(product); // Create product in DB

    const products = await store.index();

    expect(products.length).toBeGreaterThan(0);

    console.log(`prod.id ${prod.id} token ${token}`);

    // delete Test Product
    await request
      .delete(`/products/${prod.id}`)
      .set('Authorization', `Bearer ${token}`); // Pass the token in the headers
  });

  it('create and show of products', async () => {
    const product: Product = {
      // Product to be created
      title: 'Test product to be deleted 3',
      description: 'Description for test product 3',
      imageFile: 'laptop.jpg',
      price: 800,
      categoryId: 6,
    };
    const prod = await store.create(product); // Create product in DB

    if (prod.id !== undefined) {
      // if product was created, the id is returned
      const p = await store.show(prod.id.toString()); // we call the show function to get the prod
      expect(p.id).toBe(prod.id);

      // delete Test Product
      await request
        .delete(`/products/${p.id}`)
        .set('Authorization', `Bearer ${token}`); // Pass the token in the headers
    } else {
      fail('Product creation failed');
    }
  });

  it('create and delete of products', async () => {
    const product: Product = {
      // Product to be created/deleted
      title: 'Test product to be deleted 4',
      description: 'Description for test product 4',
      imageFile: 'laptop.jpg',
      price: 800,
      categoryId: 6,
    };
    const prod = await store.create(product); // Create product in DB

    if (prod.id !== undefined) {
      // if product was created, the id is returned
      const p = await store.delete(prod.id.toString()); // we call the delete function to get the prod
      expect(p.id).toBe(prod.id);
    } else {
      fail('Product creation failed');
    }
  });
});
