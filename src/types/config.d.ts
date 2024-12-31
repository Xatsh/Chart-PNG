import type { ChartConfiguration, ChartTypeRegistry } from "chart.js/auto"

import { Chart } from "chart.js/auto"
import Annotation from "chartjs-plugin-annotation"
import Autocolors from "chartjs-plugin-autocolors"
import Datalabels from "chartjs-plugin-datalabels"
import Gradient from "chartjs-plugin-gradient"
import Trendline from "chartjs-plugin-trendline"

Chart.register(Annotation, Autocolors, Datalabels, Gradient, Trendline)

export type Config<TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry> = ChartConfiguration<TType>
