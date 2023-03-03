import Head from 'next/head'
import { TextInput, useMantineTheme, Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 50,
    paddingBottom: 130,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '@media (max-width: 520px)': {
      paddingTop: 40,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: 'Red Hat Display, sans-serif',

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',
    marginBottom: '10px',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },
  emailInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '30px',
  },
  emailInput: {
    marginTop: '0px',
    '> label': {
      color: 'white',
    }
  },
  submitButton: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  successMessage: {
    color: '#6ae66a',
    textAlign: 'center',
    marginBottom: '10px',
  },
  processingMessage: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '10px',
  },
  errorMessage: {
    color: '#ff8656',
    textAlign: 'center',
    marginBottom: '10px',
  }
}));

export default function Home() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitErrorDisplay, setSubmitErrorDisplay] = useState('none');
  const [submitSuccessDisplay, setSubmitSuccessDisplay] = useState('none');
  const [submitProcessingDisplay, setSubmitProcessingDisplay] = useState('none');

  const router = useRouter();
  const { space, token } = router.query;

  const form = useForm({
    initialValues: {
      email: '',
    },
  
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const submitHandler = (data: any) => {
    console.log(data);
    setSubmitDisabled(true);
    setSubmitErrorDisplay('none');
    setSubmitSuccessDisplay('none');
    setSubmitProcessingDisplay('block');
    const postData = {
      email: data.email
    }
    const signUpEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL + 'v1/email-subscriptions'
    fetch(signUpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (response.ok) {
          console.log('API call successful');
          setSubmitProcessingDisplay('none');
          setSubmitSuccessDisplay('block');
          setSubmitDisabled(false);
        } else {
          console.log('API call failed');
          setSubmitProcessingDisplay('none');
          setSubmitErrorDisplay('block');
          setSubmitDisabled(false);
        }
      })
      .catch(error => {
        setSubmitProcessingDisplay('none');
        setSubmitErrorDisplay('block');
        console.error('API call error:', error);
        setSubmitDisabled(false);
      });
  }

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
      <div className="header-bar">
            <svg className="header-logo" version="1.0" xmlns="http://www.w3.org/2000/svg"
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
            <div className="header-title">
                SaintSpace
            </div>    
        </div>
        <div className={classes.wrapper}>
      <Overlay color="#121212" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
        {space} {token} 
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
          Say goodbye to clunky, outdated church management systems and unleash the power of modern technology. We&apos;re building the next generation of cloud software to revolutionize the way you run your church.
          </Text>
        </Container>
        <Container size={640}>
          <Text size="lg" className={classes.description}>
          Sign up to receive updates and opportunities to get early access.
          </Text>
        </Container>

        <form onSubmit={form.onSubmit(submitHandler)}>
          <Container size={320} className={classes.emailInputContainer}>
            <TextInput
              className={classes.emailInput}
              radius="sm"
              size="md"
              label="Email"
              placeholder="Enter your email address"
              {...form.getInputProps('email')}
            />
            <Button 
              type="submit" 
              size="md" 
              color={theme.colors[theme.primaryColor][4]} 
              className={classes.submitButton}
              disabled={submitDisabled}
            >
              Keep me updated
            </Button>
          </Container>
          <Container size={640} display={submitProcessingDisplay}>
            <Text size="lg" className={classes.processingMessage}>
              Processing your submission...
            </Text>
          </Container>
          <Container size={640} display={submitSuccessDisplay}>
            <Text size="lg" className={classes.successMessage}>
            Thanks! We&apos;ll send you an email to confirm your subscription.
            </Text>
          </Container>
          <Container size={640} display={submitErrorDisplay}>
            <Text size="lg" className={classes.errorMessage}>
            Something went wrong! Please try again later.
            </Text>
          </Container>
        </form>
      </div>
    </div>
    </>
  )
}