## Objects

<dl>
<dt><a href="#flywheel">flywheel</a> : <code>object</code></dt>
<dd><p>The flywheeljs library main exported object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MyType2">MyType2</a> : <code>object</code></dt>
<dd><p>A type definition.</p>
</dd>
<dt><a href="#SignupPromise">SignupPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfuly resolved signup promise.</p>
</dd>
</dl>

<a name="flywheel"></a>

## flywheel : <code>object</code>
The flywheeljs library main exported object

**Kind**: global namespace  

* [flywheel](#flywheel) : <code>object</code>
    * [.signup(options)](#flywheel.signup) ⇒ <code>Promise</code>
    * [.search(options)](#flywheel.search) ⇒ <code>object</code> &#124; <code>array</code>
    * [.login(options)](#flywheel.login) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>object</code> &#124; <code>array</code>
    * [.applicationContext(options)](#flywheel.applicationContext) ⇒ <code>object</code> &#124; <code>array</code> &#124; <code>object</code>
    * [.userInfo(options)](#flywheel.userInfo) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>array</code>
    * [.eta(options)](#flywheel.eta) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>array</code>
    * [.createRide(options)](#flywheel.createRide) ⇒ <code>MyType</code>
    * [.getRideStatus()](#flywheel.getRideStatus) ⇒ <code>Promise</code>

<a name="flywheel.signup"></a>

### flywheel.signup(options) ⇒ <code>Promise</code>
Sign up a new user for the Flywheel service

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [SignupPromise](#SignupPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Options object parameter |
| options.firstName | <code>string</code> |  | Flywheel user first name |
| options.email | <code>string</code> |  | Flywheel user email |
| options.password | <code>string</code> |  | Flywheel user password |
| options.telephone | <code>string</code> |  | Flywheel user phone number |
| [options.latitude] | <code>number</code> | <code>0</code> | Default latitude (in degrees). This value can be overriden when ordering a cab |
| [options.longitude] | <code>number</code> | <code>0</code> | Default longitude (in degrees). This value can be overriden when ordering a cab |

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

### flywheel.search(options) ⇒ <code>object</code> &#124; <code>array</code>
Search cabs

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - search - An object containing:<code>array</code> - search.drivers - array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Options object parameter |
| [options.by] | <code>string</code> | <code>&quot;&#x27;location&#x27;&quot;</code> | The field to search by |
| [options.filter] | <code>string</code> | <code>&quot;&#x27;hailable&#x27;&quot;</code> | A filter to be applied to the search request |
| [options.latitude] | <code>number</code> | <code>0</code> | Default latitude (in degrees) used when ordering cabs |
| [options.longitude] | <code>number</code> | <code>0</code> | Default longitude (in degrees) used when ordering cabs |
| [options.authToken] | <code>number</code> | <code>&#x27;(null)&#x27;</code> | User authentication token (if she's logged) |

<a name="flywheel.login"></a>

### flywheel.login(options) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>object</code> &#124; <code>array</code>
Login a user

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - login - An object containing:<code>string</code> - login.auth_token - The authentication token that can be used in subsequent requests<code>object</code> - login.passenger - An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`.<code>array</code> - login.scheduled_rides - array containing the user scheduled rides  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.email | <code>string</code> | The user email |
| options.password | <code>string</code> | The user password |

<a name="flywheel.applicationContext"></a>

### flywheel.applicationContext(options) ⇒ <code>object</code> &#124; <code>array</code> &#124; <code>object</code>
Get application context given a specific location.

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - applicationContext - An object containing the application context. The most interesting fields returned are:<code>array</code> - applicationContext.service_availabilities - An array of the services available at the given location. The service 'id' parameter is required for other requests (createRide, for example)<code>object</code> - applicationContext.on_board_cancellation_window - The amount of time (in secs) allowed to cancel a ride without being charged  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.authToken | <code>string</code> | An authentication token |
| options.latitude | <code>number</code> | A given latitude (in degrees) used when ordering cabs |
| options.longitude | <code>number</code> | A given longitude (in degrees) used when ordering cabs |

<a name="flywheel.userInfo"></a>

### flywheel.userInfo(options) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>array</code>
Get user info

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - userInfo - An object containing the user information. The most interesting fields returned are:<code>string</code> - userInfo.id - The user (passenger) id<code>array</code> - userInfo.payment_instruments - An array with the payment instruments allowed by the user. The most useful field of each payment instrument is 'token'  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.userId | <code>string</code> | The user id. It can be obtained from the 'passenger' object after logging in |
| options.authToken | <code>string</code> | The authentication token |

<a name="flywheel.eta"></a>

### flywheel.eta(options) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>array</code>
Get estimated time of arrival

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - eta - An object containing the eta information. The fields returned are:<code>string</code> - eta.status - "OK" if the location can be reached<code>array</code> - eta.response - An array that contains at least one object with the estimated durations. It has the following properties: 'duration' (in secs), 'duration_in_traffic' (in secs) and 'distance'  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.origin | <code>string</code> | The user id. It can be obtained from the 'passenger' object after logging in) |
| options.authToken | <code>string</code> | The authentication token |

<a name="flywheel.createRide"></a>

### flywheel.createRide(options) ⇒ <code>MyType</code>
Create a new request for a ride

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>MyType</code> - ride - An object containing the eta information. The fields returned are:  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.pickUpLat | <code>number</code> | Pickup latitude (in degrees) |
| options.pickUpLon | <code>number</code> | Pickup latitude (in degrees) |
| options.passenger | <code>object</code> | The passenger object. Only 'name' (string) and 'telephone' (string) are required |
| options.serviceAvailabilitiesId | <code>string</code> | The service id. It can be obtained using `applicationContext()` |
| options.tip | <code>number</code> | The ride tip (in cents) |
| options.authToken | <code>string</code> | The authentication token |
| options.notes | <code>string</code> | Any notes to be sent to the cab driver |

<a name="flywheel.getRideStatus"></a>

### flywheel.getRideStatus() ⇒ <code>Promise</code>
a quite wonderful function

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [MyType1](MyType1) if resolved and an object if rejected.  

| Type | Description |
| --- | --- |
| <code>object</code> | privacy gown |
| <code>object</code> | security |

<a name="MyType2"></a>

## MyType2 : <code>object</code>
A type definition.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| prop1 | <code>number</code> | one property |
| prop2 | <code>string</code> | another property |

<a name="SignupPromise"></a>

## SignupPromise : <code>object</code>
The type of the object returned with a successfuly resolved signup promise.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| auth_token | <code>string</code> | The token that can be used for future requests |
| passenger | <code>object</code> | An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`. |

