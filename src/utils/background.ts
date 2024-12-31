import type { Chart, Plugin } from "chart.js/auto"

export function Background({
	fillStyle,
	height,
	width,
}: {
	fillStyle: CanvasGradient | CanvasPattern | string
	height: number
	width: number
}): Plugin {
	return {
		beforeDraw(chart: Chart): void {
			const ctx = chart.ctx
			ctx.save()
			ctx.fillStyle = fillStyle
			ctx.fillRect(0, 0, width, height)
			ctx.restore()
		},
		id: "chartjs-plugin-background",
	}
}
