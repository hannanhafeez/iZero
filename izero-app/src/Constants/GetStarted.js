import {One, Two, Three} from '../Components/SlideShow/SlideShow';
import React from 'react';
import {Success} from '../Components/SlideShowTwo/SlideShowTwo';

const PageOne = [
  {
    title: '‘Real Time’ Updates in your hands!',
    text: 'Get job offers directly to your device.',
    Header: () => <One />,
    color: '#3EB561',
  },
  {
    title: 'Be paid securely and on time',
    text:
      'iZero takes care of paying you, so you can focus on what matters... the work.',
    Header: () => <Two />,
    color: '#8E96A3',
  },
  {
    title: 'Never miss out on job opportunities',
    text:
      'Browse the job board and turn on notifications for new jobs, so you are always in the loop.',
    Header: () => <Three />,
    color: '#24334C',
  },
];

const SuccessSlide = [
  {
    title: 'Glad to have you onboard iZero',
    text: 'Now we just get a few more finer details from you.',
    Header: () => <Success />,
    color: '#3EB561',
  },
];

export {PageOne, SuccessSlide};
