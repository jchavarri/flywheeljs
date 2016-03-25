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
<dd><p>The type of the object returned with a successfully resolved signup promise.</p>
</dd>
<dt><a href="#SearchPromise">SearchPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved search promise.</p>
</dd>
<dt><a href="#LoginPromise">LoginPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved search promise.</p>
</dd>
<dt><a href="#ApplicationContextPromise">ApplicationContextPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved application context promise. I added a question mark on those properties that are not clear to me.</p>
</dd>
<dt><a href="#UserInfoPromise">UserInfoPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved application context promise. I added a question mark on those properties that are not clear to me.</p>
</dd>
<dt><a href="#ETAPromise">ETAPromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved search promise.</p>
</dd>
<dt><a href="#RidePromise">RidePromise</a> : <code>object</code></dt>
<dd><p>The type of the object returned with a successfully resolved search promise. It includes a lot of properties, only the most interesting are documented here.</p>
</dd>
</dl>

<a name="flywheel"></a>

## flywheel : <code>object</code>
The flywheeljs library main exported object

**Kind**: global namespace  

* [flywheel](#flywheel) : <code>object</code>
    * [.signup(options)](#flywheel.signup) ⇒ <code>Promise</code>
    * [.search(options)](#flywheel.search) ⇒ <code>Promise</code>
    * [.login(options)](#flywheel.login) ⇒ <code>Promise</code>
    * [.applicationContext(options)](#flywheel.applicationContext) ⇒ <code>Promise</code>
    * [.userInfo(options)](#flywheel.userInfo) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>Promise</code>
    * [.eta(options)](#flywheel.eta) ⇒ <code>Promise</code>
    * [.createRide(options)](#flywheel.createRide) ⇒ <code>Promise</code>

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

### flywheel.search(options) ⇒ <code>Promise</code>
Search for cabs around a given position

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [SearchPromise](#SearchPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Options object parameter |
| [options.by] | <code>string</code> | <code>&quot;&#x27;location&#x27;&quot;</code> | The field to search by |
| [options.filter] | <code>string</code> | <code>&quot;&#x27;hailable&#x27;&quot;</code> | A filter to be applied to the search request |
| [options.latitude] | <code>number</code> | <code>0</code> | Default latitude (in degrees) used when ordering cabs |
| [options.longitude] | <code>number</code> | <code>0</code> | Default longitude (in degrees) used when ordering cabs |
| [options.authToken] | <code>number</code> | <code>&#x27;(null)&#x27;</code> | User authentication token (if she's logged) |

<a name="flywheel.login"></a>

### flywheel.login(options) ⇒ <code>Promise</code>
Login a user

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [LoginPromise](#LoginPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.email | <code>string</code> | The user email |
| options.password | <code>string</code> | The user password |

<a name="flywheel.applicationContext"></a>

### flywheel.applicationContext(options) ⇒ <code>Promise</code>
Get some application context data given a specific location.

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [ApplicationContextPromise](#ApplicationContextPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.authToken | <code>string</code> | An authentication token |
| options.latitude | <code>number</code> | A given latitude (in degrees) used when ordering cabs |
| options.longitude | <code>number</code> | A given longitude (in degrees) used when ordering cabs |

<a name="flywheel.userInfo"></a>

### flywheel.userInfo(options) ⇒ <code>object</code> &#124; <code>string</code> &#124; <code>Promise</code>
Get user info

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>object</code> - userInfo - An object containing the user information. The most interesting fields returned are:<code>string</code> - userInfo.id - The user (passenger) id<code>Promise</code> - A promise that returns [UserInfoPromise](#UserInfoPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.userId | <code>string</code> | The user id. It can be obtained from the 'passenger' object after logging in |
| options.authToken | <code>string</code> | The authentication token |

<a name="flywheel.eta"></a>

### flywheel.eta(options) ⇒ <code>Promise</code>
Get estimated time of arrival

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [ETAPromise](#ETAPromise) if resolved and an object containing the error if rejected.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object parameter |
| options.origin | <code>string</code> | The user id. It can be obtained from the 'passenger' object after logging in) |
| options.authToken | <code>string</code> | The authentication token |

<a name="flywheel.createRide"></a>

### flywheel.createRide(options) ⇒ <code>Promise</code>
Create a new request for a ride

**Kind**: static method of <code>[flywheel](#flywheel)</code>  
**Returns**: <code>Promise</code> - A promise that returns [RidePromise](#RidePromise) if resolved and an object containing the error if rejected.  

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
The type of the object returned with a successfully resolved signup promise.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| auth_token | <code>string</code> | The token that can be used to authenticate future requests |
| passenger | <code>object</code> | An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`. |

<a name="SearchPromise"></a>

## SearchPromise : <code>object</code>
The type of the object returned with a successfully resolved search promise.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| drivers | <code>array</code> | An array containing the drivers available at that location. Some relevant fields are: `id`, `vehicle`, `latitude` and `longitude`. |

<a name="LoginPromise"></a>

## LoginPromise : <code>object</code>
The type of the object returned with a successfully resolved search promise.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| auth_token | <code>string</code> | The token that can be used to authenticate future requests |
| passenger | <code>object</code> | An object including the user information. Some relevant fields are: `id`, `first_name`, `last_name`, and `email`. |
| scheduled_rides | <code>object</code> | An array containing the user scheduled rides |

<a name="ApplicationContextPromise"></a>

## ApplicationContextPromise : <code>object</code>
The type of the object returned with a successfully resolved application context promise. I added a question mark on those properties that are not clear to me.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| service_availabilities | <code>array</code> | An array of the services available at the given location. The service 'id' parameter is required for other requests (createRide, for example) |
| on_board_cancellation_window | <code>object</code> | The amount of time (in secs) allowed to cancel a ride without being charged |
| application_details | <code>object</code> | Some applications details, like the url on the app store |
| flywheel_service_fee | <code>number</code> | The fee charged by flywheel (in cents) |
| hailing_distance | <code>number</code> | Max hailing distance in meters (?) |
| maximum_hail_time | <code>number</code> | Max hail time in secs (before a request fails?) |
| straight_line_approximation_speed | <code>number</code> | ? |
| points_of_interest | <code>array</code> | ? |
| alerts | <code>array</code> | ? |
| on_board_cancellation_window | <code>number</code> | The amount of time (in secs) where a cancellation is not charged (?) |
| gps_warning_distance | <code>number</code> | ? |
| preferred_eta_provider | <code>string</code> | ? |
| booked_ride_countdown_window | <code>number</code> | ? |
| invite_friends | <code>object</code> | Referral rewards (in cents) |
| time_zone_identifier | <code>string</code> | Time zone |
| utc_offset | <code>number</code> | Offset (in secs) from UTC time |
| share_eta_msg | <code>string</code> | Some string used in the app UI |
| enable_asking_point | <code>bool</code> | ? |

<a name="UserInfoPromise"></a>

## UserInfoPromise : <code>object</code>
The type of the object returned with a successfully resolved application context promise. I added a question mark on those properties that are not clear to me.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The user (passenger) id |
| first_name | <code>string</code> | The user first name |
| last_name | <code>string</code> | The user last name |
| email | <code>string</code> | The user email |
| has_dummy_email | <code>bool</code> | True if the user has a dummy email (whatever that might mean) |
| telephone | <code>string</code> | The user telephone |
| canonical_telephone | <code>string</code> | ? |
| addresses | <code>array</code> | The user addresses |
| mobile_devices | <code>array</code> | The user mobile devices |
| dispatch_service_accounts | <code>array</code> | ? |
| default_tip_percent | <code>number</code> | Default tip percentage |
| credit_balance | <code>number</code> | ? |
| credits_since_last_session | <code>number</code> | ? |
| payment_instruments | <code>array</code> | The payment instruments linked to this user. The payment object contains a property `token` that is required for creating rides |
| payment_instruments_count | <code>number</code> | Number of payment instruments |
| latest_ride_id | <code>string</code> | Latest ride id |
| referral_code | <code>string</code> | Referral code for this user |
| latest_ride_id | <code>string</code> | Latest ride id |
| nonfatal_errors | <code>array</code> | ? |
| disabled_features | <code>array</code> | ? |
| oauth_id | <code>string</code> | ? |
| oauth_provider | <code>string</code> | I guess Google, FB, etc. |
| sms_verification_required | <code>bool</code> | ? |
| is_agent_also | <code>bool</code> | ? |
| added_by | <code>string</code> | ? |
| special_characteristics | <code>array</code> | ? |
| ivr_blocked | <code>bool</code> | ? |
| newly_added | <code>bool</code> | ? |
| suspended_upto | <code>object</code> | ? |

<a name="ETAPromise"></a>

## ETAPromise : <code>object</code>
The type of the object returned with a successfully resolved search promise.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| status | <code>string</code> | "OK" if the location can be reached |
| response | <code>array</code> | An array that contains at least one object with the estimated durations. It has the following properties: 'duration' (in secs), 'duration_in_traffic' (in secs) and 'distance' |

<a name="RidePromise"></a>

## RidePromise : <code>object</code>
The type of the object returned with a successfully resolved search promise. It includes a lot of properties, only the most interesting are documented here.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ride id |
| notes | <code>string</code> | The notes attached to the ride, created by the user |
| status | <code>string</code> | `hailing` if the ride is still to be assigned, `hail_accepted` if a cab accepted the ride |
| failure_reason | <code>string</code> | The reason why the ride failed, if any |
| client_created_at | <code>string</code> | Formatted creation date |
| created_at | <code>number</code> | Creation timestamp |
| updated_at | <code>number</code> | The reason why the ride failed |
| passenger | <code>object</code> | An object with the same structure than [UserInfoPromise](#UserInfoPromise) |
| pick_up_location | <code>object</code> | Pick up location |
| drop_off_location | <code>object</code> | Drop off location (can be empty) |
| hail | <code>object</code> | This object contains all details about the `hail`, including the driver information |
| payment_instrument | <code>object</code> | The payment instrument used to pay for this ride |

