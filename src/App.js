import React from "react";
import MintNFT from "./MintNFT";
import "./App.css";
import nft from "./my avatar.jpg";

const App = () => {
  return (
    <div className="nft_mint_dapp">
      <header className="header_label">
        <h1>Udala Collections</h1>
      </header>
      <main>
        <MintNFT />
        <img src={nft}></img>
      </main>
    </div>
  );
};

export default App;
