import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css'

function Detail(props) {
    return (
        <div className="modal">
            <span className="modalTitle"><p>{props.item.id} details <button className='exit' onClick={props.exitCallback}>X</button> </p> </span>
            <div className="modalContents">
                <div className="modalProfile">
                    <img src={props.item.image.small} />
                    <h1>{props.item.name}</h1>
                    <i>Platform: {props.item.asset_platform_id}</i>
                </div>
                <div className="modalDetails">
                    <br />
                    {
                        props.item.additional_notices[0] ? <div className="simpleAlert" dangerouslySetInnerHTML={{ __html: props.item.additional_notices[0] }}></div> : ''
                    }

                    <br />
                    <div dangerouslySetInnerHTML={{ __html: props.item.description.en }}></div>

                    <h5>HomePages </h5>
                    {props.item.links.homepage.map(i => <a href={i}>{i}</a>)}
                    <div className='socialLinks'>
                        <h5>Socials</h5>
                        {props.item.links.twitter_screen_name ? <a href={'https://twitter.com/' + props.item.links.twitter_screen_name}><FontAwesomeIcon style={{ color: 'aqua' }} size='3x' icon={['fab', 'twitter']} /></a> : null}
                        {props.item.links.facebook_username ? <a href={'https://facebook.com/' + props.item.links.facebook_username}><FontAwesomeIcon style={{ color: 'blue' }} size='3x' icon={['fab', 'facebook']} /></a> : null}
                        {props.item.links.subreddit_url ? <a href={props.item.links.subreddit_url}><FontAwesomeIcon style={{ color: 'orange' }} size='3x' icon={['fab', 'reddit']} /></a> : null}
                        {props.item.links.telegram_channel_identifier ? <a href={'https://t.me/' + props.item.links.telegram_channel_identifier}><FontAwesomeIcon style={{ color: 'lightblue' }} size='3x' icon={['fab', 'telegram']} /></a> : null}
                        {props.item.links.bitcointalk_thread_identifier ? <a href={'https://bitcointalk.org/index.php?topic=' + props.item.links.bitcointalk_thread_identifier}><FontAwesomeIcon style={{ color: 'gray' }} size='3x' icon={['fab', 'bitcoin']} /></a> : null}
                        {props.item.links.chat_url[0].includes('discord') ? <a href={props.item.links.chat_url[0]}><FontAwesomeIcon style={{ color: 'darkblue' }} size='3x' icon={['fab', 'discord']} /></a> : null}
                    </div>
                    <h5>Code Repositories</h5>
                    {props.item.links.repos_url.github.map(i => <div key={i}><a href={i}>{i}</a> <br /></div>)}
                </div>
            </div>
        </div>
    )
}

export default Detail