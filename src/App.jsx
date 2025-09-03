import React from 'react'
import './App.css'
// import FilesAndFolders from './FilesAndFolders'
// import OTPInput from './OTPInput'
// import UseHover from './UseHover'
// import UseFocus from './UseFocus'
// import NestedCheckBoxes from './NestedCheckBoxes'
// import StarWidget from './StarWidget'
// import NestedComments from './NestedComments'
// import CountriesWithCapitals from './CountriesWithCapitalsGame'
import FlipCard from './FlippingComponent2'

export default function App() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
       <FlipCard
        width={300}
        height={200}
        front={<div>✨ Special Offer</div>}
        back={
          <div>
            <p>Use Code:</p>
            <code>SAVE20</code>
          </div>
        }
      />
    </div>
  );
}

