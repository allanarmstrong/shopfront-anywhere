import { gql } from 'react-apollo';

const CheckoutFragment = gql`
fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems(first: 250) {
        edges {
            node {
                id
                title
                variant {
                    id
                    title
                    image {
                        src
                    }
                    price
                }
                quantity
            }
        }
    }
}`;

export const createCheckout = gql`
    mutation ($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            userErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

