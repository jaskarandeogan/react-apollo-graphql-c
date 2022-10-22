import { gql } from "apollo-server-express";
import { find, remove, filter } from "lodash";
import { people, cars } from "./peopleCarsScheme";

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String
    lastName: String
  }
  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: Float
    personId: String
  }

  type Query {
    people: [Person]
    person(id: String!): Person
    cars: [Car]
    car(id: String!): Car
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String, lastName: String): Person
    deletePerson(id: String!): Person

    addCar(
      id: String
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: String!
    ): Car
    updateCar(
      id: String!
      year: Int
      make: String
      model: String
      price: Float
      personId: String
    ): Car
    deleteCar(id: String!): Car
  }
`;
const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id });
    },
    cars: () => cars,
    car(parent, args, context, info) {
      return find(cars, { id: args.id });
    },
  },
  Mutation: {
    // add person
    addPerson(parent, args, context, info) {
      const newPerson = {
        id: people.length + 1,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },
    //Update person
    updatePerson(parent, args, context, info) {
      const person = find(people, { id: args.id });
      if (!person) {
        throw new Error("Person not found");
      }
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    //Delete person
    deletePerson(parent, args, context, info) {
      const person = find(people, { id: args.id });
      if (!person) {
        throw new Error("Person not found");
      }
      remove(people, (person) => person.id === args.id);
      return person;
    },

    //Add car
    addCar(parent, args, context, info) {
      const newCar = {
        id: cars.length + 1,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    //Update car
    updateCar(parent, args, context, info) {
      const car = find(cars, { id: args.id });
      if (!car) {
        throw new Error("Car not found");
      }
      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    //Delete car
    deleteCar(parent, args, context, info) {
      const car = find(cars, { id: args.id });
      if (!car) {
        throw new Error("Car not found");
      }
      remove(cars, (car) => car.id === args.id);
      return car;
    },
  },
};

export { typeDefs, resolvers };
