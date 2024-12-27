import type { Buffer } from "node:buffer"

import type { Canvas } from "canvas"
import type { ChartConfiguration, ChartItem } from "chart.js/auto"

import { Chart } from "chart.js/auto"
import Annotation from "chartjs-plugin-annotation"
import Autocolors from "chartjs-plugin-autocolors"
import Datalabels from "chartjs-plugin-datalabels"
import Gradient from "chartjs-plugin-gradient"
import Trendline from "chartjs-plugin-trendline"

import { Background } from "@/utils/background"

Chart.register(Annotation, Autocolors, Datalabels, Gradient, Trendline)

interface FactoryOptions {
	/**
	 * Optional background color for the chart, otherwise it will be white.
	 */
	backgroundColor: CanvasGradient | CanvasPattern | string
	/**
	 * The chart configuration of Chart.js
	 */
	configuration: ChartConfiguration
	/**
	 * The context of the canvas
	 */
	context: ChartItem
	/**
	 * The height of the charts to render, in pixels.
	 */
	height: number
	/**
	 * The width of the charts to render, in pixels.
	 */
	width: number
}

export function factory({
	backgroundColor,
	configuration,
	context,
	height,
	width,
}: FactoryOptions): Buffer {
	// Add the Background plugin to the chart
	Chart.register(Background({ fillStyle: backgroundColor, height, width }))

	// Create the chart and convert it to a buffer
	const chart = new Chart(context, configuration)
	const result = chart.canvas as unknown as Canvas
	return result.toBuffer("image/png")
}
