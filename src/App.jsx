import axios from 'axios'
import { useState } from 'react'

function App() {
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState('')

    const playGame = async () => {
        const headers = {
            accept: 'application/json, text/plain, */*',
            authorization: token,
            origin: 'https://telegram.blum.codes',
        }
        const balance = await axios.get('https://game-domain.blum.codes/api/v1/user/balance', {
            headers,
        })
        const { playPasses } = balance?.data
        setResult('')
        setIsLoading(true)

        for (let i = 0; i <= playPasses; i++) {
            try {
              const response = await axios.post('https://game-domain.blum.codes/api/v1/game/play', {}, { headers });
              const gameId = response?.data?.gameId;
        
              await new Promise((resolve) => {
                setTimeout(async () => {
                  try {
                    const points = Math.floor(Math.random() * (225 - 200 + 1)) + 200;
                    const response2 = await axios.post('https://game-domain.blum.codes/api/v1/game/claim', { gameId, points }, { headers });
        
                    setResult((prev) => `${prev && prev} ${response2?.data}+${points}`);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsLoading(false);
                    resolve(); 
                  }
                }, 41000); 
              });
            } catch (error) {
              setIsLoading(false);
              alert(error?.response?.data?.message ?? 'token หมดอายุ ไปเอาอันใหม่มา');
            }
          }
    }

    return (
        <>
        ใส่ Token แล้วรอจนจบ
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
