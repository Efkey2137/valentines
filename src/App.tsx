import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

export default function AnimatedHearts() {
  const [animationStage, setAnimationStage] = useState(-1) // -1 for setup stage
  const [showText, setShowText] = useState(false)
  const [isTapping, setIsTapping] = useState(false)
  const [merged, setMerged] = useState(false)
  const [firstLetter, setFirstLetter] = useState("")
  const [secondLetter, setSecondLetter] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const manifestData = {
    name: "Valentine's App",
    short_name: "Valentine",
    display: "standalone",
    start_url: ".",
    background_color: "#ffffff",
    theme_color: "#ffffff"
  }

  useEffect(() => {
    // Update theme-color meta tag
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', isDarkMode ? '#111827' : '#ffffff')
    }

    // Update manifest dynamically
    const manifestLink = document.querySelector('link[rel="manifest"]')
    if (manifestLink) {
      const manifest = {
        ...manifestData,
        background_color: isDarkMode ? '#111827' : '#ffffff',
        theme_color: isDarkMode ? '#111827' : '#ffffff'
      }
      const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' })
      manifestLink.setAttribute('href', URL.createObjectURL(blob))
    }
  }, [isDarkMode])

  const handleStart = () => {
    if (firstLetter && secondLetter) {
      setAnimationStage(0)
      // Start the animation sequence
      setTimeout(() => {
        handleTapSequence()
      }, 500)
    }
  }

  const handleTapSequence = () => {
    // First tap
    setIsTapping(true)

    setTimeout(() => {
      setIsTapping(false)

      // Second tap
      setTimeout(() => {
        setIsTapping(true)

        setTimeout(() => {
          setIsTapping(false)

          // Third tap
          setTimeout(() => {
            setIsTapping(true)

            setTimeout(() => {
              setIsTapping(false)

              // Move to merging stage after all 3 taps
              setTimeout(() => {
                setAnimationStage(1)
                setMerged(true)

                // Show text after merging
                setTimeout(() => {
                  setShowText(true)
                }, 1000)
              }, 500)
            }, 300) // Duration of third tap
          }, 700) // Delay before third tap
        }, 300) // Duration of second tap
      }, 700) // Delay before second tap
    }, 300) // Duration of first tap
  }

  if (animationStage === -1) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen w-screen ${
        isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-pink-50 to-red-50'
      }`}>
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  First Person's Initial:
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={firstLetter}
                  onChange={(e) => setFirstLetter(e.target.value.toUpperCase())}
                  className={`px-4 py-2 rounded border text-center text-xl uppercase ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Second Person's Initial:
                </label>
                <input
                  type="text"
                  maxLength={1}
                  value={secondLetter}
                  onChange={(e) => setSecondLetter(e.target.value.toUpperCase())}
                  className={`px-4 py-2 rounded border text-center text-xl uppercase ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                  ${isDarkMode 
                    ? 'border-white/20 bg-gray-800 text-white hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }
                  backdrop-blur-sm`}
              >
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              
              <button
                onClick={handleStart}
                disabled={!firstLetter || !secondLetter}
                className={`px-6 py-3 rounded-full font-bold text-white
                  ${firstLetter && secondLetter 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-400 cursor-not-allowed'
                  } transition-all`}
              >
                Start Animation
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-screen ${
      isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-pink-50 to-red-50'
    }`}>
      <div className="relative h-[80vh] md:h-96 w-full flex items-center justify-center">
        {/* First heart */}
        <div
          className={`absolute transition-all duration-500 ease-in-out ${
            merged ? "opacity-0" : "opacity-100"
          } ${isTapping ? "scale-110" : "scale-100"}`}
          style={{
            transform: merged 
              ? "translate(0, 0)" 
              : `translate(${window.innerWidth >= 768 ? '-150px' : '0'}, ${window.innerWidth >= 768 ? '0' : '-150px'})`,
          }}
        >
          <div className="relative">
            <Heart className={`h-24 w-24 md:h-64 md:w-64 lg:h-80 lg:w-80 ${isDarkMode ? 'text-red-400' : 'text-red-500'} ${isDarkMode ? 'fill-red-400' : 'fill-red-500'} ${isDarkMode ? 'stroke-red-500' : 'stroke-red-600'}`} />
            <span className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-6xl lg:text-7xl font-bold">
              {firstLetter}
            </span>
          </div>
        </div>

        {/* Second heart */}
        <div
          className={`absolute transition-all duration-500 ease-in-out ${
            merged ? "opacity-0" : "opacity-100"
          } ${isTapping ? "scale-110" : "scale-100"}`}
          style={{
            transform: merged 
              ? "translate(0, 0)" 
              : `translate(${window.innerWidth >= 768 ? '150px' : '0'}, ${window.innerWidth >= 768 ? '0' : '150px'})`,
          }}
        >
          <div className="relative">
            <Heart className={`h-24 w-24 md:h-64 md:w-64 lg:h-80 lg:w-80 ${isDarkMode ? 'text-red-400' : 'text-red-500'} ${isDarkMode ? 'fill-red-400' : 'fill-red-500'} ${isDarkMode ? 'stroke-red-500' : 'stroke-red-600'}`} />
            <span className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-6xl lg:text-7xl font-bold">
              {secondLetter}
            </span>
          </div>
        </div>

        {/* Merged heart */}
        <div
          className={`absolute transition-all duration-1000 ease-in-out ${
            merged ? "opacity-100 scale-110" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative">
            <Heart className={`h-48 w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 ${
              isDarkMode ? 'text-red-400' : 'text-red-500'
            } ${
              isDarkMode ? 'fill-red-400' : 'fill-red-500'
            } ${
              isDarkMode ? 'stroke-red-500' : 'stroke-red-600'
            }`} />
            <span className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl lg:text-7xl font-bold pb-6 md:pb-10">
              {firstLetter}+{secondLetter}
            </span>
          </div>
        </div>
      </div>

      {/* I LOVE YOU text */}
      <div
        className={`mt-8 md:mt-12 lg:mt-16 transition-all duration-1000 ease-in-out ${
          showText ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          I LOVE YOU <span className={isDarkMode ? 'text-red-400' : 'text-red-500'}>❤</span>
        </h2>
      </div>
    </div>
  )
}

