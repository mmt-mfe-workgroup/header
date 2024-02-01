import { useEffect, useState, lazy, Suspense } from 'react'
import './index.css'
import basket from './assets/icons/basket.svg'
import Loader from './components/Loader'
import basketSelected from './assets/icons/basket-selected.svg'
const RemoteButton = lazy(() => import('UI/Button'))
import ErrorBoundary from './components/ErrorBoundary'

function App({ label }: { label?: string }) {
  const [clickedVocher, setClickedVoucher] = useState(false)

  const [basketTotal, setBasketTotal] = useState(0)

  const [clearedBasket, setClearedBasket] = useState(0)
  const [voucherCode, setVoucherCode] = useState('')

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('basketItemCount', (e: any) =>
      setBasketTotal(e?.detail?.basketItemCount)
    )
    return () => {
      window.removeEventListener('basketItemCount', () => setBasketTotal(0))
    }
  }, [])

  const handleVoucherClick = (voucherCode: string) => {
    // bool for now
    const voucherClickEvent = new CustomEvent('addVoucher', {
      detail: { voucherCode },
    })

    window.dispatchEvent(voucherClickEvent)

    setClickedVoucher(!clickedVocher)
    console.log(`Dispatched addVoucher event with code ${voucherCode}`)
  }

  const handleClearBasketClick = () => {
    const basketClearEvent = new CustomEvent('clearBasket')

    window.dispatchEvent(basketClearEvent)

    console.log(`Dispatched clearBasket event`)
    setClearedBasket(0)
  }

  return (
    <>
      <div className="top-0 left-0">
        <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
            <span className="w-1/2 self-center text-4xl font-semibold whitespace-nowrap text-black">
              {label || 'MFE APP'}
            </span>
            <span className="ml-auto flex">
              <span className="flex mx-2 max-h-13 items-center">
                <div className="flex">
                  <input
                    type="search"
                    onChange={(e) => setVoucherCode(e?.target?.value)}
                    id="default-search"
                    className="ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={clickedVocher ? '' : 'Enter code...'}
                    required
                  />
                  <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                      <RemoteButton
                        label={
                          clickedVocher ? 'Voucher applied' : 'Apply voucher'
                        }
                        onClick={() => handleVoucherClick(voucherCode)}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </span>
            </span>
            <span className="flex mx-2 max-h-13 items-center ml-2">
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <RemoteButton
                    label="Clear basket"
                    onClick={() => handleClearBasketClick()}
                  />
                </Suspense>
              </ErrorBoundary>
              <img
                className="max-h-12 max-w-8 ml-2"
                src={basketTotal ? basketSelected : basket}
                alt="basket"
              />
              <span className="mb-6">{basketTotal || clearedBasket}</span>
            </span>
          </div>
        </nav>
      </div>
    </>
  )
}

export default App
