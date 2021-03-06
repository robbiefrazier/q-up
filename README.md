# Q-UP

Q-UP is a mobile web application that aims to simplify and improve the waitlist
experience for restaurants and their guests.

## Description

The application allows diners to view estimated wait times at area restaurants
based on their party size, and allows them to join a chosen waitlist remotely
without first having to visit the restaurant host stand. Guests will then
receive an app notification when their table is ready. In addition to waitlist
management, Q-UP also provides restaurants with a simple option for table
management at significantly lower cost than traditional pager systems. The app
also helps reduce empty seats by pairing parties with the most appropriately
sized table.

## Getting Started

### Dependencies

### Development Environment

* Windows 10 x64 21H1
* Visual Studio Code with Powershell 1.57.1
    * Recommended VSCode extensions:
    * Node.js Extension Pack v0.1.9
    * Angular Essentials (Version 12) v12.0.0
    * Prettier - Code formatter v8.0.1 (SHIFT + ALT + F)
    * Material Icon Theme v4.8.0
* nvm-windows 1.1.7
    * Install nvm-windows from https://github.com/coreybutler/nvm-windows/releases
    * Download nvm-setup.zip
    * Run the installer using default settings
* node.js 14.17.3 (DO NOT INSTALL LATEST VERSION)
* npm 6.14.13
```
nvm install 14.17.3
nvm use 14.17.3
```
* ionic 6.16.3
```
npm install -g @ionic/cli
```
* Angular CLI 12.0.5
```
npm install -g @angular/cli
```
* Capacitor 3.1.1
```
npm install -g @capacitor/core @capacitor/cli @capacitor/android
```
* Android Studio 4.2.2
* Set user environment variables:
    * ANDROID_SDK_ROOT  : C:\Users\<USERNAME>\AppData\Local\Android\Sdk
    * JAVA_HOME         : C:\Program Files\Android\Android Studio\jre

### Initial setup
```
git clone https://github.com/robbiefrazier/q-up.git q-up
cd q-up
npm install
```

### Developing
```
ionic serve
```

### Executing program (Android)
```
ionic capacitor run android
```

## Help

* No help at this time

## Authors

* Robbie Frazier
* Parker Brooks
* Kristina Pham
* Sarina Sanjel

## Version History

* 0.0
    * Nothing to see here

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

* No acknowledgements at this time
