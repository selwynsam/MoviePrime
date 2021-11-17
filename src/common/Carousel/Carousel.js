import "./Carousel.scss";
import Slider from "react-slick";
import { getImagePath } from "../../utility";

const settings = {
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    fade: true,
    centerMode: true,
    centerPadding: '0px',
    arrows: false
};

const Carousel = props =>{
    const { list } = props;
    return (
        <Slider {...settings}>
            {list.map(listItem =>(
                <img 
                    key={`upcoming_${listItem.id}`}
                    src={getImagePath(listItem.backdrop_path)} 
                    alt={listItem.original_title} 
                />
            ))}
        </Slider>
    )
}

export default Carousel;