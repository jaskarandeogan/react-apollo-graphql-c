import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query GetPeople {
    people {
      id
      firstName
      lastName
    }
  }
`;

// export const GET_PERSON_CARS = gql`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String, $lastName: String) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
    query GetCars {
        cars {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const ADD_CAR = gql`
    mutation AddCar($id: String, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
        addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const UPDATE_CAR = gql`
    mutation UpdateCar($id: String!, $year: Int, $make: String, $model: String, $price: Float, $personId: String) {
        updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const DELETE_CAR = gql`
    mutation DeleteCar($id: String!) {
        deleteCar(id: $id) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;


