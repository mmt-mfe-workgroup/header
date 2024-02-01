import { useEffect, useState, lazy, Suspense } from 'react'
import './index.css'
import basket from './assets/icons/basket.svg'
import Loader from './components/Loader'
import basketSelected from './assets/icons/basket-selected.svg'
const RemoteButton = lazy(() => import('UI/Button'))
import ErrorBoundary from './components/ErrorBoundary'

const PROMO_CODES = [
  'MONDAY30',
  'TUESDAY25',
  'WEDNESDAY50',
  'THURSDAY15',
  'FRIDAY10',
]

function App({ label }: { label?: string }) {
  const [clickedVocher, setClickedVoucher] = useState(false)

  const [basketTotal, setBasketTotal] = useState(0)

  const [clearedBasket, setClearedBasket] = useState(0)

  const [voucherCode, setVoucherCode] = useState('')

  const [invalidVoucher, setInvalidVoucher] = useState('')

  const [xrayActive, setXrayActive] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('basketItemCount', (e: any) =>
      setBasketTotal(e?.detail?.basketItemCount)
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('view:x-ray', (e: any) => {
      console.log('XXX - e:', e)
      if (e?.target?.checked) setXrayActive(true)
      else setXrayActive(false)
    })

    return () => {
      window.removeEventListener('basketItemCount', () => setBasketTotal(0))
    }
  }, [])

  const handleVoucherClick = (voucherCode: string) => {
    if (!PROMO_CODES.find((code) => code === voucherCode)) {
      setVoucherCode('')
      setInvalidVoucher('Invalid code')
      return
    }
    // bool for now
    const voucherClickEvent = new CustomEvent('addVoucher', {
      detail: { voucherCode },
    })

    window.dispatchEvent(voucherClickEvent)
    setInvalidVoucher('')
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
          {xrayActive && (
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 bg-green-400">
              <span className="w-1/2 self-center text-base font-semibold whitespace-nowrap text-black">
                <p>
                  CDN_LOCATION =
                  https://mmt-mfe-header.netlify.app/assets/remoteEntry.js
                </p>
                <p>FRAMEWORK = REACT@18.2</p>
                <p>APP NAME = HEADER</p>
                <p>
                  EVENTS - DISPATCHED "addVoucher", "clearBasket" EVENTS -
                  SUBSCRIBED "view:xray"
                </p>
              </span>
            </div>
          )}

          {!xrayActive && (
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
                      value={voucherCode}
                      id="default-search"
                      className={
                        invalidVoucher
                          ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 mr-4 ps-10 text-sm rounded-lg bg-gray-50'
                          : 'mr-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                      }
                      placeholder={
                        invalidVoucher ? invalidVoucher : 'Enter code...'
                      }
                      required
                    />
                    <ErrorBoundary>
                      <Suspense fallback={<Loader />}>
                        <RemoteButton
                          label={
                            clickedVocher && !invalidVoucher
                              ? 'Voucher applied'
                              : 'Apply voucher'
                          }
                          onClick={() => handleVoucherClick(voucherCode)}
                        />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </span>
                <span className="flex mx-2 max-h-13 items-center ml-2">
                  <span className="w-32 mr-9">
                    <ErrorBoundary>
                      <Suspense fallback={<Loader />}>
                        <RemoteButton
                          label="Clear basket"
                          onClick={() => handleClearBasketClick()}
                        />
                      </Suspense>
                    </ErrorBoundary>
                  </span>
                  <img
                    className="max-h-12 max-w-8"
                    src={basketTotal ? basketSelected : basket}
                    alt="basket"
                  />
                  <span className="mb-6 text-black">
                    {basketTotal || clearedBasket}
                  </span>
                </span>
              </span>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default App
