import axios from 'axios'
import { useState } from 'react'

function App() {
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)
const [result, setResult] = useState('')

    const playGame = async () => {
      setResult('')
        setIsLoading(true)
        const headers = {
            accept: 'application/json, text/plain, */*',
            authorization: token,
            origin: 'https://telegram.blum.codes',
        }

        try {
            const response = await axios.post('https://game-domain.blum.codes/api/v1/game/play', {}, { headers })
            const gameId = response?.data?.gameId

            setTimeout(async () => {
                try {
                    const points = Math.floor(Math.random() * (225 - 200 + 1)) + 200

                    const response2 = await axios.post('https://game-domain.blum.codes/api/v1/game/claim', { gameId, points }, { headers })

                    setResult(response2?.data, ` +${points}`)
                    setIsLoading(false)
                } catch (error) {
                    setIsLoading(false)
                }
            }, 41000)
        } catch (error) {
            setIsLoading(false)
            alert('token หมดอายุ ไปเอาอันใหม่มา')
        }
    }

    return (
        <>
            <div style={{ display: 'flex', gap: '4px' }}>
                <input onChange={(e) => setToken(e.target.value)} />
                <button onClick={() => playGame()} disabled={isLoading}>
                    run
                </button>
            </div>
            {isLoading && <h1>รอแปป(40วิ)</h1>}
            {result && <h1>{result}</h1>}
        </>
    )
}

export default App
