import { useState, useEffect } from 'react'


// Durasi tiap mode dalam satuan DETIK
const MODES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

function App() {
  // State: mode yang sedang aktif
  const [mode, setMode] = useState('pomodoro')
  // State: sisa waktu dalam detik
  const [timeLeft, setTimeLeft] = useState(MODES['pomodoro'])
  // State: apakah timer sedang berjalan?
  const [isRunning, setIsRunning] = useState(false)

  // Efek: jalankan countdown setiap detik saat isRunning = true
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup: hentikan interval kalau isRunning berubah
    return () => clearInterval(interval)
  }, [isRunning])

  // Ganti mode & reset timer
  const handleModeChange = (newMode) => {
    setMode(newMode)
    setTimeLeft(MODES[newMode])
    setIsRunning(false)
  }

  // Reset timer ke durasi awal mode ini
  const handleReset = () => {
    setTimeLeft(MODES[mode])
    setIsRunning(false)
  }

  // Ubah detik → format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="min-h-screen bg-[#383a3d] flex items-center justify-center main-section">
      <div className="bg-white/20 rounded-2xl p-10 w-96 text-center text-white shadow-xl">

        {/* Judul */}
        <h1 className="text-3xl font-bold mb-8">Pomodoro Timer</h1>

        {/* Tombol pilih mode */}
        <div className="flex justify-center gap-2 mb-8">
          {Object.keys(MODES).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${mode === m ? 'bg-white text-[#213e82]' : 'hover:bg-white/20'}`}
            >
              {m === 'pomodoro' ? 'Pomodoro' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>

        {/* Tampilan waktu */}
        <div className="text-8xl font-bold tracking-widest mb-10">
          {formatTime(timeLeft)}
        </div>

        {/* Tombol Start / Pause & Reset */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(prev => !prev)}
            className="bg-white text-[#213e82] font-bold px-10 py-3 rounded-full text-lg hover:scale-105 transition-transform"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="bg-white/20 font-bold px-6 py-3 rounded-full text-lg hover:bg-white/30 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App