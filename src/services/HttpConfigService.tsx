const methods = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
};

let headers: any = {};

const getHeaders = () => headers;

// Set header if it doesn't exist.
const setHeader = (header: string, value: string): string => {
  if (headers[header]) {
    return "Header already exists";
  }
  headers[header] = value;
  return "";
};

const removeAllHeaders = () => {
  headers = {};
};

const HttpConfig = {
  methods,
  setHeader,
  getHeaders,
  removeAllHeaders,
};

export default HttpConfig;
