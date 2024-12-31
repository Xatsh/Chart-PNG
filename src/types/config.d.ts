import type { ChartConfiguration, ChartData, ChartType, DefaultDataPoint } from "chart.js"
import type { AnnotationOptions } from "chartjs-plugin-annotation"
import type { AutocolorsOptions } from "chartjs-plugin-autocolors"
import type { Options as DatalabelsOptions } from "chartjs-plugin-datalabels/types/options"
import type { Options as GradientOptions } from "chartjs-plugin-gradient/types/options"

export type Config<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = ChartConfiguration<TType, TData, TLabel> & {
	data: ChartConfiguration<TType, TData, TLabel>["data"] & {
		datasets: Array<ChartDataset<TType, TData> & {
			dataLabels?: DatalabelsOptions
			gradient?: GradientOptions
		}>
	}
	options?: ChartConfiguration<TType, TData, TLabel>["options"] & {
		plugins?: {
			annotation?: AnnotationOptions
			autocolors?: AutocolorsOptions
			datalabels?: DatalabelsOptions
		}
	}
}
