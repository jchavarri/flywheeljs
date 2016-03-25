## Objects

<dl>
<dt><a href="#flywheel">flywheel</a> : <code>object</code></dt>
<dd><p>The flywheel library public Object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MyType1">MyType1</a> : <code>Object</code></dt>
<dd><p>A type definition.</p>
</dd>
<dt><a href="#MyType2">MyType2</a> : <code>Object</code></dt>
<dd><p>A type definition.</p>
</dd>
</dl>

<a name="flywheel"></a>

## flywheel : <code>object</code>
The flywheel library public Object

**Kind**: global namespace

* [flywheel](#flywheel) : <code>object</code>
    * [.signup(options)](#flywheel.signup) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Object</code>
    * [.search(options)](#flywheel.search) ⇒ <code>Object</code> &#124; <code>Array</code>
    * [.login(options)](#flywheel.login) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Object</code> &#124; <code>Array</code>
    * [.applicationContext(options)](#flywheel.applicationContext) ⇒ <code>Object</code> &#124; <code>Array</code> &#124; <code>Object</code>
    * [.userInfo(options)](#flywheel.userInfo) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Array</code>
    * [.eta(options)](#flywheel.eta) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Array</code>
    * [.createRide(options)](#flywheel.createRide) ⇒ <code>MyType</code>
    * [.getRideStatus()](#flywheel.getRideStatus) ⇒ <code>Promise</code>

<a name="flywheel.signup"></a>

### flywheel.signup(options) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Object</code>
Register a new user on the Flywheel service

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - signup - An object containing:<code>String</code> - signup.auth_token - The token that can be used for future requests<code>Object</code> - signup.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options object parameter |
| options.firstName | <code>String</code> |  | Flywheel user first name |
| options.email | <code>String</code> |  | Flywheel user email |
| options.password | <code>String</code> |  | Flywheel user password |
| options.telephone | <code>String</code> |  | Flywheel user phone number |
| [options.latitude] | <code>Number</code> | <code>0</code> | Default latitude (in degrees). This value can be overriden when ordering a cab |
| [options.longitude] | <code>Number</code> | <code>0</code> | Default longitude (in degrees). This value can be overriden when ordering a cab |

**Example**
```js
flywheel.signup({
  firstName: 'John',
  email: 'john@doe.com',
  password: 'johndoe123',
  telephone: 'johndoe123',
  latitude: 37.615223,
  longitude: -122.389977
})
.then(response => {
  console.log(response.data.passenger);
})
.catch(response => {
  console.log(response.data.error);
});
```
<a name="flywheel.search"></a>

### flywheel.search(options) ⇒ <code>Object</code> &#124; <code>Array</code>
Search cabs

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - search - An object containing:<code>Array</code> - search.drivers - Array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Options object parameter |
| [options.by] | <code>String</code> | <code>&#x27;location&#x27;</code> | The field to search by |
| [options.filter] | <code>String</code> | <code>&#x27;hailable&#x27;</code> | A filter to be applied to the search request |
| [options.latitude] | <code>Number</code> | <code>0</code> | Default latitude (in degrees) used when ordering cabs |
| [options.longitude] | <code>Number</code> | <code>0</code> | Default longitude (in degrees) used when ordering cabs |
| [options.authToken] | <code>Number</code> | <code>&#x27;(null)&#x27;</code> | User authentication token (if she's logged) |

<a name="flywheel.login"></a>

### flywheel.login(options) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Object</code> &#124; <code>Array</code>
Login a user

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - login - An object containing:<code>String</code> - login.auth_token - The authentication token that can be used in subsequent requests<code>Object</code> - login.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.<code>Array</code> - login.scheduled_rides - Array containing the user scheduled rides

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object parameter |
| options.email | <code>String</code> | The user email |
| options.password | <code>String</code> | The user password |

<a name="flywheel.applicationContext"></a>

### flywheel.applicationContext(options) ⇒ <code>Object</code> &#124; <code>Array</code> &#124; <code>Object</code>
Get application context given a specific location.

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - applicationContext - An object containing the application context. The most interesting fields returned are:<code>Array</code> - applicationContext.service_availabilities - An array of the services available at the given location. The service 'id' parameter is required for other requests (createRide, for example)<code>Object</code> - applicationContext.on_board_cancellation_window - The amount of time (in secs) allowed to cancel a ride without being charged

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object parameter |
| options.authToken | <code>String</code> | An authentication token |
| options.latitude | <code>Number</code> | A given latitude (in degrees) used when ordering cabs |
| options.longitude | <code>Number</code> | A given longitude (in degrees) used when ordering cabs |

<a name="flywheel.userInfo"></a>

### flywheel.userInfo(options) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Array</code>
Get user info

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - userInfo - An object containing the user information. The most interesting fields returned are:<code>String</code> - userInfo.id - The user (passenger) id<code>Array</code> - userInfo.payment_instruments - An array with the payment instruments allowed by the user. The most useful field of each payment instrument is 'token'

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object parameter |
| options.userId | <code>String</code> | The user id. It can be obtained from the 'passenger' object after logging in |
| options.authToken | <code>String</code> | The authentication token |

<a name="flywheel.eta"></a>

### flywheel.eta(options) ⇒ <code>Object</code> &#124; <code>String</code> &#124; <code>Array</code>
Get estimated time of arrival

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Object</code> - eta - An object containing the eta information. The fields returned are:<code>String</code> - eta.status - "OK" if the location can be reached<code>Array</code> - eta.response - An array that contains at least one object with the estimated durations. It has the following properties: 'duration' (in secs), 'duration_in_traffic' (in secs) and 'distance'

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object parameter |
| options.origin | <code>String</code> | The user id. It can be obtained from the 'passenger' object after logging in) |
| options.authToken | <code>String</code> | The authentication token |

<a name="flywheel.createRide"></a>

### flywheel.createRide(options) ⇒ <code>MyType</code>
Create a new request for a ride

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>MyType</code> - ride - An object containing the eta information. The fields returned are:

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object parameter |
| options.pickUpLat | <code>Number</code> | Pickup latitude (in degrees) |
| options.pickUpLon | <code>Number</code> | Pickup latitude (in degrees) |
| options.passenger | <code>Object</code> | The passenger object. Only 'name' (String) and 'telephone' (String) are required |
| options.serviceAvailabilitiesId | <code>String</code> | The service id. It can be obtained using `applicationContext()` |
| options.tip | <code>Number</code> | The ride tip (in cents) |
| options.authToken | <code>String</code> | The authentication token |
| options.notes | <code>String</code> | Any notes to be sent to the cab driver |

<a name="flywheel.getRideStatus"></a>

### flywheel.getRideStatus() ⇒ <code>Promise</code>
a quite wonderful function

**Kind**: static method of <code>[flywheel](#flywheel)</code>
**Returns**: <code>Promise</code> - A promise that returns [MyType1](#MyType1) if resolved and an Object if rejected.

| Type | Description |
| --- | --- |
| <code>object</code> | privacy gown |
| <code>object</code> | security |

<a name="MyType1"></a>

## MyType1 : <code>Object</code>
A type definition.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| prop1 | <code>number</code> | one property |
| prop2 | <code>string</code> | another property |

<a name="MyType2"></a>

## MyType2 : <code>Object</code>
A type definition.

**Kind**: global typedef
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| prop1 | <code>number</code> | one property |
| prop2 | <code>string</code> | another property |

