# Car Store Backend

### **Short Description:**

An Express application with TypeScript and Express, integrating MongoDB with Mongoose to manage a Car Store. Data integrity was ensured using Mongoose schema validation and Zod.

---

### **Project Setup:**

- Make sure [nodejs](https://nodejs.org/en/download) is installed globally on your os.
- Clone the [repo](https://github.com/SMTamim/car_store_assignment_2_ph_nlwd.git)
  ````
  git clone https://github.com/SMTamim/car_store_assignment_2_ph_nlwd.git
  ````
- Go inside the folder copy **`.env.example`** file and rename the copied file to **`.env`**
- Configure the **`.env`** with your **`mongodb`** server url. And **`port`** number for the app to use.
- Open the folder in terminal.
- Run the following commands one by one to setup the environment:
  ````
  npm i -g yarn
  yarn install
  ````
- Finally run **`yarn dev`** to start the server.
- Or you can build the files using **`yarn build`** and run **`node ./dist/server.js`**

---

### **Features:**
- The app uses express, mongoose, zod and typescript
- It has two collections `cars` and `orders`.
- We can run `CRUD` operations on `cars` collection.
- On `orders` we can create and get data.
- All data for inserting on post request are properly validated using zod and mongoose schema,
- You can retrieve all created cars and update some properties in it
- You can also get the `orders` revenue
- All errors are properly handled. When an error occurs it sends appropriate error message and server's error stack