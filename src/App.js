import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Users from './Users.js';
import './App.css';
import Menu from './menu.js';

const a = process.env.REACT_APP_HOST;

function App() {
    const [state, setState] = useState("");
    const [lastState, setLastState] = useState("");
    const [users, setUsers] = useState(null);
    const [matDB, setMatDB] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingDB, setLoadingDB] = useState(false);
    const [errorDB, setErrorDB] = useState(null);
    const [viewAll, setViewAll] = useState(false);
    const [imageN, setImageN] = useState(1);

    // const delay = ms => new Promise( // delay
    //     resolve => setTimeout(resolve, ms)
    // );

    function slideShow() {
        setImageN(imageN >= 6 ? 1 : imageN + 1);
    }

    const reloads = async (e) => { // press enter
        if (e.key !== 'Enter') return;
        setState(`/api/restaurant/search?matjip=${e.target.value}`);
    }

    const fetchUsers = async () => { // user get
        try {
            setError(null);
            setLoading(true);
            if (state != null && state.length > 0) {
                if (lastState !== state) {
                    setLastState(state);
                    const response = await axios.get(state);
                    setUsers(response.data);
                }
            } else {
                setUsers(null);
            }
        } catch (e) {
            setError(e);
            console.log(e);
        }
        setLoading(false);
    };

    const fetchDB = async () => { // matDB get
        if (!viewAll) {
            return;
        }
        try {
            setErrorDB(null);
            setLoadingDB(true);
            const mainLoads = await axios.get(`/api/restaurant/all`);
            setMatDB(mainLoads.data);
        } catch (e) {
            setErrorDB(e);
            console.log(e);
        }
        setLoadingDB(false);
    };

    useEffect(() => {
        fetchUsers();
        fetchDB();
        setTimeout(slideShow, 4000);
    });

    const onView = () => { // onclick matDB
        setViewAll(!viewAll);
    }
    const nextId = useRef(1);
    let query; // user return
    if (loading) query = "로딩중...";
    else if (error) query = "에러가 발생했습니다";
    else if (!users) query = null;
    else if (!users.searchResult) query = "결과 없어 저리가";
    else query = users.searchResult.map(user => (
            <Users
                title={user.title}
                category={user.category}
                address={user.address}
                roadAddress={user.roadAddress}
                homePageLink={user.homePageLink}
                imageLink={user.imageLink}
                key={nextId.current++}
            />
        ));

    let queryDB; // matDB return
    if (viewAll) queryDB = null;
    else if (loadingDB) queryDB = "로딩중...";
    else if (errorDB) queryDB = "에러가 발생했습니다";
    else if (matDB == null) queryDB = null;
    else queryDB = matDB.map(mdb => (
            <div className="viewAll">
                <img src={mdb.imageLink} alt='' style={{height: '50%'}}/>
                {mdb.title}
                {mdb.category}
                {mdb.address}
                {mdb.roadAddress}
                {mdb.homePageLink}
            </div>
        ));


    return (
        <div className='back'>
            <header>
                <div>
                    <div className="topbar">
                        <Menu DB={queryDB}/>
                        <input className="top" type="text" placeholder='음식을 입력하세요' onKeyPress={reloads}/>
                        <a className="top" href={"#top"}>
                            <button className="loginbutton">Login</button>
                            <div className="outprofile"></div>
                            <div className="inprofile"></div>
                        </a>
                    </div>
                </div>
                <div className="backgroundimg"
                     style={{backgroundImage: `url(${a}/images/backgroundimg${imageN}.jpg)`}}></div>
                <div className='Matjip'>
                    <h1 className='txt1'>MATJIP</h1>
                    <div className="box"></div>
                    <h2 className='txt2'>Find<br/>good restaurant</h2>
                </div>
                <div className="spacediv"></div>
                <div>
                    <button onClick={onView}>testbutton</button>
                </div>
            </header>
            {query}
            {queryDB}
        </div>
    );
}

export default App;