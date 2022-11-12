import Genre from "./Genre";

interface Category {
  id: string;
  name: string;
  genres: Genre[];
}

export default Category;
