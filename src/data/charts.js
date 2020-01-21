import { ThemeColors } from '../helpers/ThemeColors'
const colors = ThemeColors()

export const lineChartData = (labels, datas) => ({
  labels: labels,
  datasets: [
    {
      label: '',
      data: datas,
      borderColor: colors.themeColor1,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 6,
      pointBorderWidth: 2,
      pointHoverRadius: 8,
      fill: true
    }
  ]
})

export const areaChartData = (labels, datas) => ({
  labels: labels,
  datasets: [
    {
      label: '',
      data: datas,
      borderColor: colors.themeColor1,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 4,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      fill: true,
      borderWidth: 2,
      backgroundColor: colors.themeColor1_10
    }
  ]
});