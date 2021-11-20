export class RestServiceUrl {
    public static BACKEND_URL: string = 'http://localhost:8080/';

    public static PLACE_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place';

    public static CATEGORY_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place/category';

    public static USER_SIGN_UP_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'user/signup';
}