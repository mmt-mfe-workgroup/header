import { useEffect, useState, lazy, Suspense } from 'react'
import './index.css'
import voucher from './assets/icons/voucher.svg'
import voucherSelected from './assets/icons/voucher-selected.svg'
import basket from './assets/icons/basket.svg'
import Loader from './components/Loader'
import basketSelected from './assets/icons/basket-selected.svg'
const RemoteButton = lazy(() => import('UI/Button'))

function App({ label }: { label: string }) {
  const [clickedVocher, setClickedVoucher] = useState(false)

  const [basketTotal, setBasketTotal] = useState(0)

  const [clearedBasket, setClearedBasket] = useState(5)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('basketItemCount', (e: any) =>
      setBasketTotal(e?.detail?.basketItemCount)
    )
    // bool for now
    window.addEventListener('applyVoucher', () => setClickedVoucher(true))
    return () => {
      window.removeEventListener('basketItemCount', () => setBasketTotal(0))
    }
  }, [])

  const handleVoucherClick = () => {
    const voucherClickEvent = new CustomEvent('addVoucher')

    window.dispatchEvent(voucherClickEvent)

    setClickedVoucher(!clickedVocher)
    console.log(`Dispatched addVoucher event`)
  }

  const handleClearBasketClick = () => {
    const basketClearEvent = new CustomEvent('clearBasket')

    window.dispatchEvent(basketClearEvent)

    console.log(`Dispatched clearBasket event`)
    setClearedBasket(0)
  }

  return (
    <>
      <div className="sticky top-0 left-0">
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
              {label || 'MFE APP'}
            </span>
            <div className="flex space-x-3">
              <div className="flex flex-col justify-between">
                <p className="text-center text-white">Vouchers</p>
                <div
                  className="px-5 clickable"
                  onClick={() => handleVoucherClick()}
                >
                  <img
                    src={clickedVocher ? voucherSelected : voucher}
                    className="logo"
                    alt="voucher"
                  />
                </div>
                <Suspense fallback={<Loader />}>
                  <RemoteButton
                    label="Apply voucher"
                    onClick={() => handleVoucherClick()}
                  />
                </Suspense>
              </div>
              <div className="flex flex-col justify-around">
                <p className="text-center text-white">Basket</p>
                <img
                  src={basketTotal ? basketSelected : basket}
                  className="logo"
                  alt="basket"
                />
                <span className="absolute text-white">
                  {basketTotal || clearedBasket}
                </span>
                <Suspense fallback={<Loader />}>
                  <RemoteButton
                    label="Clear basket"
                    onClick={() => handleClearBasketClick()}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default App
