import type { FeatureImportance, HistoricalRecord, KPIData, LiveMetric } from '../types'

export const hospitals = [
  { id: '1', name: 'Istanbul University Hospital', city: 'Istanbul' },
  { id: '2', name: 'Ankara City Medical Center', city: 'Ankara' },
  { id: '3', name: 'Izmir Regional Hospital', city: 'Izmir' },
  { id: '4', name: 'Bursa Emergency Care Unit', city: 'Bursa' },
]

export const kpiData: KPIData[] = [
  {
    id: 'occupancy',
    label: 'Current ER Occupancy',
    value: 78,
    unit: '%',
    change: 5.2,
    trend: 'up',
    sparkline: [62, 65, 68, 71, 74, 76, 78],
    icon: 'users',
    color: '#2563EB',
  },
  {
    id: 'predicted',
    label: 'Predicted Next Hour',
    value: 142,
    unit: 'patients',
    change: 8.4,
    trend: 'up',
    sparkline: [118, 122, 128, 131, 135, 138, 142],
    icon: 'trending-up',
    color: '#0EA5E9',
  },
  {
    id: 'waiting',
    label: 'Average Waiting Time',
    value: 47,
    unit: 'min',
    change: -3.1,
    trend: 'down',
    sparkline: [52, 51, 50, 49, 48, 47, 47],
    icon: 'clock',
    color: '#F59E0B',
  },
  {
    id: 'risk',
    label: 'Current Risk Level',
    value: 'HIGH',
    change: 12,
    trend: 'up',
    sparkline: [2, 2, 3, 3, 3, 4, 4],
    icon: 'alert-triangle',
    color: '#EF4444',
  },
  {
    id: 'beds',
    label: 'Bed Utilization Rate',
    value: 84,
    unit: '%',
    change: 2.8,
    trend: 'up',
    sparkline: [76, 78, 79, 81, 82, 83, 84],
    icon: 'bed',
    color: '#22C55E',
  },
  {
    id: 'staff',
    label: 'Staff Workload Index',
    value: 7.2,
    unit: '/10',
    change: 4.5,
    trend: 'up',
    sparkline: [5.8, 6.1, 6.4, 6.7, 6.9, 7.0, 7.2],
    icon: 'activity',
    color: '#8B5CF6',
  },
]

export const liveMetrics: LiveMetric[] = [
  { label: 'Current Patients', value: 127, icon: 'users', status: 'warning' },
  { label: 'Occupied Beds', value: 42, icon: 'bed', status: 'warning' },
  { label: 'Available Beds', value: 8, icon: 'bed-double', status: 'critical' },
  { label: 'Active Doctors', value: 12, icon: 'stethoscope', status: 'normal' },
  { label: 'Active Nurses', value: 28, icon: 'heart-pulse', status: 'normal' },
  { label: 'Ambulance Arrivals', value: 6, icon: 'ambulance', status: 'warning' },
  { label: 'Waiting Patients', value: 34, icon: 'hourglass', status: 'critical' },
]

export const hourlyTrend = [
  { hour: '00:00', patients: 45, predicted: 42 },
  { hour: '02:00', patients: 32, predicted: 35 },
  { hour: '04:00', patients: 28, predicted: 30 },
  { hour: '06:00', patients: 38, predicted: 40 },
  { hour: '08:00', patients: 72, predicted: 68 },
  { hour: '10:00', patients: 95, predicted: 92 },
  { hour: '12:00', patients: 118, predicted: 115 },
  { hour: '14:00', patients: 105, predicted: 108 },
  { hour: '16:00', patients: 98, predicted: 102 },
  { hour: '18:00', patients: 112, predicted: 110 },
  { hour: '20:00', patients: 88, predicted: 90 },
  { hour: '22:00', patients: 62, predicted: 58 },
]

export const weeklyHeatmap = [
  { day: 'Mon', hours: [32, 28, 25, 30, 55, 78, 92, 85, 72, 68, 75, 88, 95, 82, 70, 65, 72, 80, 68, 55, 42, 38, 35, 30] },
  { day: 'Tue', hours: [30, 26, 22, 28, 52, 75, 88, 82, 70, 65, 72, 85, 90, 78, 68, 62, 70, 78, 65, 52, 40, 35, 32, 28] },
  { day: 'Wed', hours: [35, 30, 28, 32, 58, 82, 95, 88, 75, 70, 78, 92, 98, 85, 72, 68, 75, 85, 72, 58, 45, 40, 38, 32] },
  { day: 'Thu', hours: [33, 28, 25, 30, 55, 80, 92, 85, 72, 68, 75, 88, 94, 80, 68, 65, 72, 82, 70, 55, 42, 38, 35, 30] },
  { day: 'Fri', hours: [38, 32, 30, 35, 62, 88, 102, 95, 82, 78, 85, 98, 108, 92, 78, 72, 80, 90, 78, 62, 48, 42, 40, 35] },
  { day: 'Sat', hours: [42, 38, 35, 40, 68, 95, 112, 105, 92, 88, 95, 108, 118, 102, 88, 82, 90, 98, 85, 68, 52, 48, 45, 40] },
  { day: 'Sun', hours: [40, 35, 32, 38, 65, 92, 108, 100, 88, 82, 90, 102, 112, 98, 85, 78, 85, 95, 82, 65, 50, 45, 42, 38] },
]

export const monthlyAdmissions = [
  { month: 'Jan', admissions: 3240, predictions: 3180 },
  { month: 'Feb', admissions: 2980, predictions: 3020 },
  { month: 'Mar', admissions: 3420, predictions: 3380 },
  { month: 'Apr', admissions: 3180, predictions: 3220 },
  { month: 'May', admissions: 3560, predictions: 3520 },
  { month: 'Jun', admissions: 3680, predictions: 3650 },
  { month: 'Jul', admissions: 3820, predictions: 3780 },
  { month: 'Aug', admissions: 3750, predictions: 3720 },
  { month: 'Sep', admissions: 3480, predictions: 3520 },
  { month: 'Oct', admissions: 3620, predictions: 3580 },
  { month: 'Nov', admissions: 3380, predictions: 3420 },
  { month: 'Dec', admissions: 3520, predictions: 3480 },
]

export const seasonalUsage = [
  { season: 'Spring', value: 28 },
  { season: 'Summer', value: 32 },
  { season: 'Fall', value: 22 },
  { season: 'Winter', value: 18 },
]

export const arrivalDistribution = [
  { range: '0-15 min', count: 245 },
  { range: '15-30 min', count: 412 },
  { range: '30-45 min', count: 328 },
  { range: '45-60 min', count: 186 },
  { range: '60-90 min', count: 98 },
  { range: '90+ min', count: 42 },
]

export const predictionAccuracy = [
  { week: 'W1', accuracy: 91.2 },
  { week: 'W2', accuracy: 92.8 },
  { week: 'W3', accuracy: 90.5 },
  { week: 'W4', accuracy: 93.1 },
  { week: 'W5', accuracy: 94.2 },
  { week: 'W6', accuracy: 92.6 },
  { week: 'W7', accuracy: 93.8 },
  { week: 'W8', accuracy: 94.5 },
]

export const capacityUtilization = [
  { department: 'Triage', utilization: 78 },
  { department: 'Emergency', utilization: 92 },
  { department: 'Observation', utilization: 65 },
  { department: 'Trauma', utilization: 88 },
  { department: 'Pediatric ER', utilization: 72 },
]

export const featureImportance: FeatureImportance[] = [
  { feature: 'Hour of Day', importance: 0.28 },
  { feature: 'Day of Week', importance: 0.22 },
  { feature: 'Previous Hour Count', importance: 0.18 },
  { feature: 'Temperature', importance: 0.12 },
  { feature: 'Weather Condition', importance: 0.10 },
  { feature: 'Holiday Status', importance: 0.06 },
  { feature: 'Special Event', importance: 0.04 },
]

export const historicalRecords: HistoricalRecord[] = Array.from({ length: 50 }, (_, i) => {
  const date = new Date(2026, 4, 6 - Math.floor(i / 5))
  const hour = 8 + (i % 12)
  const predicted = 80 + Math.floor(Math.random() * 60)
  const actual = predicted + Math.floor(Math.random() * 20) - 10
  const accuracy = Math.max(85, 100 - Math.abs(predicted - actual) * 2)
  const levels: Array<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'> = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
  return {
    id: String(i + 1),
    date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    time: `${hour.toString().padStart(2, '0')}:00`,
    predictedCount: predicted,
    actualCount: actual,
    accuracy,
    riskLevel: levels[Math.floor(Math.random() * levels.length)],
    waitingTime: 20 + Math.floor(Math.random() * 50),
  }
})

export const mlMetrics = {
  accuracy: 93.4,
  precision: 91.8,
  recall: 92.6,
  rmse: 8.42,
  mae: 6.15,
}

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const weatherConditions = ['Clear', 'Cloudy', 'Rainy', 'Snowy', 'Stormy', 'Foggy']
export const hours = Array.from({ length: 24 }, (_, i) => i)
