import type { ChartConfiguration, ChartType, DefaultDataPoint } from "chart.js"
import type { AnnotationOptions } from "chartjs-plugin-annotation"
import type { AutocolorsOptions } from "chartjs-plugin-autocolors"
import type { Options as DatalabelsOptions } from "chartjs-plugin-datalabels/types/options"
import type { Options as GradientOptions } from "chartjs-plugin-gradient/types/options"

export type Config<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>, TLabel = unknown> = ChartConfiguration<TType, TData, TLabel> & {
	data?: ChartConfiguration<TType>["data"] & {
		datasets?: ChartConfiguration<TType>["data"]["datasets"] & {
			dataLabels?: DatalabelsOptions
			gradient?: GradientOptions
		}
	}
	options?: ChartConfiguration<TType>["options"] & {
		plugins?: {
			annotation?: AnnotationOptions
			autocolors?: AutocolorsOptions
			datalabels?: DatalabelsOptions
		}
	}
}
