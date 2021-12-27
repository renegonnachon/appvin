const Buyer = require('../models/Buyers/Buyer');

const faker = require('faker');
const fakerJa = require('faker/locale/ja');
const fakerRu = require('faker/locale/ru');
const fakerAr = require('faker/locale/ar');

const createBuyer = async (req, res) => {
  const countries = [faker, faker, faker, fakerJa, fakerRu, fakerAr];
  const index = Math.floor(Math.random() * countries.length);

  try {
    const country = countries[index];

    const buyerObject = {
      firstName: country.name.firstName(),
      lastName: country.name.lastName(),
    };

    console.log(`${country.name.firstName()} ${country.name.lastName()}`);

    const newBuyer = new Buyer(buyerObject);
    try {
      const buyer = await newBuyer.save();
      res.status(201).send(buyer);
    } catch (err) {
      console.log('err', err);
      res.send(err);
    }
  } catch (err) {
    console.log('err', err);
    res.send(err);
  }
};

module.exports = {
  createBuyer,
};
