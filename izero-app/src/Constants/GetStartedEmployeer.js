import {One, Two, Three} from '../Components/SlideShowEmployeer/SlideShowEmployeer';
import React from 'react';
import {Success} from '../Components/SlideShowTwo/SlideShowTwo';

const PageOne = [
  {
    title: '‘Real Time’ Updates in your hands!',
    text:
      'Create jobs and hire temporary vetted zero contract staff, let iZero take care of the payroll.',
    Header: () => <One />,
    color: '#3EB561',
  },
  {
    title: 'Book rated staff in seconds',
    text: 'Find and Book Vetted & Rated Local Staff Quickly & Securely',
    Header: () => <Two />,
    color: '#8E96A3',
  },
  {
    title: 'Never miss out on job opportunities',
    text:
      'Create jobs and hire temporary vetted zero contract staff, let iZero take care of the payroll.',
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
