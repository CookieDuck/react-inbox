import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Message from '../components/Message'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

const readMsg = { subject: "Some cool, marked as read message", read: true };
const unreadMsg = { subject: "Some cool, not-yet-read message", read: false };
const selectedMsg = { subject: "Has a check", selected: true };
const unselectedMsg = { subject: "No check mark", selected: false };

storiesOf('Message', module)
  .add('Read message has read style', () => <Message message={readMsg}/>)
  .add('Unread message has unread style', () => <Message message={unreadMsg}/>)
  .add('Selected message has check', () => <Message message={selectedMsg}/>)
  .add('Unselected message has no check', () => <Message message={unselectedMsg}/>)