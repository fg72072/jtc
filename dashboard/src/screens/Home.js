import { Col, Container, Row } from "react-bootstrap";
import Arrow from '../assets/images/arrow.png'
import ArrowWhite from '../assets/images/arrow-white.png'
import Hest from '../assets/images/hest.png'
import Usdt from '../assets/images/usdt.png'
import { useState,useEffect } from "react";
import { FinancialChartStockIndexChart } from '../components/Index'
import { ethers, BigNumber } from 'ethers'
import Crowdsale from '../contract/Crowdsale.json';
import {crowdsale_addr} from '../contract/addresses'
import { useWeb3React } from "@web3-react/core";
import Web3Modal from 'web3modal'
import { memo } from "react";

function Home() {

    const [TotalUsers,setTotalUsers] = useState("loading ...")
    const [TotalRaised,setTotalRaised] = useState("loading ...")
    const [TotalMRaised,setTotalMRaised] = useState("loading ...")
    const [TotalDRaised,setTotalDRaised] = useState("loading ...")
    const [TotalWRaised,setTotalWRaised] = useState("loading ...")

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
            let totalUsers = await crowdsaleCon.totalUsers()
            let totalraised = await crowdsaleCon._weiRaised()
            let totalMraised = await crowdsaleCon.RaisedDetail(30)
            let totalWraised = await crowdsaleCon.RaisedDetail(7)
            let totalDraised = await crowdsaleCon.RaisedDetail(1)
            let _value = await ethers.utils.formatEther("1" , 18 )
            setTotalRaised(ethers.utils.formatUnits(totalraised.toString() , 8 ))
            setTotalUsers(totalUsers.toString())
            setTotalMRaised(ethers.utils.formatUnits(totalMraised.toString(), 8 ))
            setTotalWRaised(ethers.utils.formatUnits(totalWraised.toString(), 8 ))
            setTotalDRaised(ethers.utils.formatUnits(totalDraised.toString(), 8 ))
        }catch(e){

        }
    }

    useEffect(async ()=>{
        try {
           await GetInfo()
           
        } catch (error) {
            
        }
        
    },[chainId])
    return <>
        <Container fluid className="main-height">
            <Row>
                <Col lg={12} md={12}>
                    <div className="custom-chart-margin">
                        {/* <FinancialChartStockIndexChart/> */}
                        <h3 className="section-title">Dashboard</h3>
                        <div className="analytics">
                            <div class="dashboard-box">
                                <h3>{TotalUsers}</h3>
                                <hr />
                                <span>Total Users</span>
                            </div>
                            <div class="dashboard-box">
                                <h3>{TotalRaised}</h3>
                                <hr />
                                <span>Total Raised</span>
                            </div>
                            <div class="dashboard-box">
                                <h3>{TotalMRaised}</h3>
                                <hr />
                                <span>Monthly Raised</span>
                            </div>
                            <div class="dashboard-box">
                                <h3>{TotalWRaised}</h3>
                                <hr />
                                <span>Weekly Raised</span>
                            </div>
                            <div class="dashboard-box">
                                <h3>{TotalDRaised}</h3>
                                <hr />
                                <span>Daily Raised</span>
                            </div>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}
export default memo(Home);