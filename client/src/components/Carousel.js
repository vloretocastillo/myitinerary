import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

class CarouselComponent extends React.Component {

    generateCarouselItems = (activities) => {        
         return activities.map((activity, index) => {
                return (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src="https://upload.wikimedia.org/wikipedia/commons/1/1e/A_blank_black_picture.jpg" alt="First slide" />
                        <Carousel.Caption>
                            <h3>{activity}</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })      
    }

    render() {
        return (
            <Carousel>
                {this.generateCarouselItems(this.props.activities)}
            </Carousel>
        )
    }
}



export default CarouselComponent