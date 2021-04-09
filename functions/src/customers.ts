import {db, stripe} from './config';
import { assert } from './config';

export const getUser = async (uid: string) => {
    return await db.collection(`users`).doc(uid).get().then(doc => doc.data());
};

export const getCustomer = async (uid: string) => {
    const user = await getUser(uid);
    return assert(user, 'stripeCustomerId');
};

export const updateUser = async(uid: string, data: Object) => {
    return await db.collection('users').doc(uid).set(data, { merge: true });
};

export const createCustomer = async (uid: any) => {
    const customer = await stripe.customers.create({
        metadata: { firebaseUID: uid }
    });

    await updateUser(uid, { stripeCustomerId: customer.id })

    return customer;
};

export const getOrCreateCustomer = async (uid: string) => {

    const user = await getUser(uid);
    const customerId = user && user.stripeCustomerId;

    // If missing customerID, create it
    if (!customerId) {
        return createCustomer(uid);
    } else {
        return stripe.customers.retrieve(customerId);
    }



