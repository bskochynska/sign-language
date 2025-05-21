import React from 'react'
import {Header,WhatComp, Features, CTA, Working, Testimonials, StatsSection, GallerySection, FAQSection, WhyUs} from '.././index';
import { useState } from 'react'; 

const Home = () => {
    return (
        <>
            <Header/>
            <StatsSection/>
            <div className="overlay-gallery">
                <GallerySection />
            </div>
            <FAQSection/>
            {/* <WhyUs/> */}
            
            {/* <WhatComp/> */}
            {/* <Features/>
            <Working/>
            <CTA/>
            <Testimonials/> */}
        </>
    )
}

export default Home
