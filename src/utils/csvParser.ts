import type { HistoricalRecord, RiskLevel } from '../types'

const RISK_LEVELS: RiskLevel[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const COLUMN_ALIASES: Record<string, string[]> = {
  date: ['date', 'tarih', 'gun', 'day'],
  time: ['time', 'saat', 'hour'],
  predictedCount: ['predicted', 'predicted_count', 'tahmin', 'tahmin_edilen', 'predictedcount'],
  actualCount: ['actual', 'actual_count', 'gercek', 'gercek_sayi', 'patient_count', 'hasta_sayisi', 'actualcount'],
  accuracy: ['accuracy', 'dogruluk', 'prediction_accuracy'],
  riskLevel: ['risk', 'risk_level', 'risklevel', 'risk_seviyesi', 'density', 'yoğunluk'],
  waitingTime: ['waiting_time', 'waiting', 'bekleme', 'bekleme_suresi', 'wait_time', 'waitingtime'],
}

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '')
}

function findColumnIndex(headers: string[], field: keyof typeof COLUMN_ALIASES): number {
  const aliases = COLUMN_ALIASES[field]
  return headers.findIndex((h) => aliases.includes(normalizeHeader(h)))
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function detectDelimiter(firstLine: string): string {
  const commaCount = (firstLine.match(/,/g) || []).length
  const semicolonCount = (firstLine.match(/;/g) || []).length
  return semicolonCount > commaCount ? ';' : ','
}

function parseRiskLevel(value: string): RiskLevel {
  const normalized = value.trim().toUpperCase()
  if (RISK_LEVELS.includes(normalized as RiskLevel)) return normalized as RiskLevel
  const map: Record<string, RiskLevel> = {
    DUSUK: 'LOW',
    DÜŞÜK: 'LOW',
    ORTA: 'MEDIUM',
    YUKSEK: 'HIGH',
    YÜKSEK: 'HIGH',
    KRITIK: 'CRITICAL',
    KRİTİK: 'CRITICAL',
  }
  return map[normalized] || 'MEDIUM'
}

function parseNumber(value: string, fallback = 0): number {
  const num = parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''))
  return isNaN(num) ? fallback : num
}

export interface CsvParseResult {
  records: HistoricalRecord[]
  errors: string[]
}

export function parseHistoricalCsv(content: string): CsvParseResult {
  const errors: string[] = []
  const lines = content.split(/\r?\n/).filter((l) => l.trim())

  if (lines.length < 2) {
    return { records: [], errors: ['CSV dosyası en az bir başlık satırı ve bir veri satırı içermelidir.'] }
  }

  const delimiter = detectDelimiter(lines[0])
  const headers = parseCsvLine(lines[0], delimiter).map(normalizeHeader)

  const dateIdx = findColumnIndex(headers, 'date')
  const timeIdx = findColumnIndex(headers, 'time')
  const predictedIdx = findColumnIndex(headers, 'predictedCount')
  const actualIdx = findColumnIndex(headers, 'actualCount')

  if (dateIdx === -1 && timeIdx === -1 && actualIdx === -1 && predictedIdx === -1) {
    return {
      records: [],
      errors: [
        'Geçerli sütun bulunamadı. CSV dosyanızda en az şu sütunlardan biri olmalı: date/tarih, time/saat, actual/gercek, predicted/tahmin',
      ],
    }
  }

  const accuracyIdx = findColumnIndex(headers, 'accuracy')
  const riskIdx = findColumnIndex(headers, 'riskLevel')
  const waitingIdx = findColumnIndex(headers, 'waitingTime')

  const records: HistoricalRecord[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i], delimiter)
    if (values.every((v) => !v.trim())) continue

    const predicted = predictedIdx >= 0 ? parseNumber(values[predictedIdx]) : 0
    const actual = actualIdx >= 0 ? parseNumber(values[actualIdx]) : 0

    let accuracy = accuracyIdx >= 0 ? parseNumber(values[accuracyIdx]) : 0
    if (!accuracy && predicted && actual) {
      accuracy = Math.max(0, 100 - Math.abs(predicted - actual) * 2)
    }

    const record: HistoricalRecord = {
      id: `csv-${i}`,
      date: dateIdx >= 0 ? values[dateIdx] || `Row ${i}` : `Row ${i}`,
      time: timeIdx >= 0 ? values[timeIdx] || '—' : '—',
      predictedCount: predicted,
      actualCount: actual,
      accuracy,
      riskLevel: riskIdx >= 0 ? parseRiskLevel(values[riskIdx] || 'MEDIUM') : 'MEDIUM',
      waitingTime: waitingIdx >= 0 ? parseNumber(values[waitingIdx]) : 0,
    }

    records.push(record)
  }

  if (records.length === 0) {
    errors.push('CSV dosyasından hiç geçerli kayıt okunamadı.')
  }

  return { records, errors }
}
