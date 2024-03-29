export class RestServiceUrl {
    public static BACKEND_URL: string = 'https://miejscowka-backend.herokuapp.com/';

    public static PLACE_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place';

    public static PLACE_OF_LOGGED_USER_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place/user/';

    public static FAVOURITE_PLACE_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place/favourite/';

    public static CATEGORY_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'place/category';

    public static USER_SIGN_UP_ENDPOINT: string = RestServiceUrl.BACKEND_URL + 'user/signup';

    public static AUTHORIZE: string = RestServiceUrl.BACKEND_URL + 'api/authenticate';

    public static IMGUR: string = 'https://api.imgur.com/3/image';

}