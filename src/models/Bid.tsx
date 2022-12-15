import User from "./User";

interface Bid {
    id: string,
    amount: number,
    date: Date,
    user: User,
    bidhistory: number,
}

export default Bid;