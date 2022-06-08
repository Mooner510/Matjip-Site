import React, { useState, useEffect} from 'react';
import axios from 'axios';

function Users(props) {
    const URL = `/api/restaurant/search?matjip=${props.matjip}`;

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setError(null);
            setUsers(null);
            setLoading(true);
            const response = await axios.get(URL, );
            setUsers(response.data);
        } catch (e) {
            setError(e);
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if(loading) return <div>로딩중..</div>;
    if(error) return <div>에러가 발생했습니다</div>;
    if(!users) return null;
    return (
        <ul>
            {users.searchResult.map(user => (
                <>
                    <li>가게이름 : {user.title}</li>
                    <li>카테고리 : {user.category}</li>
                    <li>주소 : {user.address}</li>
                </>
            ))}
        </ul>
    );
}

export default Users;