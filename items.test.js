process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require('./app');
const item = require('./fakeDb')

let laptop = { name: "laptop", price: 599 };

beforeEach(() => {
    item.push(laptop);
});

afterEach(() => {
    item.length = 0;
});


describe('GET /items', function () {

    test('get all items', async () => {

        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: [laptop] });
    })

    test('get a item', async () => {

        const res = await request(app).get(`/items/${laptop.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: laptop });
    })
})

describe('Post /items', function () {

    test("create a new item", async () => {
        const res = await request(app).post('/items').send({ name: "Desktop", price: 999 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: { name: "Desktop", price: 999 } });
    })
})


describe("Patch /items", function () {

    test('Edit a item', async () => {

        const res = await request(app).patch('/items/laptop').send({ name: "Dell laptop", price: 699 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "Dell laptop", price: 699 } });
    })

    test('respond with 404 if item not found', async () => {
        const res = await request(app).patch('/items/something').send({ name: "Dell laptop" });
        expect(res.statusCode).toBe(404);
    })
})


describe("Delete /items", function () {

    test('delete a item', async () => {

        const res = await request(app).delete(`/items/${laptop.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "DELETED" });
    })

    test('respond with 404 if item not found', async () => {
        const res = await request(app).delete('/items/something');
        expect(res.statusCode).toBe(404);
    })
})