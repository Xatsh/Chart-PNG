# Chart-Png

[![npm](https://img.shields.io/npm/v/chart-png?color=444&label=)](https://npmjs.com/package/chart-png)

This is a simple lib that converts a Chart.js v3(.9.1)'s configuration to a png image.

- Typescript
- Chart.js v3(.9.1)
  - Chart.js v4 has a [bug](https://github.com/chartjs/chartjs-plugin-datalabels/issues/422) with the datalabels plugin, and I think it's a very important plugin.
  - ~~And the v3 maybe more stable.~~
- Support plugins:
  - [chartjs-plugin-datalabels](https://github.com/chartjs/chartjs-plugin-datalabels)
  - [chartjs-plugin-annotation](https://github.com/chartjs/chartjs-plugin-annotation)
  - [chartjs-plugin-autocolors](https://github.com/kurkle/chartjs-plugin-autocolors)
  - [chartjs-plugin-gradient](https://github.com/kurkle/chartjs-plugin-gradient)
  - And [inline plugins](https://www.chartjs.org/docs/3.9.1/developers/plugins.html#using-plugins)

## Installation

```bash
npm install chart-png
```

Or whatever package manager you use.

> [!IMPORTANT]
> Cuz this lib uses the `canvas` package, you need to install the `canvas` dependencies to make it work.
>
> [Node Canvas's README](https://github.com/Automattic/node-canvas/blob/master/Readme.md#compiling)

For this lib, you will only need blew dependencies (because we only produce png images):

OS | Command
----- | -----
macOS | `brew install pkg-config cairo pango pixman python-setuptools`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo pango png`
Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki)

## Usage

```typescript
import { ChartPng } from 'chart-png';

const config = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    // support plugins
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold'
        }
      }
    }
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
  plugins: {
    // inline plugins
    // Don't really use this, cuz ChartPng's options.backgroundColor has done this for you.
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();
    }
  }
}

ChartPng(config, "chart.png", "output")
```

## API

```typescript
ChartPng(
 /**
  * The chart configuration of Chart.js v3.
  * @type {Config}
  * @see https://www.chartjs.org/docs/3.9.1/configuration/
  */
 config: Config,
 /**
  * The name of the chart to render.
  * @type {string}
  * @example "bar"
  */
 name: string,
 /**
  * The directory name to save the chart.
  * @type {string}
  * @example "chart"
  */
 dirName: string,
 options?: MainOptions,
): void

interface MainOptions {
 /**
  * Optional background color for the chart, otherwise it will be white.
  * @optional
  * @type {CanvasGradient | CanvasPattern | string}
  * @default "white"
  */
 backgroundColor?: CanvasGradient | CanvasPattern | string
 /**
  * The device pixel ratio of the chart.
  * @optional
  * @type {number}
  * @default 2
  * @see https://www.chartjs.org/docs/3.9.1/configuration/device-pixel-ratio.html
  */
 devicePixelRatio?: number
 /**
  * The font to register for the chart.
  * @type {Parameters<typeof registerFont>}
  * @optional
  * @default undefined
  * @see https://github.com/Automattic/node-canvas?tab=readme-ov-file#registerfont
  * @example
  * ```ts
  * font: ["./path/to/font.ttf", { family: "Font Family" }]
  * ```
  */
 font?: Parameters<typeof registerFont>
 /**
  * The height of the charts to render, in pixels.
  * @optional
  * @type {number}
  * @default 450
  */
 height?: number
 /**
  * The width of the charts to render, in pixels.
  * @optional
  * @type {number}
  * @default 800
  */
 width?: number
}

Parameters<typeof registerFont> = [
  path: string,
  fontFace: {
    family: string;
    weight?: string;
    style?: string;
  }
]
```

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Xat](https://github.com/Xatsh)
