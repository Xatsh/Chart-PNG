import type { ChartConfiguration, ChartItem } from "chart.js/auto"

import fs from "node:fs"
import path from "node:path"

import { createCanvas, registerFont } from "canvas"
import { Chart } from "chart.js/auto"

import { factory } from "@/utils/factory"

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

function main(
	/**
	 * The chart configuration of Chart.js v3.
	 * @type {ChartConfiguration}
	 * @see https://www.chartjs.org/docs/3.9.1/configuration/
	 */
	config: ChartConfiguration,
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
): void {
	// Register the font and set to chart.js default font if it is provided.
	// Must be done before creating the canvas.
	// see: https://github.com/Automattic/node-canvas?tab=readme-ov-file#registerfont
	if (options?.font !== undefined) {
		registerFont(...options.font)
		Chart.defaults.font.family = options.font[1].family
	}

	// Create a canvas instance and get the context.
	const canvas = createCanvas(options?.width ?? 800, options?.height ?? 450)
	const context = canvas.getContext("2d")

	// Same as above, but for the canvas instance.
	if (options?.font !== undefined) {
		context.font = `12px ${options.font[1].family}`
	}

	// Disable the responsive and animation options cuz we don't need them.
	config.options = config.options ?? {}
	config.options.responsive = false
	config.options.animation = false

	// Set the device pixel ratio of the chart.
	config.options.devicePixelRatio = options?.devicePixelRatio ?? 2

	// Set up the output directory.
	const dir = path.resolve(dirName, `${name}.png`)
	if (!fs.existsSync(path.resolve(dirName))) {
		fs.mkdirSync(path.resolve(dirName), { recursive: true })
	}

	// Write the chart to the file system.
	fs.writeFileSync(dir, factory({
		backgroundColor: options?.backgroundColor ?? "white",
		configuration: config,
		context: context as unknown as ChartItem,
		height: options?.height ?? 450,
		width: options?.width ?? 800,
	}))
}

export { main as ChartPng }
