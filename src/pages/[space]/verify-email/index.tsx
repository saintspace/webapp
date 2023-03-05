import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';

export default function Home() {

  const processingMessage = 'Verifying your email address...';
  const successMessage = 'We verified your email address. You can close this page.';
  const errorMessage = 'Something went wrong while trying to verify your email address. Please try again later.';
  const [displayedMessage, setDisplayedMessage] = useState(processingMessage);

  const router = useRouter();
  const { space, token } = router.query;

  useEffect(() => {
    if (token != null) {
      const postData = {
        token: token
      }
      const verificationEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL + 'v1/email-verifications'
      fetch(verificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => {
          if (response.ok) {
            console.log('API call successful');
            setDisplayedMessage(successMessage)
          } else {
            console.log('API call failed');
            setDisplayedMessage(errorMessage)
          }
        })
        .catch(error => {
          console.error('API call error:', error);
          setDisplayedMessage(errorMessage)
        });
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>SaintSpace</title>
        <meta name="description" content="Church Management Tech Revival" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,700;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={styles.PageWrapper}>
        <div className={styles.HeaderBar}>
        <svg className={styles.HeaderLogo} version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="286.000000pt" height="286.000000pt" viewBox="0 0 286.000000 286.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,286.000000) scale(0.100000,-0.100000)"
fill="#fff" stroke="none">
<path stroke="#fff" strokeWidth="35" d="M110 2720 c0 -62 236 -353 600 -740 166 -176 720 -746 724 -744 2 0
52 -46 112 -104 650 -623 941 -885 1104 -993 69 -46 120 -62 120 -39 0 135
-1083 1283 -2000 2120 -353 322 -467 418 -566 479 -51 31 -94 40 -94 21z m122
-72 c178 -131 600 -514 970 -877 131 -128 238 -231 238 -229 0 3 134 -131 298
-296 267 -270 453 -468 698 -741 171 -191 315 -377 302 -390 -7 -7 -151 99
-268 199 -216 183 -507 453 -807 750 -123 121 -223 218 -223 215 0 -10 -580
580 -725 737 -200 215 -400 443 -488 557 -125 159 -124 171 5 75z"/>
<path stroke="#fff" strokeWidth="50" d="M1000 2360 c0 -20 6 -20 685 -20 l685 0 0 -680 c0 -674 0 -680 20
-680 20 0 20 5 18 698 l-3 697 -702 3 c-698 2 -703 2 -703 -18z"/>
<path stroke="#fff" strokeWidth="50" d="M467 1149 c2 -380 5 -695 8 -700 4 -5 286 -9 706 -9 692 0 699 0 699
20 0 20 -7 20 -685 20 l-685 0 0 680 0 680 -22 0 -23 0 2 -691z"/>
</g>
        </svg>
        <div className={styles.HeaderTitle}>
            SaintSpace
        </div>    
        </div>
        <div className={styles.Message}>
          {displayedMessage}
        </div>
      </div>
    </>
  )
}