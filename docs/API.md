# search

[src/flywheel.js:77-87](https://github.com/jchavarri/flywheeljs/blob/30f35aa89ea0acb024817e39985c71682f5ca7df/src/flywheel.js#L77-L87 "Source code on GitHub")

Search cabs

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Options object parameter
    -   `$0.by` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** The field to search by (optional, default `'location'`)
    -   `$0.filter` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** A filter to be applied to the search request (optional, default `'hailable'`)
    -   `$0.latitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default latitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.longitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default longitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.authToken` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** User authentication token (if she's logged) (optional, default `'(null)'`)

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** search - An object containing:

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** search.drivers - Array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.

# signup

[src/flywheel.js:50-63](https://github.com/jchavarri/flywheeljs/blob/30f35aa89ea0acb024817e39985c71682f5ca7df/src/flywheel.js#L50-L63 "Source code on GitHub")

Register a new user on the Flywheel service

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Options object parameter
    -   `$0.firstName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user first name
    -   `$0.email` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user email
    -   `$0.password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user password
    -   `$0.telephone` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Flywheel user phone number
    -   `$0.latitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default latitude (in degrees) used when ordering cabs (optional, default `0`)
    -   `$0.longitude` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Default longitude (in degrees) used when ordering cabs (optional, default `0`)

**Examples**

```javascript
flywheel.signup({
  firstName: 'John',
  email: 'john@doe.com',
  password: 'johndoe123',
  telephone: 'johndoe123',
  latitude: 37.7,
  longitude: -122.4
})
.then(response => {
  console.log(response.data.passenger);
})
.catch(response => {
  console.log(response.data.error);
});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** signup - An object containing:

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** signup.auth_token - The token that can be used for future requests

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** signup.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.
