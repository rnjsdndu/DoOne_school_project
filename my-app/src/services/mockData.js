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
]

const calendarDays = Array.from({ length: 30 }, (_, index) => {
  const statusList = ['success', 'fail', 'pending']
  return {
    date: `2026-02-${String(index + 1).padStart(2, '0')}`,
    label: index + 1,
    status: statusList[index % statusList.length],
  }
})

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
