const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = '';
        break;
      case 'development':
      default:
        url = 'localhost:8080/api/';
    }
  
    return url;
  }
  
  export default getBaseUrl