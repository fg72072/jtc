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

function User() {
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

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
          } catch (e) {
          }
      };

    const Userlist = users.map((data) =>
      <tr>
      <th scope="row">{data.row}</th>
      <td>{data.address}</td>
      <td>{data.balance}</td>
       <td>{data.date}</td>
      </tr>
    );

    const GetInfo = async (e) => {
        try{
            let signer = await loadProvider()
            let crowdsaleCon = new ethers.Contract(crowdsale_addr, Crowdsale, signer)
            let JTC = new ethers.Contract(jTC_addr, jTC, signer)
            let totalUsers = await crowdsaleCon.totalUsers()
            let _users = []
            console.log("number " , totalUsers.toNumber())

            for (let index = 0; index < totalUsers.toNumber(); index++) {
                let user = await crowdsaleCon.accounts(index)
                let detail = await crowdsaleCon.purchaseDetails(user)
                console.log("detail " , detail)
                let time = detail[0].toNumber()
                let date = new Date(time*1000).toLocaleDateString("en-US")
                date = date.toString()
                let bal = detail[2].toString()
                bal = ethers.utils.formatEther(bal.toString(), 18 )
                let obj = {
                    row : index +1 ,
                    address : user,
                    balance : bal,
                    date : date
                }
                _users.push(obj)
            }
            setUsers(_users)
           
        }catch(e){
            console.log("user",e)
        }
    }


    useEffect(async ()=>{
        try {
        async function fetchData() {
                // You can await here
                 const response = await GetInfo()
                // ...
              }
        fetchData();
        } catch (error) {
            
        }
        
    } , activate , account)
    return <>
        <Container fluid className="main-height">
            <Row>
                <Col lg={12} md={12}>
                    <div className="custom-chart-margin">
                    <h5 class="section-title">Users</h5>
                        <table class="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Token Hold</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Userlist}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}
export default memo(User);