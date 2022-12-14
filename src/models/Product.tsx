import BidHistory from "./BidHistory";

interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  bidHistory: BidHistory,
}

export default Product;
