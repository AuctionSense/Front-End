import Bid from "./Bid";

interface User {
    id: string,
    email: string,
    balance: number,
    bids: Bid[],
}

export default User;