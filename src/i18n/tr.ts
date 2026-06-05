import type { RiskLevel } from '../types'

export const tr = {
  appName: 'Acil Servis Yoğunluk Tahmini',
  appTagline: 'Yapay Zeka Destekli Acil Servis Kapasite Tahmin Sistemi',

  nav: {
    dashboard: 'Kontrol Paneli',
    predictions: 'Tahminler',
    liveMonitoring: 'Canlı İzleme',
    analytics: 'Analitik',
    historical: 'Geçmiş Veriler',
    reports: 'Raporlar',
    mlInsights: 'ML Analizleri',
    settings: 'Ayarlar',
    collapse: 'Daralt',
  },

  risk: {
    LOW: 'DÜŞÜK',
    MEDIUM: 'ORTA',
    HIGH: 'YÜKSEK',
    CRITICAL: 'KRİTİK',
    riskLabel: 'RİSK',
  } satisfies Record<RiskLevel | 'riskLabel', string>,

  riskClassification: {
    normal: 'Normal Operasyon',
    monitoring: 'Artırılmış İzleme',
    staff: 'Ek Personel Gerekli',
    critical: 'Kritik Kapasite Uyarısı',
  },

  staffing: {
    maximum: 'Maksimum + Nöbetçi',
    enhanced: 'Artırılmış',
    standardPlus: 'Standart+',
    standard: 'Standart',
  },

  seasons: {
    Spring: 'İlkbahar',
    Summer: 'Yaz',
    Fall: 'Sonbahar',
    Winter: 'Kış',
  } as Record<string, string>,

  days: {
    Monday: 'Pazartesi',
    Tuesday: 'Salı',
    Wednesday: 'Çarşamba',
    Thursday: 'Perşembe',
    Friday: 'Cuma',
    Saturday: 'Cumartesi',
    Sunday: 'Pazar',
  } as Record<string, string>,

  timeOfDay: {
    Morning: 'Sabah',
    'Late Morning': 'Geç Sabah',
    Afternoon: 'Öğleden Sonra',
    Evening: 'Akşam',
    Night: 'Gece',
  } as Record<string, string>,

  urgency: {
    Low: 'Düşük',
    Medium: 'Orta',
    High: 'Yüksek',
    Critical: 'Kritik',
  } as Record<string, string>,

  months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],

  common: {
    loading: 'Veri seti yükleniyor...',
    loadError: 'Veri yüklenemedi',
    records: 'kayıt',
    minutes: 'dk',
    patients: 'hasta',
    active: 'AKTİF',
    previous: 'Önceki',
    next: 'Sonraki',
    cancel: 'İptal',
    upload: 'Yükle',
    download: 'İndir',
    save: 'Kaydet',
    search: 'Ara',
    all: 'Tümü',
    source: 'Kaynak',
  },
}

export function translateRisk(level: RiskLevel): string {
  return tr.risk[level]
}
