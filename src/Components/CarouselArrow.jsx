import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CarouselArrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

    return <div onClick={clickFunction}>{icon}</div>;
}
