# Login 

<b> Open command line : </b>
<p>  git clone https://github.com/habiba1997/Nativescript-Angular-Projects.git </p>


## Facebook:
For logging in with your Facebook account, you should have a Facebook developer account. If you don't have one yet, you can get one <a  href="https://developers.facebook.com/" > here </a>.

<ol>
<li> Go to https://developers.facebook.com/apps and create a new app</li>
    
<li> If you see the Product Setup page, select Facebook login</li>
    
<li> Make sure to turn ON the option "Embedded Browser OAuth Login" and Click Save</li>

<li>Copy the App ID and the App Secret from the Dashboard page to bootstrap your app. These will be the ClientID and ClientSecret respectively.</li>
</ol>

#### Steps to run project

<ol>

<li> Open Facebook project folder in your IDE </li>

<li> Open command line and write "npm install" to install packages in package.json file</li>

<li> Open src >> app >> authProviderHelper.ts </li>
<li> Enter Your ClientID and ClientSecret  in configureOAuthProviderFacebook Function </li>


<li>Run application by: "tns run android" in command line </li>

</ol>



## GooglePlus:
For logging in with your Google account, you should have a Google developer account. If you don't have one yet, you can get one  <a  href="https://developers.google.com/" > here </a>.


Register your mobile app by following the wizard in the Developer Console. 


#### Steps to run project

<ol>

<li> Open GooglePlus project folder in your IDE </li>

<li> Open command line and write "npm install" to install packages in package.json file</li>

<li> Open src >> app >> authProviderHelper.ts </li>
<li> Enter Your clientId of your google developer project in configureOAuthProviderGoogle Function </li>

<li>Enter redirectUri and urlScheme by reversing clientID as in this example: 

<p> clientId:
      "932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb.apps.googleusercontent.com", </p>
<p> redirectUri:
      "com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb:/auth",</p> 
<p> urlScheme:
      "com.googleusercontent.apps.932931520457-buv2dnhgo7jjjjv5fckqltn367psbrlb",</p> 

</li>

<li> Open App_Resources/Android/src/main/AndroidManifest.xml And in "com.tns.NativeScriptActivity" activity add this intent-filter: 

    <intent-filter>
		<action android:name="android.intent.action.VIEW"/>
		<category android:name="android.intent.category.DEFAULT" />
		<category android:name="android.intent.category.BROWSABLE" />
		<data android:scheme="Enter-urlScheme-from-auth-providers-folder"/>
	</intent-filter>

</li>

<li>Run application by: "tns run android" in command line </li>

</ol>


#### For more details: <a href="https://www.npmjs.com/package/nativescript-oauth2">OAuth 2 Plugin for NativeScript</a>
