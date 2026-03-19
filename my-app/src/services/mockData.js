const todayMission = {
  id: 'mission-1',
  title: '점심 후 10분 걷기',
  description: '업무 중간에 몸을 깨우는 짧은 루틴을 실행해보세요.',
  category: 'health',
  estimateMinutes: 10,
}

const records = [
  { id: '1', date: '2026-03-12', missionTitle: '점심 후 10분 걷기', result: 'success' },
  {
    id: '2',
    date: '2026-03-11',
    missionTitle: '물 1.5L 마시기',
    result: 'fail',
    emotion: 'tired',
    reason: '외근 일정이 길어 페이스를 놓쳤어요.',
  },
  { id: '3', date: '2026-03-10', missionTitle: '취침 전 스트레칭 5분', result: 'success' },
  { id: '4', date: '2026-03-09', missionTitle: '아침 물 한 컵 마시기', result: 'success' },
  { id: '5', date: '2026-03-08', missionTitle: '저녁 15분 독서', result: 'fail', reason: '약속이 길어져서 놓쳤어요.' },
  { id: '6', date: '2026-03-07', missionTitle: '퇴근 후 계단 5층 오르기', result: 'success' },
  { id: '7', date: '2026-03-06', missionTitle: '점심 전 스트레칭 3분', result: 'success' },
  { id: '8', date: '2026-03-05', missionTitle: '자기 전 휴대폰 20분 끄기', result: 'fail', reason: '메시지 확인하다가 늦어졌어요.' },
]

function createCalendarMonth(year, month, dayCount, offset = 0) {
  const statusList = ['success', 'fail', 'pending']

  return Array.from({ length: dayCount }, (_, index) => ({
    date: `${year}-${String(month).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`,
    label: index + 1,
    status: statusList[(index + offset) % statusList.length],
  }))
}

const calendarDays = [
  ...createCalendarMonth(2026, 1, 31, 0),
  ...createCalendarMonth(2026, 2, 28, 1),
  ...createCalendarMonth(2026, 3, 31, 2),
]

export async function fetchTodayMission() {
  return Promise.resolve(todayMission)
}

export async function fetchRecords(filter = 'all') {
  if (filter === 'all') {
    return Promise.resolve(records)
  }

  return Promise.resolve(records.filter((record) => record.result === filter))
}

export async function fetchCalendarReport() {
  return Promise.resolve(calendarDays)
}

export async function fetchSummaryReport() {
  return Promise.resolve({
    successCount: 18,
    failCount: 7,
    successRate: 72,
  })
}

export async function fetchStreakReport() {
  return Promise.resolve({
    current: 4,
    best: 9,
  })
}
