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
// import FlipCard from './FlippingComponent2'

import TypingSpeedTest from "./TypingSpeedTest"
import { css } from '@emotion/react'


export default function App() {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div css={css({
      width: "100vw",
      height: "100vh",
    })}>
    <TypingSpeedTest/>
    </div>
    // <div style={{ padding: 24, display: "grid", gap: 24 }}>
      
    // </div>
  );
}

