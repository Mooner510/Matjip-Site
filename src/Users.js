import React, { useState } from 'react';
import axios from 'axios';
import Modal from './modal';
import './Users.css'

function Users(props) {
    const [res, setResource] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const posting = async () => {
        const headers = {
            'address': props.address,
            'category': props.category,
            'homePageLink': props.homePageLink,
            'imageLink': props.imageLink,
            'roadAddress': props.roadAddress,
            'title': props.title
        }
        try {
            setResource(await axios.post("/api/restaurant", headers));
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

    return(
        <div className='matjip'>
            <div className='info'>
                <div className='imgdiv'>
                    <img src={props.imageLink} alt='' style={{height: '80%'}}/>
                </div>
                <div>
                    <h2>{props.title}</h2>
                    <h4>{props.category}</h4>
                    <h4>{props.address}</h4>
                    <h4>{props.roadAddress}</h4>
                </div>
            </div>
            <button className='mjbutton' onClick={posting}>맛집추가</button>
            <Modal open={modalOpen} close={closeModal} header="이미 등록됨!">
                이미 등록된 값입니다!
            </Modal>
        </div>
    )
    // const URL = `/api/restaurant/search?matjip=${props.matjip}`;

    // const [users, setUsers] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const fetchUsers = async () => {
    //     try {
    //         setError(null);
    //         setUsers(null);
    //         setLoading(true);
    //         const response = await axios.get(URL, );
    //         setUsers(response.data);
    //     } catch (e) {
    //         setError(e);
    //         console.log(e);
    //     }
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // if(loading) return <div>로딩중..</div>;
    // if(error) return <div>에러가 발생했습니다</div>;
    // if(!users) return null;
    // return (
    //     <ul>
    //         {users.searchResult.map(user => (
    //             <>
    //                 <li>가게이름 : {user.title}</li>
    //                 <li>카테고리 : {user.category}</li>
    //                 <li>주소 : {user.address}</li>
    //             </>
    //         ))}
    //     </ul>
    // );
}

export default Users;