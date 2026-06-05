import type { ErVisitRecord, RiskLevel } from '../types'

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function parseNumber(value: string): number {
  const num = parseFloat(value.replace(/[^\d.-]/g, ''))
  return isNaN(num) ? 0 : num
}

function parseUrgency(value: string): ErVisitRecord['urgencyLevel'] {
  const normalized = value.trim().toLowerCase()
  const map: Record<string, ErVisitRecord['urgencyLevel']> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  }
  return map[normalized] || 'Medium'
}

export function parseErDatasetCsv(content: string): ErVisitRecord[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return []

  const records: ErVisitRecord[] = []

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    if (cols.length < 17) continue

    const visitDate = new Date(cols[5])
    if (isNaN(visitDate.getTime())) continue

    records.push({
      visitId: cols[0],
      patientId: cols[1],
      hospitalId: cols[2],
      hospitalName: cols[3],
      region: cols[4],
      visitDate,
      dayOfWeek: cols[6],
      season: cols[7],
      timeOfDay: cols[8],
      urgencyLevel: parseUrgency(cols[9]),
      nurseToPatientRatio: parseNumber(cols[10]),
      specialistAvailability: parseNumber(cols[11]),
      facilitySize: parseNumber(cols[12]),
      timeToRegistration: parseNumber(cols[13]),
      timeToTriage: parseNumber(cols[14]),
      timeToMedicalProfessional: parseNumber(cols[15]),
      totalWaitTime: parseNumber(cols[16]),
      patientOutcome: cols[17] || 'Unknown',
      patientSatisfaction: parseNumber(cols[18]),
    })
  }

  return records
}

export function urgencyToRisk(level: ErVisitRecord['urgencyLevel']): RiskLevel {
  const map: Record<ErVisitRecord['urgencyLevel'], RiskLevel> = {
    Low: 'LOW',
    Medium: 'MEDIUM',
    High: 'HIGH',
    Critical: 'CRITICAL',
  }
  return map[level]
}
