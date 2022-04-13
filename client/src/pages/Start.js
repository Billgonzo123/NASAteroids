import React from "react";
import Footer from "../components/Footer";

const Start = () => {
  return (
    <>
      <main>
        <div className="logo">
          <h1>ASTEROIDS</h1>
        </div>
        <div className="leader-board">
          <table>
            <tr>
              <td>L33TGAMR</td>
              <td>PAPRSHRDR</td>
              <td>EMDOK</td>
              <td>KT</td>
              <td>KURZ890</td>
              <td>ANGALET</td>
              <td>BEEKILLR</td>
              <td>FFYOGURT</td>
              <td>KILLRBRGR</td>
            </tr>
            <tr>
              <td>500900</td>
              <td>400890</td>
              <td>400777</td>
              <td>399999</td>
              <td>383876</td>
              <td>369870</td>
              <td>200000</td>
              <td>198708</td>
              <td>187907</td>
            </tr>
          </table>
        </div>
        <div>
          <a href="/">Login</a>
          <a href="/">Signup</a>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Start;
