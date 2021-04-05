import { Slide } from '@material-ui/core';
import React, { useState } from 'react'
import CarouselArrow from './CarouselArrow'
import CarouselSlide from './CarouselSlide'
export default function Carousel() {
    // const [nextSlides, setNextSlides] = useState(0)
    // const [prevSlides, setPrevSlides] = useState(0)
    // const resetSlideState = () => { setNextSlides(1) }
    const SLIDE_INFO = [
        { backgroundColor: '#ff7c7c', title: 'Slide 1' },
        { backgroundColor: '#ffb6b9', title: 'Slide 2' },
        { backgroundColor: '#8deaff', title: 'Slide 3' },
        { backgroundColor: '#ffe084', title: 'Slide 4' },
        { backgroundColor: '#d9d9d9', title: 'Slide 5' },
    ];
    const [index, setIndex] = useState(0);
    const content = SLIDE_INFO[index];
    const numSlides = SLIDE_INFO.length;
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');
    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };
    return (
        <div className="carouselFlex">

            <CarouselArrow
                direction='left'
                clickFunction={() => onArrowClick('left')}
            />
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>
            <CarouselArrow
                direction='right'
                clickFunction={() => onArrowClick('right')}
            />

            {/* <button onClick={() => setPrevSlides(1)} className="prevCarousel">{'<'}</button>
            <div className="carouselContainer">
                <div className="carouselSlide" onAnimationEnd={() => {
                    setNextSlides(0)
                    setPrevSlides(0)
                }}
                    nextSlides={nextSlides}
                    prevSlides={prevSlides}
                >
                    <img className="lastClone" src="https://images.pexels.com/photos/162256/wolf-predator-european-wolf-carnivores-162256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                    <img src="https://images.pexels.com/photos/682375/pexels-photo-682375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                    <img src="https://images.pexels.com/photos/397857/pexels-photo-397857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                    <img src="https://images.pexels.com/photos/1573134/pexels-photo-1573134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                    <img src="https://images.pexels.com/photos/162256/wolf-predator-european-wolf-carnivores-162256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                    <img className="firstClone" src="https://images.pexels.com/photos/39310/wolf-predator-hunter-canis-lupus-39310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                </div>
            </div>
            <button onClick={() => {
                console.log(nextSlides);
                setNextSlides(1)
            }
            
            } className="nextCarousel">{'>'}</button> */}
        </div>
    )
}
