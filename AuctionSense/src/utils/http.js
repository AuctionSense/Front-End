const GetBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = '';
        break;
      case 'development':
      default:
        url = 'http://localhost:8080/api/';
    }
  
    return url;
  }
  
  export default GetBaseUrl