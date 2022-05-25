import { Container, Row, Col } from "react-bootstrap"
import { Header } from "../component"
import logo from "../assets/images/favicon.png"
import { useState,useEffect } from "react";
import { ethers, BigNumber } from 'ethers'
import Crowdsale from '../contract/Crowdsale.json';
import {crowdsale_addr} from '../contract/addresses'
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { Link } from "react-router-dom";


function PublicSale(){
    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const [qty,setQty] = useState(1);
    const initialValue = 0.000001
    const [price,setPrice] = useState(0.000001);

    const increase = () => {
        
        if(qty < 10000000){
            setQty(qty + 1)
        }
    };

    const decrease = () => {
        if(qty > 1){
            setQty(qty - 1)
        }
    };
    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
          }
      };
    const buy = async (e) => {
        try{
            let signer = await loadProvider()
            let _value = await ethers.utils.parseUnits(price.toString() , 8 )
            let crowdsaleCon = new ethers.Contract(crowdsale_addr, Crowdsale, signer)
            let buy = await crowdsaleCon.buyTokens({value : _value})
            await buy.wait()
        }catch(e){

        }
    }
    useEffect(()=>{
        setPrice(initialValue * qty)
        loadProvider()
    },[qty])

return(

    <>
    
        <Header type="dark"/>

        <section class="buy">


            <Container className="h-100">

                <Row className="h-100 align-items-center">
                    
                    <Col lg={6}>


                        <div class="single-token">

                            <img src={logo} />

                        </div>


                    </Col>


                    <Col lg={6}>


                        <div class="single-token-des">
                            <h5>Public Sale</h5>

                            <h1>JTC Token</h1>
                            <p class="p-bold">You cannot mint our NFT cards at this time. Very soon this chance will be yours!</p>

                            <h3>{parseFloat(price.toFixed(7))} BNB</h3>

                            <div className="min-max">
                                
                            <div class="increament">
                                <div class="value-button decrease" id="decrease" value="Decrease Value" onClick={(e)=>decrease()}>-</div>
                                <input type="number" id="room-number" value={qty} min="1" max="100000" class="number" readOnly/>
                                <div class="value-button increase" id="increase" value="Increase Value" onClick={(e)=>increase()}>+</div>
                            </div>

                                
                            </div>

                            <div class="token-place-order">

                            <button class="custom-btn primary-btn" onClick={(e)=>buy()}>BUY JTC TOKEN</button>


                            </div>


                        </div>


                    </Col>
                </Row>

            </Container>

        </section>

    </>

)

}

export default PublicSale