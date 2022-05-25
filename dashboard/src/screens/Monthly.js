import { Col, Container, Row } from "react-bootstrap";
import Arrow from '../assets/images/arrow.png'
import ArrowWhite from '../assets/images/arrow-white.png'
import Hest from '../assets/images/hest.png'
import Usdt from '../assets/images/usdt.png'
import { memo } from "react";
import { useState,useEffect } from "react";

import Crowdsale from '../contract/Crowdsale.json';
import jTC from '../contract/JTC.json';
import {crowdsale_addr , jTC_addr} from '../contract/addresses'
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { ethers, BigNumber } from 'ethers'
import { useParams } from "react-router-dom";

function Monthly() {
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

    const [users , setUsers] = useState([])
    const {id} = useParams();

    const getMonth = (time) => {
        const months3 = 0//7776000
        const months6 = 7776000
        const months9 = 7776000
        const months12 = 7776000
        const currentTime = Date.now()/1000
        if(currentTime > time + months3 && currentTime < time + months6){
            return 3;
        }else if(currentTime > time + months6 && currentTime < time + months9){
            return 6;
        }else if(currentTime > time + months9 && currentTime < time + months12){
            return 9;
        }else if(currentTime > time + months12){
            return 12;
        } 
    }
    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
          }
      };

      useEffect(async()=>{
        
      },[])

      
    return <>
        <Container fluid className="main-height">
            <Row>
                <Col lg={12} md={12}>
                    <div className="custom-chart-margin">
                    <h5 class="section-title">
                        {
                            id == 'three' ? '3 Months' : id == 'six' ? '6 Months'
                            : id == 'nine' ? '9 Months' : '12 Months' 
                        }
                    </h5>
                        <table class="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Token Hold</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>0x000000000000000000000</td>
                            <td>5</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}
export default memo(Monthly);