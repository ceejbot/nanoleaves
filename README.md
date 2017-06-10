# nanoleaves

A command-line tool for interacting with your Nanoleaf Aurora. Also includes a full API client for the Aurora! IN PROGRESS

## CLI usage

Provide the IP address of your Aurora in the environment variable `AURORA_HOST` and your API access token in `AURORA_TOKEN`. If your AURORA is listening on an unusual port, use `AURORA_PORT`.

To generate a token, hold the power key until the light starts flashing, then run `nanoleaves token`.

```sh
$ nanoleaves --help
Commands:
  brightness [number]       get or set the overall brightness
  effect [name]             get or set the current effect
  effects                   list available effects
  hsb <hue> <sat> <bright>  set the hue, sat, and brightness for all panels
  info                      get all available info about your Aurora
  off                       turn your Aurora off
  on                        turn your Aurora on
  saturation [number]       get or set the overall saturation
  token                     generate a new API access token

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## API usage

```js
const AuroraAPI = require('nanoleaves');
const aurora = new AuroraAPI({
	host: '10.0.0.2',
	token: 'your-api-token'
});

aurora.info().then(info =>
{
	console.log(info);
});
```

All API functions return promises.

* `newToken()` - generate a new API token
* `info()` - return all info about the Aurora
* `identify()` - flash panels
* `effects()` - return a list of the names of all effects
* `effect()` - get the name of the current effect
* `setEffect(name)` - set the active effect by name
* `on()` - turn the Aurora on
* `off()` - turn the Aurora off
* `mode()` - get the Aurora's current color mode
* `brightness()` - get the brightness for all panels
* `setBrightness(v)` - set the brightness for all panels; 0-100
* `saturation()`  - get the saturation for all panels
* `setSaturation(v)` - set the saturation for all panels; 0-100
* `hue()` - get the hue for all panels
* `setHue(v)` - set the hue for all panels; 0-360
* `temperature()` - get the color temperature for all panels
* `setTemperature(v)` - set the color temperature for all panels; 1200-6500

## License

ISC
