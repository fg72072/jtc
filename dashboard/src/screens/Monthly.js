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
import {getMonthData , createMonthData} from '../servises/apis.js'

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
        const months3 = 86400//7776000
        const months6 = 86400 + 3600   //15552000
        const months9 = 86400 + 3600 *2 // 23328000
        const months12 = 86400 + 3600 *3 // 31536000
        const currentTime = Date.now()/1000
        if(currentTime > time + months3 && currentTime < time + months6){
            return 3;
        }else if(currentTime > time + months6 && currentTime < time + months9){
            return 6;
        }else if(currentTime > time + months9 && currentTime < time + months12){
            return 9;
        }else if(currentTime > time + months12){
            return 12;
        }else{
            return 0;
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

      const GetInfo = async (e) => {
        try{
            let signer = await loadProvider()
            let crowdsaleCon = new ethers.Contract(crowdsale_addr, Crowdsale, signer)
            let JTC = new ethers.Contract(jTC_addr, jTC, signer)
            let totalUsers = await crowdsaleCon.totalUsers()
            let _users = []
            console.log("number " , totalUsers.toNumber())
            let address = []
            let balances = []
            for (let index = 0; index < totalUsers.toNumber(); index++) {
                let user = await crowdsaleCon.accounts(index)
                let bal = await JTC.balanceOf(user)
                bal = ethers.utils.formatEther(bal.toString(), 18 )
                address.push(user)
                balances.push(bal.toString())
            }
            return {address , balances}
           
        }catch(e){
            console.log("user",e)
        }
    }

      const GetTime = async (e) => {
        try{
            let signer = await loadProvider()
            let crowdsaleCon = new ethers.Contract(crowdsale_addr, Crowdsale, signer)
            let JTC = new ethers.Contract(jTC_addr, jTC, signer)
            let time = await crowdsaleCon.deploymentTime()
            console.log(Number(time.toString()))
            return Number(time.toString())
        }catch(e){
            console.log("user",e)
        }
    }
      const addUser = (addresses , balance) =>{
        let arr = []
        for (let index = 0; index < addresses.length; index++) {
            let obj = {
                row : index,
                address : addresses[index],
                balance : balance[index]
            }
            arr.push(obj)
        }
        setUsers(arr)
      }

    const Userlist = users.map((data) =>

    <tbody>
    <tr>
    <th scope="row">{data.row}</th>
    <td>{data.address}</td>
    <td>{data.balance}</td>
    </tr>
    </tbody>
     );

      useEffect(async()=>{
        try {
           // const id = id.toNumber()
            
            const data = await getMonthData(id)
            console.log("sadasd",data)
            const {addresses , balance} = data
            
            if(data == undefined || data.length == 0 || data == null || data == 0){
                console.log("inn ",getMonth(await GetTime()))
                let time = await GetTime()
                let month = getMonth(time)
                if(Number(id) == month){
                    const {address , balances} = await GetInfo()
                    const result = await createMonthData(address , balances , time)
                    addUser(result.addresses , result.balance);
                    console.log("inn result :" , result)
                }else{
                    setUsers([])
                }
            }else{
                addUser(addresses , balance);
            }
           

        } catch (error) {
            
        }
      },[id])

      
    return <>
        <Container fluid className="main-height">
            <Row>
                <Col lg={12} md={12}>
                    <div className="custom-chart-margin">
                    <h5 class="section-title">
                        {
                            id == '3' ? '3 Months' : id == '6' ? '6 Months'
                            : id == '9' ? '9 Months' : '12 Months' 
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
    {Userlist}
    </table>
                    
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}
export default memo(Monthly);