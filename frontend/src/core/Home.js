import React, {useState, useEffect} from 'react';
import Base from '../base/Base';
import { Carousel } from 'react-responsive-carousel';
import { getCarouselImages, getRecommendedProducts } from './helper/apiCallsHelper';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import YoutubeBackground from 'react-youtube-background'
import { useNavigate } from 'react-router-dom';
import Recommended from '../base/Recommended';
import { isAuthenticated } from '../user/helper/userAPICalls';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [carouselImages, setCarouselImages] = useState([]);
  const [recommendedProducts, setRecommendedProduts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCarouselImages()
    .then((imagesData) => {
      setCarouselImages(imagesData);
      getRecommendedProducts(1000)
      .then((itemData) => {
        setRecommendedProduts(itemData);
        setLoading(false);
      })
      .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
  }, []);

  const video = () => {
    return (
      <YoutubeBackground
        videoId={"TqcApsGRzWw"}>
          <iframe style={{height:750}}></iframe>
      </YoutubeBackground>
    );
  };

  const carousel = (images) => {
      return (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          stopOnHover={false}
          showArrows={false}
          showIndicators={false}
          showThumbs={false}
          interval={4000}
          showStatus={false}
        >
          {images.map(image => <div key={image.id}>
              <img className='img-fluid'
              alt={image.reference_name} src={image.image}></img>
              </div>)}
        </Carousel>
      );
  };

  const seeMore = () => {
    return ( <>
        <h2>Polecamy:</h2>
        <div className='row'>
            {recommendedProducts.map((product, index) => {
                return (
                    <Recommended product={product} key={index}/>
                )
            })}
        </div>
      </>);

  };

  return <Base title="Meadow">
        {loading && <div className='loading'></div>}
        {!loading && <>
          {/*video()*/}
          {carousel(carouselImages)}
          <div className='container my-5'>
            {seeMore()}

          </div>
          <div className='membership-panel'>
            <p>
              Zapisz się do programu Meadow Membership,
              <br/>
              nie przegap najnowszych ofert!
            </p>

            <br/>
          {isAuthenticated() ? 
            <button style={{maxWidth:340}} onClick={() => navigate('/panel-uzytkownika')}
              className='checkout-button'>Przejdź Do Formularza</button>           
          :
            <button style={{maxWidth:340}} onClick={() => navigate('/membership')}
              className='checkout-button'>Przejdź Do Formularza</button> 
          }


          </div>
        </>}
      </Base>;
}
export default Home;