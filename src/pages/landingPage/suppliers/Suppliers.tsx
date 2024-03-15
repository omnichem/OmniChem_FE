import React from 'react'
import './suppliers.css'

import basf from './images/basf.jpeg'
import givaudan from './images/Givaudan.png'
import croda from './images/croda.jpg'
import seppic from './images/seppic.jpeg'
import cardill from './images/cardill.png'
import ppg from './images/ppg.png'
import sasol from './images/sasol.jpg'
import sabic from './images/sabic.png'
import nouryon from './images/nouryon.jpg'
import ingredion from './images/ingredion.jpg'
import adm from './images/ADM.png'
import mitsubishi from './images/mitsubishi.png'
import ajinomoto from './images/ajinomoto.jpg'
import evonik from './images/evonik.png'
import pg from './images/pg.png'

const Suppliers = () => {
  return (
    <div className="suppliers">
        <div className="suppliers-wrapper">   
            <div className="suppliers-grid">
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.agro.basf.ru/ru/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={basf} alt="basfLogoc logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.givaudan.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={givaudan} alt="givaudan logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.croda.com/en-gb" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={croda} alt="croda logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.seppic.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={seppic} alt="seppic logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.cargill.ru/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={cardill} alt="cargill logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.ppg.com/en-US/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={ppg} alt="ppg logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.sasol.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={sasol} alt="sasol logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.sabic.com/en/products" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={sabic} alt="sabic logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.nouryon.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={nouryon} alt="nouryon logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.ingredion.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={ingredion} alt="ingredion logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.adm.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={adm} alt="ADM logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.m-chemical.co.jp/en/index.html" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={mitsubishi} alt="mitsubishi" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://www.ajinorthamerica.com/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={ajinomoto} alt="ajinomoto logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://corporate.evonik.com/en" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={evonik} alt="evonik logo" /></a>
                </div>
                <div className="suppliers-item">
                    <a className="suppliers-link" href="https://us.pg.com/ingredients/" target="_blanket" rel="noopener noreferrer"><img className="suppliers-logo" src={pg} alt="p&g logo" /></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Suppliers
