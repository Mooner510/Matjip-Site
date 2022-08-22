/* global kakao */
import React, {useEffect} from 'react';
// import './map.css';
import './map.css';

const Map = (props) => {
    // useScript('//dapi.kakao.com/v2/maps/sdk.js?appkey=1f4de50d882f10886593744bd31f81c4');

    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const {open, close, location, locationName, id} = props;

    // const [mapData, setMapData] = useState(null);
    let section, header, button, textNode, container;
    useEffect(() => {
        section = document.createElement("section");
        header = document.createElement("header");
        button = document.createElement("button");

        section.className = open ? 'openMap map' : 'map';
        button.className = "close";
        button.onclick = close();
        // button.addEventListener('click', close());

        textNode = document.createTextNode("×");
        button.appendChild(textNode);

        container = document.createElement("div")
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3,
        };
        container.id = "map";
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";

        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(location, function (result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {

                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;color: #000000">${locationName}</div>`
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
        header.appendChild(button);
        header.appendChild(container);
        section.appendChild(header);
        document.getElementById(`mapDiv-${id}`).appendChild(section);
        // document.body.appendChild(section);
        // setDivData(container.outerHTML);
        map.relayout();
        console.log("loading kakaomap");
    });

    // const root = createRoot(document.getElementById(`mapDiv-${id}`));
    // root.render(section);
    // // ReactDOM.render(section, );

    // return (
    // <div className={open ? 'openMap map' : 'map'}>
    //     {open ? (
    //         <section>
    //             <header>
    //                 <button className={cn("close")} onClick={close}>
    //                     &times;
    //                 </button>
    //                 {/*<div className={cn("Maps")} style={{width: "100%", height: "100px"}}>*/}
    //                 {/*    {parse(divData)}*/}
    //                 {/*</div>*/}
    //             </header>
    //         </section>
    //     ) : null}
    // </div>
    // );
};

export default Map;