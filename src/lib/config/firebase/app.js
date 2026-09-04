import { initializeApp } from 'firebase/app';
import firebaseConfig from './init';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc, updateDoc, query, orderBy, limit } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const writeOrder = async (cartItems) => {
    //write to db and try to get id
    const postsRef = collection(db, "orders")
    const docRef = await addDoc(postsRef, { fulfilled: false });
    const innerColRef = collection(db, `orders/${docRef.id}/items`)
    try {
        cartItems.map(async (i) => await addDoc(innerColRef, {
            name: i.name,
            price: i.price,
            size: i.size,
            qty: i.qty,
            id: i.id
        }))
    } catch (error) {
        console.error("Error writing order: ", error);
    }
    return docRef.id
}
export const getOrder = async (id) => {
    const docRef = doc(db, "orders", id)
    const docSnap = await getDoc(docRef)
    const innerColRef = collection(db, `orders/${id}/items`)
    const docsSnapshot = await getDocs(innerColRef)
    const productList = docsSnapshot.docs.map((v) => v.data())
    const data = docSnap.data()
    return { data, productList }
}