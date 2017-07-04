import React, { Component } from 'react'
import createContainer from '../create-container-mock.js'

export default createContainer(() => {
    const articles = [
        {
            title: 'Article 1',
            imageUrl: 'https://unsplash.it/500/500/?random',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint velit, similique ad quos.',
            link: '#'
        },
        {
            title: 'Article 2',
            imageUrl: 'https://unsplash.it/500/500/?random',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint velit, similique ad quos.',
            link: '#'
        }
    ]

    return { articles }

}, Articles)


function Articles(props) {
    const allArticles = (
        <div className="row align-center">
            {props.articles.map((props, i) => <Article key={`article-${i}`} {...props} />)}
        </div>
    )

    const readMore = (
        <button className="read-more">
            <a href="#" className="inherit">
                Read More
            </a>
        </button>
    )

    return (
        <div className='articles'>
            {allArticles}
            {readMore}
        </div>
    )
}


function Article({ title, description, imageUrl, link }) {

    const image = (
        <div className="image small-5 column">
            <img src={imageUrl} alt="" />
        </div>
    )
    
    const content = (
        <div className="content small-7 column">
            <h5>{title}</h5>
            <p className="small">
                {description}
            </p>
            <button>
                <a href={link}>Zum Artikel</a>
            </button>
        </div>
    )

    return (
        <div className="article small-12 medium-8 large-4 column">
            <div className="row">
                {image}
                {content}
            </div>
        </div >
    )
}