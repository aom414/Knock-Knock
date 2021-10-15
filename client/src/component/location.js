
/*global kakao*/ 
//위주석은 지우지마세요!!!
//화장실위치를 찾아주는건데 ...
//서울에 4천개 
// 어떤식으로 처리해야 잘받아와질지..


//let drawedToilet = new Set() ->true는 false - > 
//drawedToilet.has(id)
//if (!drawedToilet.has(id)) {
  //  drawedToilet.add(id)

//1 현재보여주는 중앙 맵끝 최고 위도,경도기준으로 DB에 쿼리요청 북마크 getbound참고
//2 마크다운을 찍어준다 .
//3. 끝 
//4. 이미찍혀있는걸 id  -> set 에넣기
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './location.css'
import { Link } from "react-router-dom";
const Location=({isLogin,openModalFunc3})=>{
    const [searchAdress, setsearchAdress] = useState({
        adress : ''
    })
    const [search, setsearch] = useState('') //여기부분고치ㄱㅣ
    const searchClick=()=>{
        setsearch(searchAdress.adress)
        console.log(search)
    };
    const handleSearchValue = (key) => (e) => {
        setsearchAdress({ ...searchAdress, [key]: e.target.value });
        console.log('#####',searchAdress)
    };
    const resetSearch=()=>{
        setsearch('')

    }
    const handleKeyUp=(e)=> {
      if(e.key === "Enter") {
        console.log("e : ", e)
        return searchClick()
      }
    }

  useEffect(()=>{
    console.log('effect안의 search는',!search)
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
  /// 현재위치에 기반힌 마커 표시입니다
  //  클릭이벤트 검색 칸에서 검색이 될경우에...
  // 밑에 함수되신 특정위치 검색에의한 죄표에 핑찍기로 변경하기로합니다.
//   Latitude: 37°29'50.28"
// Longitude: 126°51'18.37"
        // let toMarkerPosition  = new kakao.maps.LatLng(37.4970443481997, 126.86080724140258); 

        // // 마커를 생성합니다
        // let toMarker = new kakao.maps.Marker({
            
        //     position: toMarkerPosition
        // });

        // // 마커가 지도 위에 표시되도록 설정합니다
        // toMarker.setMap(map);
        kakao.maps.event.addListener(map, 'dragend', function() {        
            // 지도 중심좌표를 얻어옵니다 
            var latlng = map.getBounds(); 
            // var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';
            var resultDiv = document.getElementById('result');  
             console.log('여기의 범위는', latlng);
             console.log('여기의 범위는xxxxxx', latlng.ha);

            var config = {
              method: 'get',
              url: `http://ec2-54-180-141-64.ap-northeast-2.compute.amazonaws.com/toilet?boudaryX=${latlng.ha}-${latlng.oa}.80&boudaryY=${latlng.qa}-${latlng.pa}`,
              headers: { }
            };
            
            axios(config)
            .then((res)=>{
                  console.log(res)
                 // console.log('장애인화장실표시가있을까요?',res.data[0])
                  for(let i = 0 ; i < res.data.length; i++){
                    // accessible_toilet_female: false
                    // accessible_toilet_male: false
                    let imageSrc = 'https://i.ibb.co/HGPJwqQ/Kakao-Talk-Photo-2021-10-14-14-05-31.png'
                    let toImageSize = new kakao.maps.Size(30, 40)
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, toImageSize)
                      if(res.data[i].accessible_toilet_male===true || res.data[i].accessible_toilet_female === true){
                          console.log('장장애인화장실표시가있을까요?애',res.data[i])
                        var toMarkerPosition  = new kakao.maps.LatLng(res.data[i].locationY, res.data[i].locationX)
                   // console.log('여기서 찍힐까??',toMarkerPosition)
                        var toMarker = new kakao.maps.Marker({
                        map: map,
                        position: toMarkerPosition,
                        title:res.data[i].name,
                        image: markerImage
                    });
            
                    // 마커가 지도 위에 표시되도록 설정합니다
                    //toMarker.setMap(map);
                   }
                }
              })
              
           });
       


    if (navigator.geolocation && search  === '') { 
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            let lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                //
            // 마커와 인포윈도우를 표시합니다
            console.log('locPosition',locPosition)
            displayMarker(locPosition, message);
            ////
            /////
            /////바운드를이용한 마커찍기
        //    let bounds = map.getBounds()
        //         console.log('범위는???',bounds)
        //     axios
        //     .get(
        //     'http://ec2-54-180-141-64.ap-northeast-2.compute.amazonaws.com/toilet'
        //      ).then((res)=>{
        //          console.log(res)
        //      })
       // kakao.maps.event.addListener(map, 'dragend', function() {        
            // 지도 중심좌표를 얻어옵니다 
            var latlng = map.getBounds(); 
            // var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';
            var resultDiv = document.getElementById('result');  
             console.log('여기의 범위는', latlng);
             console.log('여기의 범위는xxxxxx', latlng.ha);

            var config = {
              method: 'get',
              url: `http://ec2-54-180-141-64.ap-northeast-2.compute.amazonaws.com/toilet?boudaryX=${latlng.ha}-${latlng.oa}.80&boudaryY=${latlng.qa}-${latlng.pa}`,
              headers: { }
            };
            
            axios(config)
            .then((res)=>{
                  console.log(res)
                 // console.log('장애인화장실표시가있을까요?',res.data[0])
                  for(let i = 0 ; i < res.data.length; i++){
                    // accessible_toilet_female: false
                    // accessible_toilet_male: false
                      if(res.data[i].accessible_toilet_male===true || res.data[i].accessible_toilet_female === true){
                          console.log('장장애인화장실표시가있을까요?애',res.data[i])
                        var toMarkerPosition  = new kakao.maps.LatLng(res.data[i].locationY, res.data[i].locationX)
                   // console.log('여기서 찍힐까??',toMarkerPosition)
                        var toMarker = new kakao.maps.Marker({
                        map: map,
                        position: toMarkerPosition,
                        title:res.data[i].name
                    });
            
                    // 마커가 지도 위에 표시되도록 설정합니다
                    //toMarker.setMap(map);
                   }
                }
              })
              
       //    });
         
          });
        
        
    } 
    else if(search.length >0){
        let geocoder = new kakao.maps.services.Geocoder();
        let bounds = map.getBounds()
        geocoder.addressSearch( searchAdress.adress,function(result,status){ //주소를... 좌표변화시
            if(status === kakao.maps.services.Status.OK){
              console.log(result)  
              let locPosition = new kakao.maps.LatLng(result[0].y, result[0].x),
                  message = '<div style="padding:5px;">여기근처를찾고계시나요?!</div>'
              console.log('좌표는~~~',locPosition)
              displayMarker(locPosition, message);
              //searchClick()
              console.log('검색후서치는',search)
                // ha: 127.10301754385272 최소 x좌표
                // oa: 127.11050859631446 최고 x
                // pa: 37.367605997606184 최소 y
                // qa: 37.362918412167964 최고 y

              ////
              ///
              ///
              console.log('범위는???',bounds)
                // kakao.maps.event.addListener(map, 'dragend', function() {        
            // 지도 중심좌표를 얻어옵니다 
            var latlng = map.getBounds(); 
            // var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';
            var resultDiv = document.getElementById('result');  
             console.log('여기의 범위는', latlng);
             console.log('여기의 범위는xxxxxx', latlng.ha);

            var config = {
              method: 'get',
              url: `http://ec2-54-180-141-64.ap-northeast-2.compute.amazonaws.com/toilet?boudaryX=${latlng.ha}-${latlng.oa}.80&boudaryY=${latlng.qa}-${latlng.pa}`,
              headers: { }
            };
            
            axios(config)
            .then((res)=>{
                  console.log(res)
                 // console.log('장애인화장실표시가있을까요?',res.data[0])
                  for(let i = 0 ; i < res.data.length; i++){
                    // accessible_toilet_female: false
                    // accessible_toilet_male: false
                      if(res.data[i].accessible_toilet_male===true || res.data[i].accessible_toilet_female === true){
                          console.log('장장애인화장실표시가있을까요?애',res.data[i])
                        var toMarkerPosition  = new kakao.maps.LatLng(res.data[i].locationY, res.data[i].locationX)
                   // console.log('여기서 찍힐까??',toMarkerPosition)
                        var toMarker = new kakao.maps.Marker({
                        map: map,
                        position: toMarkerPosition,
                        title:res.data[i].name
                    });
            
                    // 마커가 지도 위에 표시되도록 설정합니다
                    //toMarker.setMap(map);
                   }
                }
              })
              
       //    });
            }
        }) //1번인자 주소 2번인자 검색결과를받을 포함 3
        
      }
    else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
            message = '현재위치를 표시할수없어요...'
            
        displayMarker(locPosition, message);
        displayToiletMarker(locPosition, message)
    }
    
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
        let imageSrc = 'https://i.ibb.co/hHP5tF2/Kakao-Talk-Photo-2021-10-14-14-51-13.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(56, 65), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
         let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
         //markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition,
            image: markerImage //create marker
        }); 
        
        let iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
        
        // 인포윈도우를 생성합니다
        let infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }  
     function displayToiletMarker(toLocPosition, toiletInfo){  ///요기기ㅣ기기기기기
        let toImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        toImageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        toImageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        let toMarkerImage = new kakao.maps.MarkerImage(toImageSrc, toImageSize, toImageOption)
        let toMarker = new kakao.maps.Marker({  
            map: map, 
            position: {La: 126.85819111, Ma: 37.49722111},
            image: toMarkerImage //create marker
        }); 
        
        //La: 126.85819111, Ma: 37.49722111
     }
    }, [search])
    

    return (
        <div className='mapdiv'>
            <div className='searchBox'>
             <input className='search' onChange={handleSearchValue('adress')} onKeyUp={handleKeyUp}></input>
             <button onClick={searchClick}>검색</button>
             {isLogin? 
             <div>
             
             <button onClick={openModalFunc3}>화장실 추가하기</button> 
             
             </div>:
              null}
             </div>
             <div className='backCurLoc'>
             <button onClick={resetSearch}>현재위치</button>    
             </div>      
             
             
            
        	<div className='map' id="map" style={{ width:"100%", height:"100%",position: "sticky"}}></div> 
        </div>
    )
}

export default Location;