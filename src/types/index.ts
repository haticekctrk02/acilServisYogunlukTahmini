export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type RiskClassification =
  | 'Normal Operation'
  | 'Increased Monitoring'
  | 'Additional Staff Required'
  | 'Critical Capacity Alert'

export interface PredictionInput {
  dayOfWeek: string
  hour: number
  temperature: number
  weatherCondition: string
  isHoliday: boolean
  isSpecialEvent: boolean
  previousHourCount: number
}

export interface PredictionResult {
  predictedCount: number
  densityLevel: RiskLevel
  confidence: number
  explanation: string
  expectedWaitingTime: number
  recommendedStaffing: string
}

export interface KPIData {
  id: string
  label: string
  value: string | number
  unit?: string
  change: number
  trend: 'up' | 'down' | 'stable'
  sparkline: number[]
  icon: string
  color: string
}

export interface LiveMetric {
  label: string
  value: number
  unit?: string
  icon: string
  status?: 'normal' | 'warning' | 'critical'
}

export interface HistoricalRecord {
  id: string
  date: string
  time: string
  predictedCount: number
  actualCount: number
  accuracy: number
  riskLevel: RiskLevel
  waitingTime: number
}

export interface FeatureImportance {
  feature: string
  importance: number
}

export interface UploadedDataset {
  id: string
  name: string
  fileName: string
  uploadedAt: string
  rowCount: number
  records: HistoricalRecord[]
}

export interface ErVisitRecord {
  visitId: string
  patientId: string
  hospitalId: string
  hospitalName: string
  region: string
  visitDate: Date
  dayOfWeek: string
  season: string
  timeOfDay: string
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  nurseToPatientRatio: number
  specialistAvailability: number
  facilitySize: number
  timeToRegistration: number
  timeToTriage: number
  timeToMedicalProfessional: number
  totalWaitTime: number
  patientOutcome: string
  patientSatisfaction: number
}

export interface Hospital {
  id: string
  name: string
  region: string
}

export interface ErDataStats {
  visits: ErVisitRecord[]
  hospitals: Hospital[]
  historicalRecords: HistoricalRecord[]
  kpiData: KPIData[]
  liveMetrics: LiveMetric[]
  hourlyTrend: { hour: string; patients: number; predicted: number }[]
  weeklyHeatmap: { day: string; hours: number[] }[]
  monthlyAdmissions: { month: string; admissions: number; predictions: number }[]
  seasonalUsage: { season: string; value: number }[]
  arrivalDistribution: { range: string; count: number }[]
  predictionAccuracy: { week: string; accuracy: number }[]
  capacityUtilization: { department: string; utilization: number }[]
  featureImportance: FeatureImportance[]
  mlMetrics: { accuracy: number; precision: number; recall: number; rmse: number; mae: number }
  totalVisits: number
  avgWaitTime: number
}
