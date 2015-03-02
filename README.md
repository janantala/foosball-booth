# foosball-booth

Under table loss Raspberry Pi photo booth.

<img src="https://lh5.googleusercontent.com/-sKpwKIGhaTs/VPSa91SeprI/AAAAAAAAPGo/lyrSCE8V4vA/w642-h868-no/IMG_20150302_181628.jpg" width="500px"/>

## Installation

- Connect push button to Raspberry Pi GPIO pins

<img src="https://raw.githubusercontent.com/fivdi/onoff/master/examples/light-switch.png">

- Create a new Twitter app. https://apps.twitter.com/app/new
- Create a new file `config.js` file. See `config.example.js`.
- Put your Twitter credentials into `config.js` file.

To install all node.js dependencies run:

```sh
npm install
```

## Usage

You need to run this app under sudo in RPi.

```sh
sudo node index.js
```

## License

The MIT License

Copyright (c) 2015 [Jan Antala](http://www.janantala.com)
