import Carousel from 'react-bootstrap/Carousel'
import React from 'react';



class CarouselComponent extends React.Component {

    generateCarouselItems = (activities) => {        
         return activities.map((activity, index) => {
                // console.log(activity)
                return (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src="https://upload.wikimedia.org/wikipedia/commons/1/1e/A_blank_black_picture.jpg" alt="First slide" />
                        {/* <h3>{activity}</h3> */}
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
                {/* <Carousel.Item>
                    <img className="d-block w-100" src="holder.js/800x400?text=First slide&bg=373940" alt="First slide" />

                        <Carousel.Caption>
                            <h3>TRY ME</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item> */}
                {this.generateCarouselItems(this.props.activities)}
            </Carousel>
        )
    }
}



export default CarouselComponent