import React, {useState} from 'react';
import axios from 'axios';
import Modal from './modal.js';
import Map from './map.js';
import './Users.css'

function Users({ address, category, homePageLink, imageLink, roadAddress, title }) {
    const [, setResource] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);

    const posting = async () => {
        const headers = {
            'address': address,
            'category': category,
            'homePageLink': homePageLink,
            'imageLink': imageLink,
            'roadAddress': roadAddress,
            'title': title
        };
        try {
            setResource((await axios.post(`/api/restaurant`, headers)).data);
        } catch (error) {
            console.log(error);
            openModal();
        }
    }

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const openMap = () => {
        setMapOpen(true);
    };
    const closeMap = () => {
        setMapOpen(false);
    };

    const id = Math.floor(Math.random() * 2100000000);

    return (
        <>
            <div className='matjip'>
                <div className='info'>
                    <div className='imgdiv'>
                        <img src={imageLink} alt='' style={{height: '80%'}}/>
                    </div>
                    <div className='meow'>
                        <h2>{title}</h2>
                        <h4>{category}</h4>
                        <h4>{address}</h4>
                        <h4>{roadAddress}</h4>
                    </div>
                </div>
                <button className='mjbutton' onClick={posting}>맛집추가</button>
                <button className='mjbutton' onClick={openMap}>지도 보기</button>
                <Modal open={modalOpen} close={closeModal} header="이미 등록된 맛집입니다."></Modal>
                <Map open={mapOpen} close={closeMap} location={address} locationName={title} id={id}></Map>
            </div>
            <div className='mapDivItems' id={`mapDiv-${id}`}></div>
        </>
    )
}

export default Users;