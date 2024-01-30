#### Header Component

A simple header component that will run as a federated module.

**CDN_LOCATION:** unnatural-slope.surge.sh

**FRAMEWORK:** `react@18.2`

**COMPONENT:** `Header`

---

#### Events

##### Events dispatched

- `clearBasket` - to clear all items from the baset
- `applyVoucher` - TBC this is already dispatched from basket

##### Events listened for

- `basketItemCount` - emitted from basket and used to updated counter next to basket item and add UX to make basket icon selected
- `applyVoucher` - emitted from basket and used to add UX to make voucher icon selected
