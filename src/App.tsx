import { useState } from 'react'
import './index.css'
import voucher from './assets/icons/voucher.svg'
import voucherSelected from './assets/icons/voucher-selected.svg'
import basket from './assets/icons/basket.svg'
import basketSelected from './assets/icons/basket-selected.svg'

function App() {

  const [clickedVocher, setClickedVoucher] = useState(false)
  // get actual value from props later
  const [basketTotal, setClearedBasket] = useState(5)

  const onVoucherClick = () => {
    setClickedVoucher(!clickedVocher)
  }

  const onClearBasketClick = () => {
    setClearedBasket(0)
  }

  return (
    <>
      <div className="sticky top-0 left-0">
        <nav>
          <div className="border border-black">
            <div className="flex flex-column justify-between">
              <h1 className='my-auto ml-8 text-5xl'>MFE App</h1>
            <div className="flex">
              <div>
                <ul className="flex">
                  <li>
                    <p className="text-center">Apply Voucher</p>
                    <div className="px-5 clickable" onClick={() => onVoucherClick()}>
                      <img src={clickedVocher ? voucherSelected : voucher} className="logo" alt="voucher" />
                    </div>
                  </li>
                  <li>
                    <div>
                      <p className="text-center">Basket</p>
                      <div className="px-5">
                        <img src={basketTotal ? basketSelected : basket} className="logo" alt="basket" />
                        <span className='absolute top-12 right-7'>{basketTotal}</span>
                        <div className='clickable' onClick={() => onClearBasketClick()}>Clear basket</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default App
